import { LoadingStatus } from '../consts/const';

export type Images = string[];

export type CategoryState = {
  images: Images;
  loadingStatus: LoadingStatus;
  error: string;
};
