import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';
import { LoadingStatus, NameSpace, TimerActions } from '../../consts/const';
import { GameQuestions } from '../../types/questions';

const initialState: GameState = {
  questions: [],
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
    gameQuestionsLoadingSuccess(state, action: PayloadAction<GameQuestions>) {
      state.loadingStatus = LoadingStatus.SUCCEEDED;
      state.error = '';
      state.questions = action.payload;
    },
    questionsLoadingError(state, action: PayloadAction<string>) {
      state.loadingStatus = LoadingStatus.FAILED;
      state.error = action.payload;
    },
    questionsLoadingIdle(state) {
      state.loadingStatus = LoadingStatus.IDLE;
      state.error = '';
      state.questions = [];
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

export const {
  questionsLoading,
  gameQuestionsLoadingSuccess,
  questionsLoadingError,
  questionsLoadingIdle,
  playTimer,
  stopTimer,
  resetTimer,
  timeIsOver,
} = gameStateSlice.actions;

export const gameState = gameStateSlice.reducer;
