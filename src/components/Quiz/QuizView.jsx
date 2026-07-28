import React, { useState } from 'react';
import { HelpCircle, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

export default function QuizView({ quiz, onComplete, isRetryMode = false, onCancelRetry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!quiz || quiz.length === 0) {
    return (
      <div className="text-center p-8 card-flat rounded-2xl">
        <p className="text-slate-400 text-sm">No quiz questions available.</p>
      </div>
    );
  }

  const currentItem = quiz[currentIndex];
  const totalQuestions = quiz.length;
  const currentSelected = selectedAnswers[currentIndex];

  const handleSelectOption = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    // Evaluate results
    let correctCount = 0;
    const answeredItems = quiz.map((item, idx) => {
      const userAns = selectedAnswers[idx] || null;
      const isCorrect = userAns === item.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        ...item,
        userAnswer: userAns,
        isCorrect,
      };
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    onComplete({
      score: scorePercent,
      correctCount,
      totalCount: totalQuestions,
      items: answeredItems,
      wrongItems: answeredItems.filter((it) => !it.isCorrect),
    });
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === totalQuestions;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header & Mode Badge */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <h2 className="text-base font-semibold text-slate-100">
            {isRetryMode ? 'Re-testing Wrong Questions' : 'Multiple-Choice Quiz'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {isRetryMode && (
            <button
              onClick={onCancelRetry}
              className="text-xs text-slate-400 hover:text-slate-200 underline mr-2 focus-ring"
            >
              Exit Retry
            </button>
          )}
          <div className="px-2.5 py-1 bg-slate-900 border border-white/[0.08] rounded-full text-xs font-medium text-slate-300">
            <span className="text-purple-400 font-semibold">{currentIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span>{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 border border-white/[0.06] h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-purple-500 h-full transition-all duration-200 rounded-full"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 bg-[#0f172a]/90">
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
          {currentItem.question}
        </h3>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 gap-3">
          {currentItem.options.map((option, idx) => {
            const isSelected = currentSelected === option;
            const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className={`w-full p-3.5 rounded-xl text-left border flex items-center justify-between transition-all duration-150 focus-ring ${
                  isSelected
                    ? 'bg-purple-950/50 border-purple-500/80 text-purple-100 ring-1 ring-purple-500/40 shadow-sm'
                    : 'bg-[#0b0f17]/60 border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-md text-xs font-semibold flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-slate-800 border-white/[0.08] text-slate-400'
                    }`}
                  >
                    {optionLabel}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">{option}</span>
                </div>

                {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation & Submit Bar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="py-2.5 px-4 rounded-xl bg-slate-900 border border-white/[0.08] hover:bg-slate-800 text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="py-2.5 px-5 rounded-xl bg-slate-900 border border-white/[0.08] hover:bg-slate-800 text-slate-200 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all focus-ring"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/20 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 focus-ring"
          >
            <Award className="w-4 h-4" />
            <span>Submit Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
}
