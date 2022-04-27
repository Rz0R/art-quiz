import { quizImagePath } from '../consts/AseetsPaths';

export const createImageUrl = (imageNum: string) => {
  return `${quizImagePath}/${imageNum}.webp`;
};
