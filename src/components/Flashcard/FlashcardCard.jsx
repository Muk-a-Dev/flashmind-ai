import React from 'react';
import { RotateCw, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function FlashcardCard({ flashcard, isFlipped, onFlip }) {
  if (!flashcard) return null;

  return (
    <div
      onClick={onFlip}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onFlip();
        }
      }}
      className="w-full max-w-xl h-80 perspective-1000 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-2xl"
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE (Question) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl group-hover:border-indigo-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Question</span>
            </span>

            <span className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              <span>Click card to flip</span>
            </span>
          </div>

          <div className="my-auto text-center px-4">
            <p className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
              {flashcard.question}
            </p>
          </div>

          <div className="text-center text-xs text-slate-500 font-medium">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Space</kbd> or click to flip
          </div>
        </div>

        {/* BACK FACE (Answer) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-purple-950/90 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Answer</span>
            </span>

            <span className="text-xs text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-indigo-400" />
              <span>Click to flip back</span>
            </span>
          </div>

          <div className="my-auto text-center px-4">
            <p className="text-lg sm:text-xl font-medium text-emerald-200 leading-relaxed">
              {flashcard.answer}
            </p>
          </div>

          <div className="text-center text-xs text-slate-400 font-medium">
            Review completed for this card
          </div>
        </div>
      </div>
    </div>
  );
}
