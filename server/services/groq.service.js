import Groq from 'groq-sdk';
import { validateAIResponse, SchemaValidationError } from '../utils/validateSchema.js';

/**
 * Service handling interactions with Groq AI API.
 */
export async function generateStudyMaterial(notes) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'gsk_placeholder_key') {
    throw new Error('API_KEY_MISSING: Groq API key is not configured on the backend server.');
  }

  const groq = new Groq({ apiKey });

  const systemPrompt = `You are a strict, highly accurate AI Study Assistant.
Your ONLY job is to analyze user study notes and produce interactive study materials (flashcards and a multiple-choice quiz).

CRITICAL REQUIREMENTS:
1. Return ONLY raw valid JSON.
2. DO NOT wrap the output in markdown codeblocks (no \`\`\`json or \`\`\`).
3. DO NOT include any explanatory text, greetings, notes, or intros.
4. Output MUST conform strictly to this JSON schema:

{
  "flashcards": [
    {
      "question": "Clear question string based on notes",
      "answer": "Concise factual answer string based on notes"
    }
  ],
  "quiz": [
    {
      "question": "Multiple choice question string",
      "options": [
        "Option A string",
        "Option B string",
        "Option C string",
        "Option D string"
      ],
      "correctAnswer": "Exact matching string from options array"
    }
  ]
}

Ensure you generate 4 to 8 flashcards and 3 to 5 quiz questions depending on notes length.`;

  const userPrompt = `Study Notes:\n${notes}`;

  try {
    // Invoke Groq API with llama-3.3-70b-versatile and json_object mode
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2, // Low temperature for high consistency
      response_format: { type: 'json_object' }
    });

    const rawContent = completion.choices[0]?.message?.content;

    if (!rawContent || !rawContent.trim()) {
      throw new Error('EMPTY_RESPONSE: AI returned an empty response.');
    }

    // Clean potential raw content if wrapped accidentally
    let cleaned = rawContent.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    let parsedData;
    try {
      parsedData = JSON.parse(cleaned);
    } catch (parseError) {
      throw new Error(`MALFORMED_JSON: Failed to parse AI JSON response: ${parseError.message}`);
    }

    // Validate schema
    validateAIResponse(parsedData);

    return parsedData;
  } catch (err) {
    if (err instanceof SchemaValidationError) {
      throw new Error(`INVALID_SCHEMA: ${err.message}`);
    }
    throw err;
  }
}
