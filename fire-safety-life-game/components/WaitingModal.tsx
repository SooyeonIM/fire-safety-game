import React from 'react';

const WaitingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="p-8 rounded-xl w-full max-w-md text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400 mx-auto mb-6"></div>
        <h2 className="text-3xl font-bold text-white">
          다른 친구들을 기다려요...
        </h2>
      </div>
    </div>
  );
};

export default WaitingModal;
