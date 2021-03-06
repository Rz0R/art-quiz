import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types/settingsState';
import {
  NameSpace,
  TIMER_DEFAULT_SETTINGS,
  VOLUME_DEFAULT_SETTINGS,
  LANGUAGE_DEFAULT_SETTINGS,
  LOCAL_STORAGE_KEYS,
  Language,
} from '../../consts/const';

const defaultState: SettingsState = {
  volumeLevel: VOLUME_DEFAULT_SETTINGS.VALUE,
  isVolumeOn: VOLUME_DEFAULT_SETTINGS.IS_VOLUME_ON,
  time: TIMER_DEFAULT_SETTINGS.TIME,
  isTimerOn: TIMER_DEFAULT_SETTINGS.IS_TIMER_ON,
  language: LANGUAGE_DEFAULT_SETTINGS,
};

const localState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS) || 'null');

export const settingsStateSlice = createSlice({
  name: NameSpace.settings,
  initialState: (localState || defaultState) as SettingsState,
  reducers: {
    setTimer(state, action: PayloadAction<{ isTimerOn: boolean; time: number }>) {
      state.time = action.payload.time;
      state.isTimerOn = action.payload.isTimerOn;
    },
    setVolume(state, action: PayloadAction<{ isVolumeOn: boolean; volumeLevel: number }>) {
      state.volumeLevel = action.payload.volumeLevel;
      state.isVolumeOn = action.payload.isVolumeOn;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setVolume, setTimer, setLanguage } = settingsStateSlice.actions;

export const settingsState = settingsStateSlice.reducer;
