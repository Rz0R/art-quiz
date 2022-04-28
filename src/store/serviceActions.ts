import { loadQuizData } from './actions';
import { quizData } from '../services/quizData';
import { ThunkActionResult } from '../types/actions';

export const loadQuizDataAction =
  (): ThunkActionResult =>
  async (dispatch): Promise<void> => {
    try {
      await quizData.initData();
      dispatch(loadQuizData(true));
    } catch {
      dispatch(loadQuizData(false));
      console.log('Quiz data is not loaded!');
    }
  };
