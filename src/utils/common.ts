import { quizImagePath } from '../consts/assetsPaths';

export const createImageUrl = (imageNum: string) => {
  return `${quizImagePath}/${imageNum}.webp`;
};

export const replaceElementInArray = <T>(array: T[], ind: number, el: T): T[] => {
  if (array.length === 0 || array.length <= ind || ind < 0) {
    return array;
  }

  return [...array.slice(0, ind), el, ...array.slice(ind + 1)];
};

export const formatTime = (totalSeconds: number) => {
  const min = `0${Math.floor(totalSeconds / 60)}`.slice(-2);
  const sec = `0${totalSeconds % 60}`.slice(-2);
  return `${min}:${sec}`;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
