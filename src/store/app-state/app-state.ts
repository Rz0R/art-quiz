import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../types/appState';
import { loadQuizData } from '../actions';

export const initialState: AppState = {
  isQuizDataLoaded: false,
};

export const appState = createReducer(initialState, (builder) => {
  builder.addCase(loadQuizData, (state, action) => {
    state.isQuizDataLoaded = action.payload;
  });
});
