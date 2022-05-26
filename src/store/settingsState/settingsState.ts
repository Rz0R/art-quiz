import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types/settingsState';
import { NameSpace } from '../../consts/const';

const initialState: SettingsState = {
  volumeLevel: 40,
  isMute: true,
  time: 20,
  isTimerOn: true,
};

export const settingsStateSlice = createSlice({
  name: NameSpace.settings,
  initialState,
  reducers: {},
});

export const settingsState = settingsStateSlice.reducer;
