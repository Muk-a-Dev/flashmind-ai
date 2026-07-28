import { useState, useRef, useEffect, useCallback } from 'react';
import { generateStudyNotesAPI } from '../services/api';

/**
 * Custom React Hook for managing AI generation requests.
 * Uses AbortController to cancel stale/in-flight requests when a new request is triggered.
 */
export function useGenerateNotes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastNotes, setLastNotes] = useState('');

  // Ref to track active AbortController instance
  const abortControllerRef = useRef(null);

  const generate = useCallback(async (notes) => {
    if (!notes || !notes.trim()) return;

    // 1. Abort previous in-flight request if present to prevent race conditions / stale responses
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 2. Create new AbortController instance for current request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLastNotes(notes);
    setLoading(true);
    setError(null);

    try {
      const result = await generateStudyNotesAPI(notes, controller.signal);
      
      // Request completed successfully
      setData(result);
      setLoading(false);
    } catch (err) {
      // Ignore abort errors as they belong to superseded stale requests
      if (err.type === 'ABORTED' || err.name === 'AbortError') {
        return;
      }

      setError({
        type: err.type || 'UNKNOWN_ERROR',
        message: err.message || 'An unexpected error occurred while communicating with the AI.',
        details: err.details || null,
      });
      setLoading(false);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, []);

  const retry = useCallback(() => {
    if (lastNotes) {
      generate(lastNotes);
    }
  }, [generate, lastNotes]);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setData(null);
    setLoading(false);
    setError(null);
    setLastNotes('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    generate,
    retry,
    reset,
    lastNotes,
  };
}
