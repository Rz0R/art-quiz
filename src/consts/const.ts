export const URL = '/data/images.json';

export const GROUP_QUANTITY = 12;

export const NUMBER_OF_ALL_GROUPS = GROUP_QUANTITY * 2;

export const QUESTIONS_IN_GROUP = 10;

export const NUMBER_OF_POSSIBLE_ANSWERS = 4;

export enum NameSpace {
  app = 'APP',
  game = 'GAME',
  results = 'RESULTS',
  scores = 'SCORES',
  settings = 'SETTINGS',
}

export enum QuestionsText {
  ARTIST = 'Who is the author of this picture?',
  PAINTING = 'Which is {AUTHOR} picture?',
}

export type POPUP_TYPE = 'INFO' | 'RESULT' | 'GAME_OVER';

export type CORRECT_ANSWERS_TYPE = 'CORRECT' | 'WRONG' | null;

export enum LOCAL_STORAGE_KEYS {
  ANSWERS = 'answers',
}

export enum CategoryType {
  ARTISTS = 'artists',
  PAINTINGS = 'paintings',
}

export enum TimerActions {
  PLAY = 'play',
  STOP = 'stop',
  RESET = 'reset',
}

export const ANIMATION_TIME = 500;
