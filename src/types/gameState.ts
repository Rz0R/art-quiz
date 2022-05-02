import { ArtistQuestions, PaintingQuestions } from './questions';

export type GameState = {
  questions: ArtistQuestions;
  isLoading: boolean;
  error: string;
};
