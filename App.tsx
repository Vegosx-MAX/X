
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProblemInput } from './components/ProblemInput';
import { SolutionDisplay } from './components/SolutionDisplay';
import { ExamplePrompts } from './components/ExamplePrompts';
import { solveBackendProblem } from './services/geminiService';

const App: React.FC = () => {
  const [problem, setProblem] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!problem.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSolution('');

    try {
      const result = await solveBackendProblem(problem);
      setSolution(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [problem, isLoading]);

  const handleExampleClick = useCallback((example: string) => {
    setProblem(example);
    setSolution('');
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg p-6">
          <ProblemInput 
            problem={problem} 
            setProblem={setProblem} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>

        <ExamplePrompts onExampleClick={handleExampleClick} />

        <SolutionDisplay 
          solution={solution} 
          isLoading={isLoading} 
          error={error} 
        />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini. For educational and conceptual purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
