import { quizImagePath } from '../consts/assetsPaths';

export const createImageUrl = (imageNum: string) => {
  return `${quizImagePath}/${imageNum}.webp`;
};

export const replaceElementInArray = (array: any[], ind: number, el: any) => {
  if (array.length === 0 || array.length <= ind || ind < 0) {
    return array;
  }

  return [...array.slice(0, ind), el, ...array.slice(ind + 1)];
};
