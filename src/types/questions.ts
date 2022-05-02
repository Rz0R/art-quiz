export type Question = {
  author: string;
  name: string;
  year: string;
  imageNum: string;
};

export type ArtistQuestion = {
  question: string;
  answer: string;
  imageNum: string;
  authors: string[];
};

export type PaintingQuestion = {
  question: string;
  paintings: string[];
};

export type Questions = Question[];
export type ArtistQuestions = ArtistQuestion[];
export type PaintingQuestions = PaintingQuestion[];
