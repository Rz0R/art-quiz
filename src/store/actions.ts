import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { ArtistQuestions, PaintingQuestions } from '../types/questions';

export const loadQuizData = createAction(ActionType.LoadQuizData, (isQuizDataLoaded: boolean) => ({
  payload: isQuizDataLoaded,
}));

export const loadQuestions = createAction(ActionType.LoadQuestions, (questions: ArtistQuestions | PaintingQuestions) => ({
  payload: questions,
}));
