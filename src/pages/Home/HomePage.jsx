import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Trash2, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { SAMPLE_NOTES } from '../../utils/sampleNotes';

export default function HomePage({ onGenerate, loading }) {
  const [notes, setNotes] = useState('');

  const handleLoadSample = () => {
    setNotes(SAMPLE_NOTES);
  };

  const handleClear = () => {
    setNotes('');
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
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* HERO HEADER SECTION */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Structured AI Study Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
          Turn raw study notes into{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            interactive learning tools
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Paste lecture transcripts, textbook notes, or research summaries. FlashMind parses key facts into 3D flashcards and multiple-choice quizzes.
        </p>
      </div>

      {/* NOTION / RAYCAST STYLE PREMIUM INPUT CONTAINER */}
      <form 
        onSubmit={handleSubmit} 
        className="card-elevated rounded-2xl p-2 sm:p-3 border border-white/[0.1] shadow-2xl space-y-2 bg-[#0f172a]/90 backdrop-blur-md transition-all duration-200"
      >
        {/* Editor Toolbar Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium text-slate-300">Study Notes Editor</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLoadSample}
              disabled={loading}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] transition-all text-xs font-medium focus-ring"
            >
              <BookOpen className="w-3 h-3 text-indigo-400" />
              <span>Load Example</span>
            </button>

            {notes && (
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-xs focus-ring"
                title="Clear text"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Rich Text Area */}
        <div className="relative">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your study notes, lecture summary, or textbook chapter excerpt here..."
            disabled={loading}
            rows={10}
            className="w-full bg-[#0b0f17]/70 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 border border-transparent text-sm leading-relaxed font-sans resize-none transition-all disabled:opacity-50"
          />
        </div>

        {/* Editor Footer Actions Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-2 pt-1">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{wordCount} words</span>
            <span className="text-slate-700">•</span>
            <span>{charCount} characters</span>
          </div>

          <button
            type="submit"
            disabled={!notes.trim() || loading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 focus-ring"
          >
            <span>Generate Interactive Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* RESTRAINED FEATURE HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl card-flat space-y-1.5 border border-white/[0.06]">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
            <Zap className="w-4 h-4" />
            <span>Structured Data Only</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Not a chatbot. Strictly converts unstructured notes into validated JSON components.
          </p>
        </div>

        <div className="p-4 rounded-xl card-flat space-y-1.5 border border-white/[0.06]">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>3D Flashcards & Quiz</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Interactive front/back 3D cards and auto-graded multiple-choice assessment.
          </p>
        </div>

        <div className="p-4 rounded-xl card-flat space-y-1.5 border border-white/[0.06]">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Failure Resilient</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Handles malformed JSON, timeouts, and stale responses gracefully with AbortController.
          </p>
        </div>
      </div>

    </div>
  );
}
