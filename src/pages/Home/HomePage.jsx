import React, { useState } from 'react';
import { Sparkles, FileText, ArrowRight, BookOpen, Layers, HelpCircle } from 'lucide-react';
import { SAMPLE_NOTES } from '../../utils/sampleNotes';

export default function HomePage({ onGenerate, loading }) {
  const [notes, setNotes] = useState('');

  const handleLoadSample = () => {
    setNotes(SAMPLE_NOTES);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim() && !loading) {
      onGenerate(notes);
    }
  };

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const charCount = notes.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Study Tool</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Transform Raw Notes Into{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Interactive Flashcards & Quizzes
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Paste any lecture notes, article excerpts, or study guides below. FlashMind AI will parse key concepts into structured flashcards and quiz questions.
        </p>
      </div>

      {/* Input Card Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Study Notes Input</span>
          </label>

          <button
            type="button"
            onClick={handleLoadSample}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-indigo-200 border border-slate-700 transition-colors disabled:opacity-50"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Example Notes</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your study notes here..."
            disabled={loading}
            rows={10}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm leading-relaxed resize-none transition-all disabled:opacity-50 font-sans"
          />

          <div className="absolute bottom-3 right-4 flex items-center gap-3 text-xs text-slate-500 pointer-events-none">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} chars</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>For best results, paste at least 2-3 detailed paragraphs.</span>
          </p>

          <button
            type="submit"
            disabled={!notes.trim() || loading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <span>Generate Study Materials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Interactive Flashcards</h4>
            <p className="text-xs text-slate-400 mt-1">3D card flipping with instant front/back reveal and step navigation.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Multiple-Choice Quiz</h4>
            <p className="text-xs text-slate-400 mt-1">Test your recall with auto-graded multiple-choice options.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Smart Retry Logic</h4>
            <p className="text-xs text-slate-400 mt-1">Re-test wrong quiz questions to master difficult concepts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
