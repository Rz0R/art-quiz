import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState as State } from '../store/rootReducer';

export enum ActionType {
  LoadQuizData = 'APP/LoadQuizData',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, unknown, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, unknown, Action>;
