import React from 'react';
import type { Scenario, Choice } from '../types';

interface ResultModalProps {
  scenario: Scenario;
  playerChoice: Choice;
  onNext: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ scenario, playerChoice, onNext }) => {

  const getChoiceStyle = (choice: Choice) => {
    if (choice.scoreChange > 0) {
      return {
        borderColor: 'border-green-500/50',
        scoreColor: 'text-green-400',
      };
    } else if (choice.scoreChange < 0) {
      return {
        borderColor: 'border-red-500/50',
        scoreColor: 'text-red-400',
      };
    } else {
      return {
        borderColor: 'border-slate-500/50',
        scoreColor: 'text-slate-400',
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="p-8 rounded-xl w-full max-w-2xl border-2 border-slate-600 bg-slate-800/80 shadow-2xl flex flex-col max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-6 text-sky-300 text-center">
          선택 결과
        </h2>
        <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
          {scenario.choices.map((choice, index) => {
            const { borderColor, scoreColor } = getChoiceStyle(choice);
            const isPlayerChoice = choice.text === playerChoice.text;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${borderColor} ${isPlayerChoice ? 'bg-sky-500/20 ring-2 ring-sky-400' : 'bg-slate-700/50'}`}
              >
                <p className={`text-lg font-semibold mb-2 ${isPlayerChoice ? 'text-sky-300' : 'text-white'}`}>
                  {isPlayerChoice && '👉 '}
                  {choice.text}
                </p>
                <p className="text-slate-300 mb-3">{choice.feedback}</p>
                <p className={`text-right font-bold text-lg ${scoreColor}`}>
                  안전 점수 {choice.scoreChange >= 0 ? '+' : ''}{choice.scoreChange}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;