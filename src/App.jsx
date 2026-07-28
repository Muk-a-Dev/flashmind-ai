import React from 'react';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/Home/HomePage';
import LoadingSpinner from './components/Layout/LoadingSpinner';
import ErrorMessage from './components/Layout/ErrorMessage';
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
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-2xl font-bold text-emerald-400">
              Study Materials Ready!
            </h2>
            <p className="text-slate-400 text-sm">
              Generated {data.flashcards?.length || 0} flashcards and {data.quiz?.length || 0} quiz questions.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-lg border border-slate-700"
            >
              Back to Home
            </button>
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
