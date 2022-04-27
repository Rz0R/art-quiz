import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuizData } from './services/quizData';
import { URL } from './consts/const';

const quizData = new QuizData(URL);

const quizDataLoad = async () => {
  await quizData.initData();
  console.log(quizData.getQuestionsByCategory(23));
};

quizDataLoad();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
