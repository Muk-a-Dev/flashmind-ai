import React from 'react';
import { AlertTriangle, RotateCcw, Clock, Cpu, FileQuestion } from 'lucide-react';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  const { type, message } = error;

  let title = "Something went wrong";
  let displayMessage = message || "An unexpected error occurred.";
  let Icon = AlertTriangle;
  let accentColor = "from-amber-500/20 to-rose-500/20 border-rose-500/30";

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
    <div className="w-full max-w-2xl mx-auto my-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-center space-y-4">
      <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${accentColor} border flex items-center justify-center`}>
        <Icon className="w-7 h-7 text-rose-400" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">{displayMessage}</p>
      </div>

      <div className="pt-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
