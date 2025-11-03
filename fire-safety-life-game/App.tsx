import React, { useState, useCallback, useEffect } from 'react';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import ResultModal from './components/ResultModal';
import WaitingModal from './components/WaitingModal';
import NumberChallengeModal from './components/NumberChallengeModal';
import { GAME_SCENARIOS, INITIAL_SCORE, SECRET_CODES } from './constants';
import type { GameState, Choice, GameMode, MultiplayerStep } from './types';
import { FireIcon, SafetyIcon } from './components/icons/Icons';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('title');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [score, setScore] = useState<number>(INITIAL_SCORE);
  const [currentScenarioId, setCurrentScenarioId] = useState<number>(1);
  const [showResults, setShowResults] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [multiplayerStep, setMultiplayerStep] = useState<MultiplayerStep | null>(null);
  const [challengeNumber, setChallengeNumber] = useState<number>(0);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setScore(INITIAL_SCORE);
    setCurrentScenarioId(1);
    setShowResults(false);
    setPlayerChoice(null);
    setMultiplayerStep(null);
    setGameState('playing');
  }, []);
  
  const restartGame = useCallback(() => {
    setGameMode(null);
    setGameState('title');
  }, []);

  const handleChoiceSelected = useCallback((choice: Choice) => {
    setScore(prev => prev + choice.scoreChange);
    setPlayerChoice(choice);

    if (gameMode === 'solo') {
      setShowResults(true);
    } else {
      const nextId = choice.nextScenarioId;
      if (nextId && SECRET_CODES[nextId] !== undefined) {
        setChallengeNumber(SECRET_CODES[nextId]);
        setMultiplayerStep('waiting');
      } else {
        // No more challenges, or it's the end of a branch
        setShowResults(true);
      }
    }
  }, [gameMode]);

  useEffect(() => {
    if (multiplayerStep === 'waiting') {
      const timer = setTimeout(() => {
        setMultiplayerStep('inputting');
      }, 2000); // 2 seconds wait time
      return () => clearTimeout(timer);
    }
  }, [multiplayerStep]);

  const handleNumberChallengeSuccess = useCallback(() => {
    setMultiplayerStep(null);
    setShowResults(true);
  }, []);


  const handleNext = useCallback(() => {
    if (!playerChoice) return;

    const nextId = playerChoice.nextScenarioId;
    setShowResults(false);
    setPlayerChoice(null);

    if (nextId !== undefined) {
      const nextScenario = GAME_SCENARIOS.find(s => s.id === nextId);
      if (nextScenario) {
        setCurrentScenarioId(nextScenario.id);
      } else {
        setGameState('end');
      }
    } else {
      setGameState('end');
    }
  }, [playerChoice]);
  
  const currentScenario = GAME_SCENARIOS.find(s => s.id === currentScenarioId);

  const renderGameState = () => {
    switch (gameState) {
      case 'title':
        return <TitleScreen onModeSelect={handleModeSelect} />;
      case 'playing':
        if (!currentScenario) {
            return <EndScreen score={score} onRestart={restartGame} />;
        }
        return (
          <GameScreen
            scenario={currentScenario}
            onChoiceSelected={handleChoiceSelected}
          />
        );
      case 'end':
        return <EndScreen score={score} onRestart={restartGame} />;
      default:
        return <TitleScreen onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-red-500 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-yellow-500 rounded-full opacity-20 filter blur-3xl animate-pulse animation-delay-4000"></div>

      <main className="w-full max-w-4xl mx-auto z-10">
        {gameState === 'playing' && (
          <header className="mb-8 p-4 bg-black/30 rounded-lg backdrop-blur-sm border border-white/20 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <FireIcon />
              <span>화재탈출 생존게임</span>
            </h1>
            <div className="text-xl md:text-2xl font-bold flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg border border-green-400/50">
              <SafetyIcon />
              <span>안전 점수: {score}</span>
            </div>
          </header>
        )}
        {renderGameState()}
      </main>

      {multiplayerStep === 'waiting' && <WaitingModal />}
      {multiplayerStep === 'inputting' && (
        <NumberChallengeModal 
          onSuccess={handleNumberChallengeSuccess}
          targetNumber={challengeNumber} 
        />
      )}
      {showResults && currentScenario && playerChoice && (
        <ResultModal 
          scenario={currentScenario}
          playerChoice={playerChoice}
          onNext={handleNext} 
        />
      )}
    </div>
  );
}