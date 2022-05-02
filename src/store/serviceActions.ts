import { questionsLoading, questionsLoadinsSuccess, questionsLoadingError } from './gameState/gameState';
import { quizData } from '../services/quizData';
import { AppDispatch } from './rootReducer';

export const loadQuestionsAction = (group: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(questionsLoading);
    const questions = await quizData.getQuestionsByCategory(group);
    dispatch(questionsLoadinsSuccess(questions));
  } catch (err: any) {
    dispatch(questionsLoadingError(err.message));
  }
};
