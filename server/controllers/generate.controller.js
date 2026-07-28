import { generateStudyMaterial } from '../services/groq.service.js';

export async function handleGenerateNotes(req, res) {
  const { notes } = req.body || {};

  if (!notes || typeof notes !== 'string' || !notes.trim()) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Please provide study notes to generate materials.'
    });
  }

  // Set timeout protection (18 seconds timeout)
  const TIMEOUT_MS = 18000;
  let isTimedOut = false;

  const timeoutId = setTimeout(() => {
    isTimedOut = true;
  }, TIMEOUT_MS);

  try {
    const result = await generateStudyMaterial(notes);

    clearTimeout(timeoutId);

    if (isTimedOut) {
      return res.status(408).json({
        error: 'TIMEOUT',
        message: 'Request timed out. The AI took too long to generate study materials.'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    clearTimeout(timeoutId);

    if (isTimedOut) {
      return res.status(408).json({
        error: 'TIMEOUT',
        message: 'Request timed out.'
      });
    }

    console.error('Error generating notes:', error.message);

    const errorMessage = error.message || '';

    if (errorMessage.includes('MALFORMED_JSON') || errorMessage.includes('INVALID_SCHEMA')) {
      return res.status(422).json({
        error: 'MALFORMED_AI_OUTPUT',
        message: "We couldn't understand the AI response.",
        details: errorMessage
      });
    }

    if (errorMessage.includes('EMPTY_RESPONSE')) {
      return res.status(422).json({
        error: 'EMPTY_AI_OUTPUT',
        message: 'No flashcards generated.',
        details: errorMessage
      });
    }

    if (errorMessage.includes('API_KEY_MISSING')) {
      return res.status(500).json({
        error: 'SERVER_CONFIG_ERROR',
        message: 'Server error: GROQ_API_KEY is not configured in backend environment variables.'
      });
    }

    return res.status(500).json({
      error: 'AI_SERVICE_ERROR',
      message: 'Failed to communicate with AI service. Please check your network connection or try again later.',
      details: errorMessage
    });
  }
}
