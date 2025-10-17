
import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="relative my-4">
      <div className="bg-gray-900/70 rounded-t-md px-4 py-2 border-b border-gray-600">
        <span className="text-xs text-gray-400">Code</span>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition"
        >
          {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        </button>
      </div>
      <pre className="p-4 bg-gray-900/70 rounded-b-md overflow-x-auto">
        <code className="text-sm font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white max-w-none">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const codeContent = part.replace(/^```(?:\w+\n)?|```$/g, '');
          return <CodeBlock key={index} code={codeContent} />;
        }
        
        // Basic handling for other markdown elements
        const textWithBold = part.split(/(\*\*.*?\*\*)/g).map((textPart, i) => {
            if (textPart.startsWith('**') && textPart.endsWith('**')) {
                return <strong key={i}>{textPart.slice(2, -2)}</strong>;
            }
            return textPart;
        });
        
        return (
          <div key={index} className="whitespace-pre-wrap leading-relaxed text-gray-300">
            {textWithBold}
          </div>
        );
      })}
    </div>
  );
};
