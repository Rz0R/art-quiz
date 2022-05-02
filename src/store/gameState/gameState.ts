import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { NameSpace } from '../../consts/const';
import { ArtistQuestions } from '../../types/questions';

const initialState: GameState = {
  questions: [],
  isLoading: false,
  error: '',
};

export const gameStateSlice = createSlice({
  name: NameSpace.game,
  initialState,
  reducers: {
    questionsLoading(state) {
      state.isLoading = true;
      state.error = '';
    },
    questionsLoadinsSuccess(state, action: PayloadAction<ArtistQuestions>) {
      state.isLoading = false;
      state.error = '';
      state.questions = action.payload;
    },
    questionsLoadingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { questionsLoading, questionsLoadinsSuccess, questionsLoadingError } = gameStateSlice.actions;

export { questionsLoading, questionsLoadinsSuccess, questionsLoadingError };
export const gameState = gameStateSlice.reducer;
