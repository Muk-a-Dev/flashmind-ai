/**
 * Frontend API client service for communicating with FlashMind backend.
 * Supports static fallback for GitHub Pages live demos where Node.js backend is not hosted.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function generateStudyNotesAPI(notes, signal) {
  try {
    const endpoint = `${API_BASE_URL}/api/generate`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes }),
      signal,
    });

    // If server responds with 404 on static hosting environment (GitHub Pages)
    if (response.status === 404) {
      console.warn('Backend server endpoint not found (404). Falling back to client-side study generator for GitHub Pages demo.');
      return generateStaticDemoFallback(notes);
    }

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to generate study materials.');
      error.type = data.error || 'SERVER_ERROR';
      error.details = data.details || null;
      error.status = response.status;
      throw error;
    }

    return data.data;
  } catch (err) {
    if (err.name === 'AbortError') {
      const abortErr = new Error('Request was cancelled.');
      abortErr.type = 'ABORTED';
      throw abortErr;
    }

    // Fallback if fetch fails due to static origin (e.g. GitHub Pages without CORS backend)
    if (window.location.hostname.includes('github.io')) {
      console.warn('Network request failed on GitHub Pages static host. Providing client-side fallback interactive study tools.');
      return generateStaticDemoFallback(notes);
    }

    throw err;
  }
}

/**
 * Generates structured flashcards and quiz questions client-side when running on static GitHub Pages.
 */
function generateStaticDemoFallback(notes) {
  const sentences = notes
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  const topicName = notes.slice(0, 30).trim() || "Study Notes";

  const flashcards = sentences.slice(0, 6).map((sentence, idx) => ({
    question: `Key Concept ${idx + 1}: What is discussed regarding "${sentence.slice(0, 25)}..."?`,
    answer: sentence
  }));

  if (flashcards.length === 0) {
    flashcards.push({
      question: `Core Overview: What is the main subject of these notes?`,
      answer: notes.slice(0, 150)
    });
  }

  const quiz = [
    {
      question: `Based on your notes on "${topicName}...", which statement is accurate?`,
      options: [
        sentences[0] || "Key process converts energy into stored chemical bounds.",
        "Processes occur in cytoplasm without enzymatic catalysis.",
        "Reactions are completely independent of temperature and pressure.",
        "Primary components decompose spontaneously without external energy."
      ],
      correctAnswer: sentences[0] || "Key process converts energy into stored chemical bounds."
    },
    {
      question: `What is a primary takeaways from these study notes?`,
      options: [
        sentences[1] || "Structured reactions generate energy-rich intermediate molecules.",
        "All cellular activities cease during light exposure.",
        "Organisms require zero external energy for metabolic synthesis.",
        "Substrates are permanently consumed without regeneration."
      ],
      correctAnswer: sentences[1] || "Structured reactions generate energy-rich intermediate molecules."
    },
    {
      question: `Which mechanism is highlighted in the study material?`,
      options: [
        sentences[2] || "Target molecules undergo multi-step enzymatic transformations.",
        "Random thermodynamic fluctuations drive cellular work.",
        "Energy is absorbed without producing cellular work.",
        "Reactions proceed only in absolute vacuum conditions."
      ],
      correctAnswer: sentences[2] || "Target molecules undergo multi-step enzymatic transformations."
    }
  ];

  return {
    flashcards,
    quiz
  };
}
