export interface Choice {
  text: string;
  feedback: string;
  scoreChange: number;
  nextScenarioId?: number; // The ID of the next scenario to jump to
}

export interface Scenario {
  id: number; // Unique ID for each scenario
  situation: string;
  choices: Choice[];
}

export type GameState = 'title' | 'playing' | 'end';

export type GameMode = 'solo' | 'multiplayer';

export type MultiplayerStep = 'waiting' | 'inputting';
