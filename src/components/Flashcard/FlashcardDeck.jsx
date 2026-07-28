import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Sparkles, HelpCircle } from 'lucide-react';
import FlashcardCard from './FlashcardCard';

export default function FlashcardDeck({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl">
        <p className="text-slate-400">No flashcards available.</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const totalCards = flashcards.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Keyboard shortcut listener (Left/Right Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalCards]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header & Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-100">Flashcards</h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300">
          <span className="text-indigo-400">{currentIndex + 1}</span>
          <span className="text-slate-600">/</span>
          <span>{totalCards}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 border border-slate-800/80 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
        />
      </div>

      {/* Card Display */}
      <div className="flex justify-center my-4">
        <FlashcardCard
          flashcard={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      {/* Control Buttons Bar */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleFlip}
          className="py-3 px-5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <RotateCw className="w-4 h-4" />
          <span>Flip Card</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
