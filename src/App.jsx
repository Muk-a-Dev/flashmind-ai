import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/Home/HomePage';
import LoadingSpinner from './components/Layout/LoadingSpinner';
import ErrorMessage from './components/Layout/ErrorMessage';
import FlashcardDeck from './components/Flashcard/FlashcardDeck';
import QuizView from './components/Quiz/QuizView';
import ResultsView from './components/Results/ResultsView';
import { useGenerateNotes } from './hooks/useGenerateNotes';
import { Layers, HelpCircle, Award } from 'lucide-react';

export default function App() {
  const {
    data,
    loading,
    error,
    generate,
    retry,
    reset: resetHook,
  } = useGenerateNotes();

  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards' | 'quiz' | 'results'
  const [quizResults, setQuizResults] = useState(null);
  const [activeQuizSet, setActiveQuizSet] = useState([]);
  const [isRetryMode, setIsRetryMode] = useState(false);

  // Synchronize quiz set when AI generates new data
  useEffect(() => {
    if (data?.quiz) {
      setActiveQuizSet(data.quiz);
      setQuizResults(null);
      setIsRetryMode(false);
      setActiveTab('flashcards');
    }
  }, [data]);

  const handleReset = () => {
    resetHook();
    setQuizResults(null);
    setActiveQuizSet([]);
    setIsRetryMode(false);
    setActiveTab('flashcards');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setActiveTab('results');
  };

  const handleRetryWrong = () => {
    if (quizResults?.wrongItems?.length > 0) {
      setActiveQuizSet(quizResults.wrongItems);
      setIsRetryMode(true);
      setActiveTab('quiz');
    }
  };

  const handleRetakeFull = () => {
    if (data?.quiz) {
      setActiveQuizSet(data.quiz);
      setIsRetryMode(false);
      setQuizResults(null);
      setActiveTab('quiz');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar onReset={handleReset} hasData={Boolean(data)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage error={error} onRetry={retry} />
        )}

        {!loading && !error && !data && (
          <HomePage onGenerate={generate} loading={loading} />
        )}

        {!loading && !error && data && (
          <div className="space-y-8">
            {/* View Mode Navigation Tabs */}
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                    activeTab === 'flashcards'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Flashcards</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                    activeTab === 'quiz'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('results')}
                  disabled={!quizResults}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    activeTab === 'results'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Results</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'flashcards' && (
              <FlashcardDeck flashcards={data.flashcards} />
            )}

            {activeTab === 'quiz' && (
              <QuizView
                quiz={activeQuizSet}
                onComplete={handleQuizComplete}
                isRetryMode={isRetryMode}
                onCancelRetry={handleRetakeFull}
              />
            )}

            {activeTab === 'results' && (
              <ResultsView
                results={quizResults}
                onRetryWrong={handleRetryWrong}
                onRetakeFull={handleRetakeFull}
              />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-6 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>FlashMind AI © {new Date().getFullYear()} • Frontend Internship Project</span>
          <span className="text-slate-600">Built with React, Express, TailwindCSS & Groq API</span>
        </div>
      </footer>
    </div>
  );
}
