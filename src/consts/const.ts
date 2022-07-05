export enum URL {
  EN = '/data/EN_images.json',
  RU = '/data/RU_images.json',
}

export enum Language {
  RU = 'RU',
  EN = 'EN',
}

export const GROUP_QUANTITY = 12;

export const NUMBER_OF_ALL_GROUPS = GROUP_QUANTITY * 2;

export const QUESTIONS_IN_GROUP = 10;

export const NUMBER_OF_POSSIBLE_ANSWERS = 4;

export enum NameSpace {
  app = 'APP',
  game = 'GAME',
  category = 'CATEGORY',
  results = 'RESULTS',
  scores = 'SCORES',
  settings = 'SETTINGS',
}

export const QUESTION_TEXT = {
  ARTIST: {
    EN: 'Who is the author of this picture?',
    RU: 'Кто автор этой картины?',
  },
  PAINTING: {
    EN: 'Which is {AUTHOR} picture?',
    RU: 'Какую картину написал {AUTHOR}',
  },
};

export enum POPUP_TYPE {
  INFO = 'INFO',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER',
}

export enum ANSWERS_TYPE {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  NO_ANSWER = 'NO_ANSWER',
}

export enum LOCAL_STORAGE_KEYS {
  ANSWERS = 'answers',
  SETTINGS = 'settings',
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

export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export const TIMER_DEFAULT_SETTINGS = {
  TIME: 60,
  IS_TIMER_ON: false,
  MIN_TIME: 5,
  MAX_TIME: 60,
  TIME_STEP: 5,
};

export const VOLUME_DEFAULT_SETTINGS = {
  VALUE: 0.4,
  IS_VOLUME_ON: true,
  MIN_VOLUME_VALUE: 0,
  MAX_VOLUME_VALUE: 1,
  VOLUME_STEP: 0.05,
};

export const ANIMATION_TIME = 500;

export enum AppRoute {
  Root = '/',
  Category = '/category',
  Score = '/score',
  Settings = '/settings',
}

export enum QuestionType {
  Artist = 'artist',
  Paintings = 'paintings',
}
