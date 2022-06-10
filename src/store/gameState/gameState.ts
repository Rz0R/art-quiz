import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { LoadingStatus, NameSpace, TimerActions } from '../../consts/const';
import { ArtistQuestions, PaintingQuestions } from '../../types/questions';

const initialState: GameState = {
  artistQuestions: [],
  paintingQuetions: [],
  loadingStatus: LoadingStatus.IDLE,
  error: '',
  timerActions: TimerActions.PLAY,
  isTimeOver: false,
};

export const gameStateSlice = createSlice({
  name: NameSpace.game,
  initialState,
  reducers: {
    questionsLoading(state) {
      state.loadingStatus = LoadingStatus.LOADING;
      state.error = '';
    },
    artistQuestionsLoadinsSuccess(state, action: PayloadAction<ArtistQuestions>) {
      state.loadingStatus = LoadingStatus.SUCCEEDED;
      state.error = '';
      state.artistQuestions = action.payload;
    },
    paintingQuestionsLoadinsSuccess(state, action: PayloadAction<PaintingQuestions>) {
      state.loadingStatus = LoadingStatus.SUCCEEDED;
      state.error = '';
      state.paintingQuetions = action.payload;
    },
    questionsLoadingError(state, action: PayloadAction<string>) {
      state.loadingStatus = LoadingStatus.FAILED;
      state.error = action.payload;
    },
    questionsLoadingIdle(state) {
      state.loadingStatus = LoadingStatus.IDLE;
      state.error = '';
      state.artistQuestions = [];
      state.paintingQuetions = [];
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
  questionsLoadingIdle,
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
  questionsLoadingIdle,
  playTimer,
  stopTimer,
  resetTimer,
  timeIsOver,
};
export const gameState = gameStateSlice.reducer;
