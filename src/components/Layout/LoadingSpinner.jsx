import React, { useState, useEffect } from 'react';
import { Sparkles, Brain } from 'lucide-react';

const LOADING_PHRASES = [
  "Analyzing study notes...",
  "Extracting core concepts and facts...",
  "Generating interactive flashcards...",
  "Crafting multiple-choice quiz questions...",
  "Validating structured response..."
];

export default function LoadingSpinner() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto">
        {/* Glowing aura */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
        
        {/* Animated spinner ring */}
        <div className="w-full h-full rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-purple-500 animate-spin" />
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-indigo-400 animate-bounce" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Generating Study Materials</span>
        </h3>
        
        <p className="text-sm font-medium text-slate-400 h-6 transition-all duration-300">
          {LOADING_PHRASES[phraseIndex]}
        </p>
      </div>

      {/* Progress Bar Animation */}
      <div className="w-full max-w-md mx-auto bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-3/4 mx-auto" />
      </div>

      <p className="text-xs text-slate-500 italic">
        Powered by Groq llama-3.3-70b-versatile
      </p>
    </div>
  );
}
