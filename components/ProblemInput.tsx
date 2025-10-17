
import React from 'react';
import { SparklesIcon } from './icons';

interface ProblemInputProps {
  problem: string;
  setProblem: (problem: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProblemInput: React.FC<ProblemInputProps> = ({ problem, setProblem, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div>
      <label htmlFor="problem" className="block text-sm font-medium text-gray-300 mb-2">
        Describe your backend problem
      </label>
      <div className="relative">
        <textarea
          id="problem"
          name="problem"
          rows={8}
          className="block w-full rounded-md border-0 bg-gray-700/50 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 p-4 transition duration-150 ease-in-out"
          placeholder="e.g., How do I design a rate limiter for a microservice architecture? or My database query in Node.js is slow, how can I optimize it?"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
      </div>
      <div className="mt-4 flex justify-end items-center">
        <p className="text-xs text-gray-500 mr-4">
            {problem.length} characters | Ctrl+Enter to submit
        </p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !problem.trim()}
          className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              <SparklesIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Get Solution
            </>
          )}
        </button>
      </div>
    </div>
  );
};
