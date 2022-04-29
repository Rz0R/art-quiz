import { createReducer } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { loadQuestions } from '../actions';

const initialState: GameState = {
  questions: [],
};

export const gameState = createReducer(initialState, (builder) => {
  builder.addCase(loadQuestions, (state, action) => {
    state.questions = action.payload;
  });
});
