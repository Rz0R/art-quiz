import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState as State } from '../store/rootReducer';

export enum ActionType {
  LoadQuizData = 'APP/LoadQuizData',
  LoadQuestions = 'GAME/LoadQuestions',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, unknown, AnyAction>;

export type ThunkAppDispatch = ThunkDispatch<State, unknown, AnyAction>;
