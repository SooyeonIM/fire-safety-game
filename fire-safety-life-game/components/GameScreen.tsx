import React from 'react';
import type { Scenario, Choice } from '../types';

interface GameScreenProps {
  scenario: Scenario;
  onChoiceSelected: (choice: Choice) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scenario, onChoiceSelected }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in w-full">
      <div className="w-full text-left mb-6">
        <span className="bg-black/50 text-white text-xl font-bold px-4 py-2 rounded-lg">
          문제 {scenario.id}
        </span>
      </div>
      <div className="w-full p-8 bg-black/30 rounded-lg backdrop-blur-sm border border-white/20">
        <p className="text-3xl md:text-4xl text-center font-bold mb-10 leading-relaxed text-slate-100">
          {scenario.situation}
        </p>
        <div className="grid grid-cols-1 gap-5">
          {scenario.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onChoiceSelected(choice)}
              className="p-5 bg-slate-700/50 text-white rounded-lg text-left transition-all duration-300 hover:bg-sky-500/50 hover:border-sky-400 border-2 border-slate-600 focus:outline-none focus:ring-4 focus:ring-sky-400/50 transform hover:-translate-y-1"
            >
              <span className="text-xl md:text-2xl font-medium">{choice.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;