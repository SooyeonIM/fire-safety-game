import React from 'react';
import { FireIcon } from './icons/Icons';
import type { GameMode } from '../types';

interface TitleScreenProps {
  onModeSelect: (mode: GameMode) => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onModeSelect }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-8 bg-black/30 rounded-xl backdrop-blur-sm border border-white/20 shadow-2xl animate-fade-in">
      <FireIcon className="w-24 h-24 text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
      <h1 className="text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500">
        불이야!
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-slate-200">
        안전탈출 인생게임
      </h2>
      <p className="max-w-xl mb-8 text-slate-300">
        6학년 과학 '연소와 소화' 단원을 바탕으로 만들었어요.
        화재 상황에서 올바른 선택을 하여 안전 점수를 지켜보세요!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onModeSelect('solo')}
          className="px-10 py-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xl rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
        >
          혼자하기
        </button>
        <button
          onClick={() => onModeSelect('multiplayer')}
          className="px-10 py-4 bg-gradient-to-br from-yellow-500 to-red-600 text-white font-bold text-xl rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
        >
          함께하기
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
