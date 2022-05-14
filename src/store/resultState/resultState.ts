import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, NUMBER_OF_ALL_GROUPS, LOCAL_STORAGE_KEYS } from '../../consts/const';
import { ResultState, AnswerResults } from '../../types/resultState';

const localResults = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS) || '[]') as AnswerResults;

const initialState: ResultState = {
  answers: (localResults.length > 0 && localResults) || new Array(NUMBER_OF_ALL_GROUPS).fill(null),
};

export const resultStateSlice = createSlice({
  name: NameSpace.results,
  initialState,
  reducers: {
    saveResult(state, action: PayloadAction<AnswerResults>) {
      state.answers = action.payload;
    },
  },
});

const { saveResult } = resultStateSlice.actions;

export { saveResult };
export const resultState = resultStateSlice.reducer;
