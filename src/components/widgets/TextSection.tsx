import React from 'react';
import { MathRenderer } from '../common/MathRenderer';

interface TextSectionProps {
  title: string;
  content: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ title, content }) => {
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\$\$[\s\S]*?\$\$)/g);

    return parts.map((part, pIdx) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        return (
          <div key={pIdx} className="my-4 p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 text-center text-cyan-900 font-medium">
            <MathRenderer math={math} displayMode={true} />
          </div>
        );
      }

      if (part.includes('|') && part.includes('---')) {
        return renderMarkdownTable(part, pIdx);
      }

      if (part.trim().startsWith('>')) {
        const quoteText = part.replace(/^>\s*/gm, '');
        return (
          <blockquote
            key={pIdx}
            className="my-4 pl-4 py-2 border-l-3 border-cyan-600 bg-cyan-50/60 rounded-r-xl text-slate-700 italic"
          >
            {renderInlineContent(quoteText)}
          </blockquote>
        );
      }

      const lines = part.split('\n');
      return (
        <div key={pIdx} className="space-y-3">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={lIdx} className="text-lg font-bold text-slate-900 mt-6 mb-2 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  {renderInlineContent(trimmed.replace('### ', ''))}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={lIdx} className="text-sm font-bold text-cyan-800 mt-4 mb-1 uppercase tracking-wider">
                  {renderInlineContent(trimmed.replace('#### ', ''))}
                </h4>
              );
            }
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2.5 ml-3 text-slate-700 leading-relaxed text-sm">
                  <span className="text-cyan-600 font-bold mt-1">•</span>
                  <span>{renderInlineContent(trimmed.substring(2))}</span>
                </div>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              const num = trimmed.match(/^(\d+\.)\s/)?.[1];
              const rest = trimmed.replace(/^\d+\.\s/, '');
              return (
                <div key={lIdx} className="flex items-start gap-2.5 ml-3 text-slate-700 leading-relaxed text-sm">
                  <span className="text-cyan-700 font-mono text-xs font-bold">{num}</span>
                  <span>{renderInlineContent(rest)}</span>
                </div>
              );
            }

            return (
              <p key={lIdx} className="text-slate-700 leading-relaxed text-sm">
                {renderInlineContent(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const renderInlineContent = (str: string) => {
    const segments = str.split(/(\$[^$]+\$)/g);

    return segments.map((seg, idx) => {
      if (seg.startsWith('$') && seg.endsWith('$') && seg.length > 2) {
        const math = seg.slice(1, -1);
        return <MathRenderer key={idx} math={math} className="text-cyan-800 font-semibold px-0.5" />;
      }

      const boldParts = seg.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return (
            <strong key={bIdx} className="text-slate-900 font-bold">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  };

  const renderMarkdownTable = (tableText: string, key: number) => {
    const lines = tableText.trim().split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length < 2) return <div key={key}>{tableText}</div>;

    const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
    const rows = lines.slice(2).map(line =>
      line.split('|').map(s => s.trim()).filter(Boolean)
    );

    return (
      <div key={key} className="my-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 font-mono">{renderInlineContent(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/80 transition-all">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className={`px-4 py-3 leading-relaxed ${cIdx === 0 ? 'font-mono text-slate-900 font-medium' : ''}`}>
                    {renderInlineContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card border-l-4 border-l-cyan-600">
      <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
        {title}
      </h2>
      <div className="space-y-4">
        {renderFormattedText(content)}
      </div>
    </div>
  );
};
