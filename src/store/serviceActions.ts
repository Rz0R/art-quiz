import { loadQuizData, loadQuestions } from './actions';
import { quizData } from '../services/quizData';
import { AppDispatch } from './rootReducer';

export const loadQuestionsAction = (group: number) => async (dispatch: AppDispatch) => {
  const questions = await quizData.getQuestionsByCategory(group);
  dispatch(loadQuestions(questions));
};

export const loadQuizDataAction = () => async (dispatch: AppDispatch) => {
  try {
    await quizData.initData();
    dispatch(loadQuizData(true));
  } catch (err) {
    dispatch(loadQuizData(false));
    console.log('Quiz data is not loaded!');
  }
};
