import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { NameSpace, TimerActions } from '../../consts/const';
import { ArtistQuestions, PaintingQuestions } from '../../types/questions';

const initialState: GameState = {
  artistQuestions: [],
  paintingQuetions: [],
  isLoading: false,
  error: '',
  timerActions: TimerActions.PLAY,
  isTimeOver: false,
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
    playTimer(state) {
      state.timerActions = TimerActions.PLAY;
    },
    stopTimer(state) {
      state.timerActions = TimerActions.STOP;
    },
    resetTimer(state) {
      state.timerActions = TimerActions.RESET;
      state.isTimeOver = false;
    },
    timeIsOver(state) {
      state.timerActions = TimerActions.STOP;
      state.isTimeOver = true;
    },
  },
});

const {
  questionsLoading,
  artistQuestionsLoadinsSuccess,
  paintingQuestionsLoadinsSuccess,
  questionsLoadingError,
  playTimer,
  stopTimer,
  resetTimer,
  timeIsOver,
} = gameStateSlice.actions;

export {
  questionsLoading,
  artistQuestionsLoadinsSuccess,
  paintingQuestionsLoadinsSuccess,
  questionsLoadingError,
  playTimer,
  stopTimer,
  resetTimer,
  timeIsOver,
};
export const gameState = gameStateSlice.reducer;
