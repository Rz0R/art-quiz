import { quizImagePath } from '../consts/assetsPaths';

export const createImageUrl = (imageNum: string) => {
  return `${quizImagePath}/${imageNum}.webp`;
};
