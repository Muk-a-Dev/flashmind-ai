import React, { useState } from 'react';
import { HelpCircle, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

export default function QuizView({ quiz, onComplete, isRetryMode = false, onCancelRetry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!quiz || quiz.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl">
        <p className="text-slate-400">No quiz questions available.</p>
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
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-slate-100">
            {isRetryMode ? 'Re-testing Wrong Questions' : 'Multiple-Choice Quiz'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {isRetryMode && (
            <button
              onClick={onCancelRetry}
              className="text-xs text-slate-400 hover:text-slate-200 underline mr-2"
            >
              Exit Retry
            </button>
          )}
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300">
            <span className="text-purple-400">{currentIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span>{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 border border-slate-800/80 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-100 leading-relaxed">
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
                className={`w-full p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500 text-purple-100 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {optionLabel}
                  </span>
                  <span className="text-sm font-medium">{option}</span>
                </div>

                {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation & Submit Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="py-3 px-6 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium text-sm flex items-center gap-2 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Award className="w-4 h-4" />
            <span>Submit Quiz</span>
          </button>
        )}
      </div>
    </div>
  );
}
