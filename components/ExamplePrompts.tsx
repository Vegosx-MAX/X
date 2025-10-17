
import React from 'react';

interface ExamplePromptsProps {
  onExampleClick: (prompt: string) => void;
}

const prompts = [
  "Design a scalable job queue system using Redis and Node.js.",
  "What's the best way to handle database migrations in a CI/CD pipeline?",
  "Explain the difference between REST and gRPC with pros and cons.",
  "Provide a Python code example for a secure JWT authentication flow."
];

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onExampleClick }) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-400 text-center">Or try one of these examples</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onExampleClick(prompt)}
            className="text-left p-4 bg-gray-800/60 rounded-lg hover:bg-gray-700/80 transition duration-150 ease-in-out cursor-pointer border border-gray-700/50"
          >
            <p className="text-sm text-gray-300">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
