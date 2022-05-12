import { ArtistQuestions, PaintingQuestions } from './questions';

export type GameState = {
  artistQuestions: ArtistQuestions;
  paintingQuetions: PaintingQuestions;
  isLoading: boolean;
  error: string;
};
