import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGameSounds } from '../../hooks/useGameSounds';
import { loadQuestionsAction, saveResultAction } from '../../store/serviceActions';
import { playTimer, questionsLoadingIdle, resetTimer, stopTimer } from '../../store/gameState/gameState';
import { replaceElementInArray } from '../../utils/common';
import {
  QUESTIONS_IN_GROUP,
  GROUP_QUANTITY,
  CategoryType,
  LoadingStatus,
  POPUP_TYPE,
  ANIMATION_TIME,
  ANSWERS_TYPE,
  NUMBER_OF_POSSIBLE_ANSWERS,
  AppRoute,
  QuestionType,
} from '../../consts/const';
import Popup from './Popup';
import ArtistQuiz from './ArtistQuiz';
import PaintingQuiz from './PaintingQuiz';
import ErrorPage from '../ErrorPage';
import Loader from '../Loader';

type UserAnswersType = {
  isAnswered: boolean;
  answers: ANSWERS_TYPE[];
};

const GamePage: React.FC = () => {
  const { catId = '', groupId = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<UserAnswersType>({
    isAnswered: false,
    answers: new Array(NUMBER_OF_POSSIBLE_ANSWERS).fill(ANSWERS_TYPE.NO_ANSWER),
  });
  const [pagination, setPagination] = useState<ANSWERS_TYPE[]>(new Array(QUESTIONS_IN_GROUP).fill(ANSWERS_TYPE.NO_ANSWER));
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [popupType, setPopupType] = useState<POPUP_TYPE>(POPUP_TYPE.INFO);

  const [endGame, setEndOfGame] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const [isAnwerCorrect, setIsAnswerCorrect] = useState(false);
  const { questions, loadingStatus, error, isTimeOver } = useAppSelector((state) => state.GAME);
  const { isVolumeOn, volumeLevel, isTimerOn } = useAppSelector((state) => state.SETTINGS);

  const { playRightAnswerSound, playWrongAnswerSound, playVictorySound, playLoseSound } = useGameSounds(volumeLevel, isVolumeOn);

  useEffect(() => {
    if (catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) {
      dispatch(loadQuestionsAction(catId, Number(groupId)));
    }
    return () => {
      dispatch(questionsLoadingIdle());
    };
  }, [catId, groupId, dispatch]);

  useEffect(() => {
    if (isTimerOn && isTimeOver) {
      setPagination(replaceElementInArray(pagination, questionNumber, ANSWERS_TYPE.WRONG));
      setIsAnswerCorrect(false);
      setIsPopupActive(true);
      setPopupType(POPUP_TYPE.INFO);
      playWrongAnswerSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeOver]);

  const showEndGamePopup = useCallback(() => {
    setIsPopupActive(true);
    if (pagination.filter((item) => item === ANSWERS_TYPE.CORRECT).length > 0) {
      setPopupType(POPUP_TYPE.RESULT);
      playVictorySound();
    } else {
      setPopupType(POPUP_TYPE.GAME_OVER);
      playLoseSound();
    }
  }, [pagination, playVictorySound, playLoseSound]);

  useEffect(() => {
    if (endGame) {
      timerId.current = setTimeout(() => {
        showEndGamePopup();
      }, ANIMATION_TIME * 2);

      return () => {
        clearInterval(timerId.current as NodeJS.Timeout);
      };
    }
  }, [endGame, showEndGamePopup]);

  if (!(catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS)) {
    return <ErrorPage errorMessage='404' />;
  }

  if (loadingStatus === LoadingStatus.LOADING || loadingStatus === LoadingStatus.IDLE) {
    return <Loader />;
  }

  let currentQuestion;

  if (catId === CategoryType.ARTISTS || catId === CategoryType.PAINTINGS) {
    currentQuestion = questions[questionNumber];
  }

  if (!currentQuestion || error) {
    return <ErrorPage errorMessage={error} />;
  }

  const { author, answer, imageNum, name, year } = currentQuestion;

  const { isAnswered, answers } = userAnswer;

  const onAnswerBtnClick = (ind: number, itemAnswer: string) => {
    if (isAnswered) {
      return;
    }

    if (itemAnswer === answer) {
      setPagination(replaceElementInArray(pagination, questionNumber, ANSWERS_TYPE.CORRECT));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, ANSWERS_TYPE.CORRECT),
      });
      setIsAnswerCorrect(true);
      playRightAnswerSound();
    } else {
      setPagination(replaceElementInArray(pagination, questionNumber, ANSWERS_TYPE.WRONG));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, ANSWERS_TYPE.WRONG),
      });
      setIsAnswerCorrect(false);
      playWrongAnswerSound();
    }

    if (isTimerOn) {
      dispatch(stopTimer());
    }

    setIsPopupActive(true);
    setPopupType(POPUP_TYPE.INFO);
  };

  const resetQuizState = () => {
    setUserAnswer({
      isAnswered: false,
      answers: new Array(NUMBER_OF_POSSIBLE_ANSWERS).fill(ANSWERS_TYPE.NO_ANSWER),
    });
    setIsPopupActive(false);
    setPopupType(POPUP_TYPE.INFO);
    setPagination(new Array(QUESTIONS_IN_GROUP).fill(ANSWERS_TYPE.NO_ANSWER));
    setQuestionNumber(0);
    setEndOfGame(false);
    if (isTimerOn) {
      dispatch(resetTimer());
    }
  };

  const onNextBtnClick = () => {
    if (!(questionNumber + 1 >= QUESTIONS_IN_GROUP)) {
      setIsPopupActive(false);
      setQuestionNumber(questionNumber + 1);
      setUserAnswer({
        isAnswered: false,
        answers: new Array(NUMBER_OF_POSSIBLE_ANSWERS).fill(ANSWERS_TYPE.NO_ANSWER),
      });
      setPopupType(POPUP_TYPE.INFO);
      if (isTimerOn) {
        dispatch(resetTimer());
      }
    } else {
      setIsPopupActive(false);
      setEndOfGame(true);
      dispatch(saveResultAction(pagination as string[], catId as CategoryType, Number(groupId)));
    }
  };

  const onNextQuizBtnClick = () => {
    if (Number(groupId) + 1 <= GROUP_QUANTITY) {
      navigate(`${AppRoute.Category}/${catId}/${Number(groupId) + 1}`);
    } else {
      navigate(`${AppRoute.Category}/${catId}`);
    }
    resetQuizState();
  };

  const onTryAgainBtnClick = () => {
    resetQuizState();
  };

  const onTryAgainNoBtnClick = () => {
    navigate(`${AppRoute.Category}/${catId}`);
  };

  const onHomeBtnClick = () => {
    navigate(AppRoute.Root);
    if (isTimerOn) {
      dispatch(playTimer());
    }
  };

  return (
    <div className='game'>
      {currentQuestion.type === QuestionType.Artist && (
        <ArtistQuiz
          artistQuestion={currentQuestion}
          pagination={pagination}
          onAnswerBtnClick={onAnswerBtnClick}
          answers={userAnswer.answers}
          isTimerOn={isTimerOn}
        />
      )}

      {currentQuestion.type === QuestionType.Paintings && (
        <PaintingQuiz
          paintingQuestion={currentQuestion}
          pagination={pagination}
          onAnswerBtnClick={onAnswerBtnClick}
          isTimerOn={isTimerOn}
        />
      )}

      <AnimatePresence>
        {isPopupActive && (
          <Popup
            popupType={popupType}
            isPopupActive={isPopupActive}
            author={author}
            name={name}
            year={year}
            imageNum={imageNum}
            isAnwerCorrect={isAnwerCorrect}
            correctAnswers={pagination.filter((item) => item === ANSWERS_TYPE.CORRECT).length}
            onNextBtnClick={onNextBtnClick}
            onNextQuizBtnClick={onNextQuizBtnClick}
            onTryAgainBtnClick={onTryAgainBtnClick}
            onTryAgainNoBtnClick={onTryAgainNoBtnClick}
            onHomeBtnClick={onHomeBtnClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
