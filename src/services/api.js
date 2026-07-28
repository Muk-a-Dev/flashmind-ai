/**
 * Frontend API client service for communicating with FlashMind backend.
 * Supports environment variable VITE_API_BASE_URL for deployed backend proxies.
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
    throw err;
  }
}
