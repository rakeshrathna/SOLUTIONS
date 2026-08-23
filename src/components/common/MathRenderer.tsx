import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  math,
  displayMode = false,
  className = ''
}) => {
  const html = useMemo(() => {
    try {
      // output: 'html' prevents KaTeX from generating both MathML and HTML spans simultaneously,
      // eliminating duplicate formula text (e.g. O₂O₂, NaClNaCl)
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        strict: false,
        output: 'html'
      });
    } catch (err) {
      console.error('KaTeX rendering error for:', math, err);
      return `<span class="text-rose-600">${math}</span>`;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`inline-block ${displayMode ? 'w-full text-center my-2 overflow-x-auto py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
