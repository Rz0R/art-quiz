import { ArtistQuestions, PaintingQuestions } from './questions';
import { TimerActions, LoadingStatus } from '../consts/const';

export type GameState = {
  artistQuestions: ArtistQuestions;
  paintingQuetions: PaintingQuestions;
  loadingStatus: LoadingStatus;
  error: string;
  timerActions: TimerActions;
  isTimeOver: boolean;
};
