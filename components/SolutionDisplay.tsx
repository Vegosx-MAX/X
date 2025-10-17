
import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface SolutionDisplayProps {
  solution: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-5 animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-2.5 bg-gray-600 rounded"></div>
      <div className="h-2.5 bg-gray-600 rounded w-5/6"></div>
      <div className="h-2.5 bg-gray-600 rounded w-11/12"></div>
    </div>
    <div className="h-24 bg-gray-700 rounded mt-6"></div>
    <div className="space-y-3">
      <div className="h-2.5 bg-gray-600 rounded"></div>
      <div className="h-2.5 bg-gray-600 rounded w-5/6"></div>
    </div>
  </div>
);

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution, isLoading, error }) => {
  const hasContent = solution || isLoading || error;

  if (!hasContent) {
    return (
        <div className="mt-8 text-center text-gray-500">
            <p>Your expert solution will appear here.</p>
        </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg p-6 min-h-[200px]">
      <h2 className="text-lg font-semibold text-white mb-4">AI Solution</h2>
      {isLoading && <LoadingSkeleton />}
      {error && (
        <div className="text-red-400 bg-red-900/30 p-4 rounded-md">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && solution && <MarkdownRenderer content={solution} />}
    </div>
  );
};
