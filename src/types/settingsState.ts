import { Language } from '../consts/const';

export type SettingsState = {
  volumeLevel: number;
  isVolumeOn: boolean;
  isTimerOn: boolean;
  time: number;
  language: Language;
};
