import { questionsLoading, gameQuestionsLoadingSuccess, questionsLoadingError } from './gameState/gameState';
import { imagesLoading, imagesLoadingSuccess, imagesLoadingError } from './categoryState/categoryState';
import { saveResult } from './resultState/resultState';
import { scoreQuestionsLoading, scoreQuestionsLoadingSucces, scoreQuestionsLoadingError } from './scoreState/scoreState';
import { setVolume, setTimer, setLanguage } from './settingsState/settingsState';
import { quizData } from '../services/quizData';
import { AppDispatch } from './rootReducer';
import { CategoryType, GROUP_QUANTITY, Language, LOCAL_STORAGE_KEYS } from '../consts/const';
import { store } from './rootReducer';
import { replaceElementInArray } from '../utils/common';

export const loadQuestionsAction = (category: CategoryType, group: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(questionsLoading());
    const lang = store.getState().SETTINGS.language;
    if (category === CategoryType.ARTISTS) {
      const questions = await quizData.getArtistCategoryQuestions(group - 1, lang);
      dispatch(gameQuestionsLoadingSuccess(questions));
    } else {
      const questions = await quizData.getPaintingCategoryQuestions(group - 1, lang);
      dispatch(gameQuestionsLoadingSuccess(questions));
    }
  } catch (err: any) {
    dispatch(questionsLoadingError(err.message));
  }
};

export const getImagesForCategoriesAction = (category: CategoryType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(imagesLoading());
    const lang = store.getState().SETTINGS.language;
    const images = await quizData.getImagesForCategories(category, lang);
    dispatch(imagesLoadingSuccess(images));
  } catch (err: any) {
    dispatch(imagesLoadingError(err.message));
  }
};

export const loadScoreQuestionsAction = (group: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scoreQuestionsLoading());
    const lang = store.getState().SETTINGS.language;
    const questions = await quizData.getScoreQestionsByGroup(group - 1, lang);
    dispatch(scoreQuestionsLoadingSucces(questions));
  } catch (err: any) {
    dispatch(scoreQuestionsLoadingError(err.message));
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

  localStorage.setItem(LOCAL_STORAGE_KEYS.ANSWERS, JSON.stringify(newResult));

  dispatch(saveResult(newResult));
};

export const saveSettingsAction =
  (settings: { isVolumeOn: boolean; volumeLevel: number; isTimerOn: boolean; time: number; language: Language }) =>
  (dispatch: AppDispatch) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));

    const { isVolumeOn, volumeLevel, isTimerOn, time, language } = settings;
    dispatch(setVolume({ isVolumeOn, volumeLevel }));
    dispatch(setTimer({ isTimerOn, time }));
    dispatch(setLanguage(language));
  };
