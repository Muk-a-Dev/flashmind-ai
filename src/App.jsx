import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          FlashMind AI
        </h1>
        <p className="text-slate-400 text-lg">
          AI-Powered Interactive Study Assistant
        </p>
        <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-300">
          Phase 1 Complete: Project baseline, Express API server setup, Vite frontend pipeline, Tailwind styling configured.
        </div>
      </div>
    </div>
  );
}
