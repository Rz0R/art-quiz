import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScoreState } from '../../types/scoreState';
import { NameSpace } from '../../consts/const';
import { Questions } from '../../types/questions';

const initialState: ScoreState = {
  questions: [],
  isLoading: false,
  error: '',
};

export const scoreStateSlice = createSlice({
  name: NameSpace.scores,
  initialState,
  reducers: {
    scoreQuestionsLoading(state) {
      state.isLoading = true;
      state.error = '';
    },
    scoreQuestionsLoadingSucces(state, action: PayloadAction<Questions>) {
      state.isLoading = false;
      state.error = '';
      state.questions = action.payload;
    },
    scoreQuestionsLoadingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { scoreQuestionsLoading, scoreQuestionsLoadingSucces, scoreQuestionsLoadingError } = scoreStateSlice.actions;

export { scoreQuestionsLoading, scoreQuestionsLoadingSucces, scoreQuestionsLoadingError };
export const scoreState = scoreStateSlice.reducer;
