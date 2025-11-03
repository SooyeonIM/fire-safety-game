import React from 'react';
import { SuccessIcon, FailureIcon } from './icons/Icons';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart }) => {
  const isSuccess = score > 0;

  const getMessage = () => {
    if (score >= 1000) {
      return '완벽한 탈출! 당신은 진정한 안전 전문가입니다. 용감한 시민상을 드립니다!';
    } else if (isSuccess) {
      return '무사히 탈출했지만, 몇 번의 아찔한 순간이 있었네요. 오늘의 경험을 잊지 마세요!';
    } else {
      return '탈출에 실패했습니다. 다행히 구조되었지만, 화재 안전에 대해 더 배울 필요가 있어요. 다시 도전해보세요!';
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center p-8 bg-black/30 rounded-xl backdrop-blur-sm border border-white/20 shadow-2xl animate-fade-in">
      {isSuccess ? (
        <SuccessIcon className="w-24 h-24 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
      ) : (
        <FailureIcon className="w-24 h-24 text-slate-500 mb-4 drop-shadow-[0_0_15px_rgba(100,116,139,0.7)]" />
      )}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {isSuccess ? '탈출 성공!' : '탈출 실패'}
      </h1>
      <p className="text-xl md:text-2xl mb-2">최종 안전 점수</p>
      <p className={`text-6xl font-extrabold mb-6 ${isSuccess ? 'text-yellow-300' : 'text-red-400'}`}>
        {score}
      </p>
      <p className="text-xl mb-8 max-w-lg">{getMessage()}</p>
      <button
        onClick={onRestart}
        className="px-10 py-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xl rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
      >
        다시하기
      </button>
    </div>
  );
};

export default EndScreen;