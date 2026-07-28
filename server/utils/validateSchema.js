/**
 * Utility function to validate the AI response schema.
 * Ensures the response strictly adheres to expected flashcards & quiz structure.
 */

export class SchemaValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SchemaValidationError';
  }
}

export function validateAIResponse(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new SchemaValidationError('Root AI output must be a valid JSON object.');
  }

  const { flashcards, quiz } = data;

  if (!Array.isArray(flashcards)) {
    throw new SchemaValidationError('Missing or invalid "flashcards" array.');
  }

  if (!Array.isArray(quiz)) {
    throw new SchemaValidationError('Missing or invalid "quiz" array.');
  }

  if (flashcards.length === 0 && quiz.length === 0) {
    throw new SchemaValidationError('AI returned empty flashcards and quiz sets.');
  }

  // Validate each flashcard
  for (let i = 0; i < flashcards.length; i++) {
    const card = flashcards[i];
    if (!card || typeof card !== 'object') {
      throw new SchemaValidationError(`Flashcard at index ${i} is not a valid object.`);
    }
    if (!card.question || typeof card.question !== 'string' || !card.question.trim()) {
      throw new SchemaValidationError(`Flashcard at index ${i} has missing or empty question.`);
    }
    if (!card.answer || typeof card.answer !== 'string' || !card.answer.trim()) {
      throw new SchemaValidationError(`Flashcard at index ${i} has missing or empty answer.`);
    }
  }

  // Validate each quiz question
  for (let i = 0; i < quiz.length; i++) {
    const item = quiz[i];
    if (!item || typeof item !== 'object') {
      throw new SchemaValidationError(`Quiz item at index ${i} is not a valid object.`);
    }
    if (!item.question || typeof item.question !== 'string' || !item.question.trim()) {
      throw new SchemaValidationError(`Quiz item at index ${i} has missing or empty question.`);
    }
    if (!Array.isArray(item.options) || item.options.length < 2) {
      throw new SchemaValidationError(`Quiz item at index ${i} must have at least 2 options.`);
    }
    const validOptions = item.options.map(opt => String(opt).trim()).filter(Boolean);
    if (validOptions.length < 2) {
      throw new SchemaValidationError(`Quiz item at index ${i} options cannot be blank.`);
    }
    if (!item.correctAnswer || typeof item.correctAnswer !== 'string' || !item.correctAnswer.trim()) {
      throw new SchemaValidationError(`Quiz item at index ${i} has missing or empty correctAnswer.`);
    }
  }

  return true;
}
