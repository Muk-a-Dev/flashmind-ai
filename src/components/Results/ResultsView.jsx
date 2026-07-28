import React from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export default function ResultsView({ results, onRetryWrong, onRetakeFull }) {
  if (!results) return null;

  const { score, correctCount, totalCount, items, wrongItems } = results;
  const hasWrongQuestions = wrongItems && wrongItems.length > 0;

  // Grade color scheme
  let scoreColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  let gradeText = "Great Job!";
  if (score < 60) {
    scoreColor = "text-rose-400 border-rose-500/30 bg-rose-500/10";
    gradeText = "Keep Practicing!";
  } else if (score < 80) {
    scoreColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
    gradeText = "Solid Attempt!";
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Score Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl space-y-6">
        <div className={`w-24 h-24 mx-auto rounded-full border-2 flex flex-col items-center justify-center ${scoreColor}`}>
          <span className="text-3xl font-extrabold">{score}%</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-indigo-400" />
            <span>{gradeText}</span>
          </h2>
          <p className="text-slate-400 text-sm">
            You answered <span className="font-semibold text-slate-200">{correctCount}</span> out of{' '}
            <span className="font-semibold text-slate-200">{totalCount}</span> questions correctly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {hasWrongQuestions && (
            <button
              onClick={onRetryWrong}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Wrong Questions ({wrongItems.length})</span>
            </button>
          )}

          <button
            onClick={onRetakeFull}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Retake Full Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Answer Breakdown Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-200 px-2">Detailed Question Review</h3>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all ${
                item.isCorrect
                  ? 'bg-slate-900/60 border-slate-800/80'
                  : 'bg-rose-950/20 border-rose-500/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="text-sm font-semibold text-slate-200">
                  {idx + 1}. {item.question}
                </h4>
                {item.isCorrect ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Correct</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Incorrect</span>
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-400">
                  <span className="font-semibold text-slate-300">Your Answer:</span>{' '}
                  <span className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400 font-medium'}>
                    {item.userAnswer || 'Not answered'}
                  </span>
                </p>
                {!item.isCorrect && (
                  <p className="text-slate-400">
                    <span className="font-semibold text-slate-300">Correct Answer:</span>{' '}
                    <span className="text-emerald-400 font-medium">{item.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
