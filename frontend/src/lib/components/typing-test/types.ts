export type StageKey = 'easy' | 'medium' | 'hard';

export interface StageConfig {
  label: string;
  timeLimit: number;
  wordMin: number;
  wordMax: number;
}

export interface Result {
  wpm: number;
  accuracy: number;
  correctChars: number;
  wrongChars: number;
  timeSecs: number;
}
