import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appState } from './appState/appState';
import { gameState } from './gameState/gameState';
import { NameSpace } from '../consts/const';

export const rootReducer = combineReducers({
  [NameSpace.app]: appState,
  [NameSpace.game]: gameState,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
