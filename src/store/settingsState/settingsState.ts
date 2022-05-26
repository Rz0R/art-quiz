import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types/settingsState';
import { NameSpace, TIMER_DEFAULT_SETTINGS } from '../../consts/const';

const initialState: SettingsState = {
  volumeLevel: 40,
  isMute: true,
  time: TIMER_DEFAULT_SETTINGS.TIME,
  isTimerOn: TIMER_DEFAULT_SETTINGS.IS_TIMER_ON,
};

export const settingsStateSlice = createSlice({
  name: NameSpace.settings,
  initialState,
  reducers: {
    setTimer(state, action: PayloadAction<{ isTimerOn: boolean; time: number }>) {
      state.time = action.payload.time;
      state.isTimerOn = action.payload.isTimerOn;
    },
  },
});

const { setTimer } = settingsStateSlice.actions;
export { setTimer };

export const settingsState = settingsStateSlice.reducer;
