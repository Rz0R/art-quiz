import {
  questionsLoading,
  artistQuestionsLoadinsSuccess,
  paintingQuestionsLoadinsSuccess,
  questionsLoadingError,
} from './gameState/gameState';
import { quizData } from '../services/quizData';
import { AppDispatch } from './rootReducer';

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
