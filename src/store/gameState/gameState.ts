import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { NameSpace } from '../../consts/const';
import { ArtistQuestions, PaintingQuestions } from '../../types/questions';

const initialState: GameState = {
  artistQuestions: [],
  paintingQuetions: [],
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
    artistQuestionsLoadinsSuccess(state, action: PayloadAction<ArtistQuestions>) {
      state.isLoading = false;
      state.error = '';
      state.artistQuestions = action.payload;
    },
    paintingQuestionsLoadinsSuccess(state, action: PayloadAction<PaintingQuestions>) {
      state.isLoading = false;
      state.error = '';
      state.paintingQuetions = action.payload;
    },
    questionsLoadingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { questionsLoading, artistQuestionsLoadinsSuccess, paintingQuestionsLoadinsSuccess, questionsLoadingError } = gameStateSlice.actions;

export { questionsLoading, artistQuestionsLoadinsSuccess, paintingQuestionsLoadinsSuccess, questionsLoadingError };
export const gameState = gameStateSlice.reducer;
