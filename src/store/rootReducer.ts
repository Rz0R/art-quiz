import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appState } from './appState/appState';
import { gameState } from './gameState/gameState';
import { resultState } from './resultState/resultState';
import { scoreState } from './scoreState/scoreState';
import { settingsState } from './settingsState/settingsState';
import { NameSpace } from '../consts/const';

export const rootReducer = combineReducers({
  [NameSpace.app]: appState,
  [NameSpace.game]: gameState,
  [NameSpace.results]: resultState,
  [NameSpace.scores]: scoreState,
  [NameSpace.settings]: settingsState,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
