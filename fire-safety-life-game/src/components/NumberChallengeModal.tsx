import React, { useState, useCallback } from 'react';

interface NumberChallengeModalProps {
  onSuccess: () => void;
  targetNumber: number;
}

const NumberChallengeModal: React.FC<NumberChallengeModalProps> = ({ onSuccess, targetNumber }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(inputValue, 10) === targetNumber) {
      onSuccess();
    } else {
      setError('틀렸습니다! 비밀 코드를 다시 확인하세요.');
      setInputValue('');
    }
  }, [inputValue, onSuccess, targetNumber]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <form 
        onSubmit={handleSubmit}
        className="p-8 rounded-xl w-full max-w-md border-2 border-slate-600 bg-slate-800/80 shadow-2xl flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-4 text-yellow-300 text-center">
          챌린지: 비밀 코드 입력
        </h2>
        <p className="text-center text-slate-300 mb-6">
            다음으로 진행하려면 친구에게 전달받은 비밀 코드를 입력하세요.
        </p>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          className="w-full p-4 text-center text-4xl font-bold bg-slate-900 border-2 border-slate-500 rounded-lg text-white focus:outline-none focus:ring-4 focus:ring-yellow-400/50 mb-4"
          autoFocus
        />
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          입력
        </button>
      </form>
    </div>
  );
};

export default NumberChallengeModal;