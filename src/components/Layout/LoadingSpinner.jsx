import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';

const LOADING_PHRASES = [
  "Analyzing study notes...",
  "Extracting core facts & key terms...",
  "Formatting 3D flashcards...",
  "Generating multiple-choice quiz questions...",
  "Validating structured response..."
];

export default function LoadingSpinner() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 rounded-2xl bg-[#0f172a]/90 border border-white/[0.08] shadow-2xl text-center space-y-6">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-lg animate-pulse" />
        <div className="w-full h-full rounded-full border-2 border-slate-800 border-t-indigo-500 border-r-indigo-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-slate-100 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Generating Learning Tools</span>
        </h3>
        
        <p className="text-xs font-medium text-slate-400 h-5 transition-all duration-300">
          {LOADING_PHRASES[phraseIndex]}
        </p>
      </div>

      {/* Sleek Progress Bar */}
      <div className="w-full max-w-xs mx-auto bg-slate-900 border border-white/[0.06] h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full animate-pulse w-2/3 mx-auto" />
      </div>

      <p className="text-[11px] text-slate-500">
        Powered by Groq llama-3.3-70b-versatile
      </p>
    </div>
  );
}
