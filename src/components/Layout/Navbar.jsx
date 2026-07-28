import React, { useState } from 'react';
import { Sparkles, BrainCircuit, RotateCcw, Github, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Navbar({ onReset, hasData }) {
  const [showDocsModal, setShowDocsModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-[68px] border-b border-white/[0.08] bg-[#0b0f17]/80 backdrop-blur-xl transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          
          {/* LEFT BRAND SECTION */}
          <div 
            onClick={onReset}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-150">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-base tracking-tight text-slate-100 group-hover:text-white transition-colors">
                FlashMind
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </div>
          </div>

          {/* RIGHT ACTIONS SECTION */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Model Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-white/[0.08] text-xs font-medium text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>llama-3.3-70b</span>
            </div>

            {/* Docs Link */}
            <button
              onClick={() => setShowDocsModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all duration-150 focus-ring"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs</span>
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/Muk-a-Dev/flashmind-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-150 focus-ring"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Primary Action / Reset CTA */}
            {hasData && (
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all duration-150 active:scale-95 focus-ring"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Notes</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* DOCS MODAL */}
      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-slate-100 text-base">FlashMind AI Documentation</h3>
              </div>
              <button 
                onClick={() => setShowDocsModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>FlashMind AI</strong> turns free-form study notes into interactive flashcards and multiple-choice quizzes using Groq API and LLM structured output.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-white/5 space-y-1 text-slate-400">
                <div>• <strong>Backend Proxy:</strong> Node/Express routes model calls safely.</div>
                <div>• <strong>Schema Validation:</strong> Runtime JSON verification prevents malformed LLM responses.</div>
                <div>• <strong>Request Cancellation:</strong> AbortController cancels stale requests.</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
