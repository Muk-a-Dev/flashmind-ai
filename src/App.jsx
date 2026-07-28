import React from 'react';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/Home/HomePage';
import LoadingSpinner from './components/Layout/LoadingSpinner';
import ErrorMessage from './components/Layout/ErrorMessage';
import FlashcardDeck from './components/Flashcard/FlashcardDeck';
import { useGenerateNotes } from './hooks/useGenerateNotes';

export default function App() {
  const {
    data,
    loading,
    error,
    generate,
    retry,
    reset,
  } = useGenerateNotes();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar onReset={reset} hasData={Boolean(data)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage error={error} onRetry={retry} />
        )}

        {!loading && !error && !data && (
          <HomePage onGenerate={generate} loading={loading} />
        )}

        {!loading && !error && data && (
          <div className="space-y-6">
            <FlashcardDeck flashcards={data.flashcards} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-6 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>FlashMind AI © {new Date().getFullYear()} • Frontend Internship Project</span>
          <span className="text-slate-600">Built with React, Express, TailwindCSS & Groq API</span>
        </div>
      </footer>
    </div>
  );
}
