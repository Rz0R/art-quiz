import {
  questionsLoading,
  artistQuestionsLoadinsSuccess,
  paintingQuestionsLoadinsSuccess,
  questionsLoadingError,
} from './gameState/gameState';
import { saveResult } from './resultState/resultState';
import { quizData } from '../services/quizData';
import { AppDispatch } from './rootReducer';
import { CategoryType, GROUP_QUANTITY } from '../consts/const';
import { store } from './rootReducer';
import { replaceElementInArray } from '../utils/common';

export const loadArtistQuestionsAction = (group: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(questionsLoading);
    const questions = await quizData.getArtistCategoryQuestions(group - 1);
    dispatch(artistQuestionsLoadinsSuccess(questions));
  } catch (err: any) {
    dispatch(questionsLoadingError(err.message));
  }
};

export const loadPaintingQuestionsAction = (group: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(questionsLoading);
    const questions = await quizData.getPaintingCategoryQuestions(group - 1);
    dispatch(paintingQuestionsLoadinsSuccess(questions));
  } catch (err: any) {
    dispatch(questionsLoadingError(err.message));
  }
};

export const saveResultAction = (result: string[] | null, category: CategoryType, group: number) => (dispatch: AppDispatch) => {
  if (category === CategoryType.ARTISTS) {
    group = group - 1;
  } else if (category === CategoryType.PAINTINGS) {
    group = group - 1 + GROUP_QUANTITY;
  }

  const results = store.getState().RESULTS.answers;

  const newResult = replaceElementInArray(results, group, result);

  localStorage.setItem('answers', JSON.stringify(newResult));

  dispatch(saveResult(newResult));
};
