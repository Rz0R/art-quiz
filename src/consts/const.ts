export const URL = '/data/images.json';

export const GROUP_QUANTITY = 12;

export const QUESTIONS_IN_GROUP = 10;

export const NUMBER_OF_POSSIBLE_ANSWERS = 4;

export enum NameSpace {
  app = 'APP',
  game = 'GAME',
}

export enum QuestionsText {
  ARTIST = 'Who is the author of this picture?',
  PAINTING = 'Which is {AUTHOR} picture?',
}

export type POPUP_TYPE = 'INFO' | 'RESULT' | 'GAME_OVER';

export const ANIMATION_TIME = 500;
