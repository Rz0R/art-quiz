import { combineReducers } from '@reduxjs/toolkit';
import { appState } from './app-state/app-state';

export enum NameSpace {
  app = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.app]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
