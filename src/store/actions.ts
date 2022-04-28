import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';

export const loadQuizData = createAction(ActionType.LoadQuizData, (isQuizDataLoaded: boolean) => ({
  payload: isQuizDataLoaded,
}));
