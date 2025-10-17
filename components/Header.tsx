
import React from 'react';
import { CodeIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <CodeIcon className="w-12 h-12 text-blue-400" />
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Backend Problem Solver AI
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        Your AI partner for debugging code, designing systems, and solving complex backend challenges.
      </p>
    </header>
  );
};
