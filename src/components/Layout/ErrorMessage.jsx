import React from 'react';
import { AlertTriangle, RotateCcw, Clock, Cpu, FileQuestion } from 'lucide-react';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  const { type, message } = error;

  let title = "Something went wrong";
  let displayMessage = message || "An unexpected error occurred.";
  let Icon = AlertTriangle;

  if (type === 'MALFORMED_AI_OUTPUT' || type === 'INVALID_SCHEMA') {
    title = "Parsing Error";
    displayMessage = "We couldn't understand the AI response.";
    Icon = Cpu;
  } else if (type === 'EMPTY_AI_OUTPUT') {
    title = "Empty Output";
    displayMessage = "No flashcards generated.";
    Icon = FileQuestion;
  } else if (type === 'TIMEOUT') {
    title = "Timeout Error";
    displayMessage = "Request timed out. The AI model took too long to respond.";
    Icon = Clock;
  }

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl bg-[#0f172a] border border-rose-500/30 shadow-xl text-center space-y-4">
      <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-rose-400" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">{displayMessage}</p>
      </div>

      <div className="pt-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 active:scale-95 focus-ring"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
