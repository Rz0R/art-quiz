import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState, Images } from '../../types/categoryState';
import { LoadingStatus, NameSpace } from '../../consts/const';

const initialState: CategoryState = {
  images: [],
  loadingStatus: LoadingStatus.IDLE,
  error: '',
};

export const categoryStateSlice = createSlice({
  name: NameSpace.category,
  initialState,
  reducers: {
    imagesLoading(state) {
      state.loadingStatus = LoadingStatus.LOADING;
      state.error = '';
    },
    imagesLoadingSuccess(state, action: PayloadAction<Images>) {
      state.loadingStatus = LoadingStatus.SUCCEEDED;
      state.error = '';
      state.images = action.payload;
    },
    imagesLoadingError(state, action: PayloadAction<string>) {
      state.loadingStatus = LoadingStatus.FAILED;
      state.error = action.payload;
    },
    imagesLoadingIdle(state) {
      state.loadingStatus = LoadingStatus.IDLE;
      state.error = '';
      state.images = [];
    },
  },
});

export const { imagesLoading, imagesLoadingSuccess, imagesLoadingError, imagesLoadingIdle } = categoryStateSlice.actions;

export const categoryState = categoryStateSlice.reducer;
