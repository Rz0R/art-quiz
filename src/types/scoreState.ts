import { Questions } from './questions';

export type ScoreState = {
  questions: Questions;
  isLoading: boolean;
  error: string;
};
