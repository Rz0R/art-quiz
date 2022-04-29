import { ArtistQuestions, PaintingQuestions } from './questions';

export type GameState = {
  questions: ArtistQuestions | PaintingQuestions;
};
