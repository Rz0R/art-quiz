import { ArtistQuestions, PaintingQuestions } from './questions';
import { TimerActions } from '../consts/const';

export type GameState = {
  artistQuestions: ArtistQuestions;
  paintingQuetions: PaintingQuestions;
  isLoading: boolean;
  error: string;
  timerActions: TimerActions;
  isTimeOver: boolean;
};
