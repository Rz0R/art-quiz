import { GameQuestions } from './questions';
import { TimerActions, LoadingStatus } from '../consts/const';

export type GameState = {
  questions: GameQuestions;
  loadingStatus: LoadingStatus;
  error: string;
  timerActions: TimerActions;
  isTimeOver: boolean;
};
