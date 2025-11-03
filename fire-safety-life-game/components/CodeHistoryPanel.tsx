import React from 'react';

interface CodeHistoryPanelProps {
  codes: number[];
}

const CodeHistoryPanel: React.FC<CodeHistoryPanelProps> = ({ codes }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4 z-20 animate-fade-in max-w-xs">
      <h3 className="text-md font-bold text-yellow-300 mb-3 border-b border-yellow-300/30 pb-2">
        비밀 코드 기록
      </h3>
      <ol className="flex flex-wrap gap-x-3 gap-y-2 items-center">
        {codes.map((code, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="bg-slate-700 text-white font-mono text-lg px-3 py-1 rounded shadow-md">
              {code}
            </span>
            {index < codes.length - 1 && (
              <span className="text-slate-400 text-xl font-light">&rarr;</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CodeHistoryPanel;
