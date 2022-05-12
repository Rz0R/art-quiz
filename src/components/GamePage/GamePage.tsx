import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadArtistQuestionsAction, loadPaintingQuestionsAction } from '../../store/serviceActions';
import { replaceElementInArray } from '../../utils/common';
import { QUESTIONS_IN_GROUP, GROUP_QUANTITY } from '../../consts/const';
import Popup from './Popup';
import ArtistQuiz from './ArtistQuiz';
import PaintingQuiz from './PaintingQuiz';
import { POPUP_TYPE, ANIMATION_TIME, CORRECT_ANSWERS_TYPE } from '../../consts/const';

const GamePage: React.FC = () => {
  const { catId = '', groupId = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState({
    isAnswered: false,
    answers: [null, null, null, null],
  });
  const [pagination, setPagination] = useState<CORRECT_ANSWERS_TYPE[]>(new Array(QUESTIONS_IN_GROUP).fill(null));
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [popupType, setPopupType] = useState<POPUP_TYPE>('INFO');

  const [isAnwerCorrect, setIsAnswerCorrect] = useState(false);
  const { artistQuestions, paintingQuetions, isLoading, error } = useAppSelector((state) => state.GAME);

  useEffect(() => {
    if (catId === 'artists') {
      dispatch(loadArtistQuestionsAction(Number(groupId)));
    } else if (catId === 'pictures') {
      dispatch(loadPaintingQuestionsAction(Number(groupId)));
    }
  }, [catId, groupId, dispatch]);

  const checkDataIsLoading = (): boolean => {
    if (isLoading || (catId === 'artists' && artistQuestions.length === 0)) {
      return true;
    }

    if (isLoading || (catId === 'pictures' && paintingQuetions.length === 0)) {
      return true;
    }

    return false;
  };

  if (checkDataIsLoading()) {
    return <h2>Loading....</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  let currentQuestion;

  if (catId === 'artists') {
    currentQuestion = artistQuestions[questionNumber];
  } else if (catId === 'pictures') {
    currentQuestion = paintingQuetions[questionNumber];
  }

  if (!currentQuestion) {
    return <h2>No such page!</h2>;
  }

  const { author, answer, imageNum, name, year } = currentQuestion;

  const { isAnswered, answers } = userAnswer;

  const onAnswerBtnClick = (ind: number, author: string) => {
    if (isAnswered) {
      return;
    }

    if (author === answer) {
      setPagination(replaceElementInArray(pagination, questionNumber, 'CORRECT'));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, 'CORRECT'),
      });
      setIsAnswerCorrect(true);
    } else {
      setPagination(replaceElementInArray(pagination, questionNumber, 'WRONG'));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, 'WRONG'),
      });
      setIsAnswerCorrect(false);
    }
    setIsPopupActive(true);
    setPopupType('INFO');
  };

  const resetQuizState = () => {
    setUserAnswer({
      isAnswered: false,
      answers: [null, null, null, null],
    });
    setIsPopupActive(false);
    setPopupType('INFO');
    setPagination(new Array(QUESTIONS_IN_GROUP).fill(null));
    setQuestionNumber(0);
  };

  const onNextBtnClick = () => {
    if (!(questionNumber + 1 >= QUESTIONS_IN_GROUP)) {
      setQuestionNumber(questionNumber + 1);
      setUserAnswer({
        isAnswered: false,
        answers: [null, null, null, null],
      });
      setIsPopupActive(false);
      setPopupType('INFO');
    } else if (pagination.filter((item) => item === 'CORRECT').length > 0) {
      setIsPopupActive(false);
      setTimeout(() => {
        setIsPopupActive(true);
        setPopupType('RESULT');
      }, ANIMATION_TIME);
    } else {
      setIsPopupActive(false);
      setTimeout(() => {
        setIsPopupActive(true);
        setPopupType('GAME_OVER');
      }, ANIMATION_TIME);
    }
  };

  const onNextQuizBtnClick = () => {
    navigate(`/category/${catId}/${Number(groupId) + 1 <= GROUP_QUANTITY ? Number(groupId) + 1 : 1}`);
    resetQuizState();
  };

  const onTryAgainBtnClick = () => {
    resetQuizState();
  };

  return (
    <div className='game'>
      {catId === 'artists' && (
        <ArtistQuiz
          artistQuestion={artistQuestions[questionNumber]}
          pagination={pagination}
          onAnswerBtnClick={onAnswerBtnClick}
          answers={userAnswer.answers}
        />
      )}

      {catId === 'pictures' && (
        <PaintingQuiz paintingQuestion={paintingQuetions[questionNumber]} pagination={pagination} onAnswerBtnClick={onAnswerBtnClick} />
      )}

      <Popup
        popupType={popupType}
        isPopupActive={isPopupActive}
        author={author}
        name={name}
        year={year}
        imageNum={imageNum}
        isAnwerCorrect={isAnwerCorrect}
        correctAnswers={pagination.filter((item) => item === 'CORRECT').length}
        onNextBtnClick={onNextBtnClick}
        onNextQuizBtnClick={onNextQuizBtnClick}
        onTryAgainBtnClick={onTryAgainBtnClick}
      />
    </div>
  );
};

export default GamePage;
