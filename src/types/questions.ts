import { QuestionType } from '../consts/const';

export type Question = {
  author: string;
  name: string;
  year: string;
  imageNum: string;
};

export type ArtistQuestion = {
  type: QuestionType.Artist;
  question: string;
  answer: string;
  author: string;
  imageNum: string;
  name: string;
  year: string;
  authors: string[];
};

export type PaintingQuestion = {
  type: QuestionType.Paintings;
  question: string;
  answer: string;
  author: string;
  imageNum: string;
  name: string;
  year: string;
  paintings: string[];
};

export type Questions = Question[];
export type ArtistQuestions = ArtistQuestion[];
export type PaintingQuestions = PaintingQuestion[];
export type GameQuestions = ArtistQuestions | PaintingQuestions;
