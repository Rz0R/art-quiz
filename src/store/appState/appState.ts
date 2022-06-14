import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types/appState';
import { NameSpace, AppRoute } from '../../consts/const';

export const initialState: AppState = {
  previousUrl: AppRoute.Root,
};

export const appStateSlice = createSlice({
  name: NameSpace.app,
  initialState,
  reducers: {
    setPreviousUrl(state, action: PayloadAction<string>) {
      state.previousUrl = action.payload;
    },
  },
});

export const { setPreviousUrl } = appStateSlice.actions;
export const appState = appStateSlice.reducer;
