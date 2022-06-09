import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadArtistQuestionsAction, loadPaintingQuestionsAction, saveResultAction } from '../../store/serviceActions';
import { playTimer, resetTimer, stopTimer } from '../../store/gameState/gameState';
import { replaceElementInArray } from '../../utils/common';
import { QUESTIONS_IN_GROUP, GROUP_QUANTITY, CategoryType } from '../../consts/const';
import Popup from './Popup';
import ArtistQuiz from './ArtistQuiz';
import PaintingQuiz from './PaintingQuiz';
import ErrorPage from '../ErrorPage';
import Loader from '../Loader';
import { POPUP_TYPE, ANIMATION_TIME, ANSWERS_TYPE, NUMBER_OF_POSSIBLE_ANSWERS } from '../../consts/const';
import useSound from 'use-sound';
import { rightAnswerSound, wrongAnswerSound, victorySound, loseSound } from '../../consts/assetsPaths';

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

  const [isAnwerCorrect, setIsAnswerCorrect] = useState(false);
  const { artistQuestions, paintingQuetions, isLoading, error, isTimeOver } = useAppSelector((state) => state.GAME);
  const { isVolumeOn, volumeLevel, isTimerOn } = useAppSelector((state) => state.SETTINGS);

  const [playRightAnswerSound] = useSound(rightAnswerSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playWrongAnswerSound] = useSound(wrongAnswerSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playVictorySound] = useSound(victorySound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  const [playLoseSound] = useSound(loseSound, {
    volume: volumeLevel,
    soundEnabled: isVolumeOn,
  });

  useEffect(() => {
    if (catId === CategoryType.ARTISTS) {
      dispatch(loadArtistQuestionsAction(Number(groupId)));
    } else if (catId === CategoryType.PAINTINGS) {
      dispatch(loadPaintingQuestionsAction(Number(groupId)));
    }
  }, [catId, groupId, dispatch]);

  useEffect(() => {
    if (isTimerOn && isTimeOver) {
      setPagination(replaceElementInArray(pagination, questionNumber, ANSWERS_TYPE.WRONG));
      setIsAnswerCorrect(false);
      setIsPopupActive(true);
      setPopupType(POPUP_TYPE.INFO);
      playWrongAnswerSound();
    }
  }, [isTimeOver]);

  const checkDataIsLoading = (): boolean => {
    if (isLoading || (catId === CategoryType.ARTISTS && artistQuestions.length === 0)) {
      return true;
    }

    if (isLoading || (catId === CategoryType.PAINTINGS && paintingQuetions.length === 0)) {
      return true;
    }

    return false;
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (checkDataIsLoading()) {
    return <Loader />;
  }

  let currentQuestion;

  if (catId === CategoryType.ARTISTS) {
    currentQuestion = artistQuestions[questionNumber];
  } else if (catId === CategoryType.PAINTINGS) {
    currentQuestion = paintingQuetions[questionNumber];
  }

  if (!currentQuestion) {
    return <ErrorPage errorMessage={error} />;
  }

  const { author, answer, imageNum, name, year } = currentQuestion;

  const { isAnswered, answers } = userAnswer;

  const onAnswerBtnClick = (ind: number, author: string) => {
    if (isAnswered) {
      return;
    }

    if (author === answer) {
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
    if (isTimerOn) {
      dispatch(resetTimer());
    }
  };

  const onNextBtnClick = () => {
    if (!(questionNumber + 1 >= QUESTIONS_IN_GROUP)) {
      setQuestionNumber(questionNumber + 1);
      setUserAnswer({
        isAnswered: false,
        answers: new Array(NUMBER_OF_POSSIBLE_ANSWERS).fill(ANSWERS_TYPE.NO_ANSWER),
      });
      setIsPopupActive(false);
      setPopupType(POPUP_TYPE.INFO);
      if (isTimerOn) {
        dispatch(resetTimer());
      }
    } else if (pagination.filter((item) => item === ANSWERS_TYPE.CORRECT).length > 0) {
      setIsPopupActive(false);
      setTimeout(() => {
        setIsPopupActive(true);
        setPopupType(POPUP_TYPE.RESULT);
        playVictorySound();
      }, ANIMATION_TIME);
      dispatch(saveResultAction(pagination as string[], catId as CategoryType, Number(groupId)));
    } else {
      setIsPopupActive(false);
      setTimeout(() => {
        setIsPopupActive(true);
        setPopupType(POPUP_TYPE.GAME_OVER);
        playLoseSound();
      }, ANIMATION_TIME);

      dispatch(saveResultAction(null, catId as CategoryType, Number(groupId)));
    }
  };

  const onNextQuizBtnClick = () => {
    navigate(`/category/${catId}/${Number(groupId) + 1 <= GROUP_QUANTITY ? Number(groupId) + 1 : 1}`);
    resetQuizState();
  };

  const onTryAgainBtnClick = () => {
    resetQuizState();
  };

  const onHomeBtnClick = () => {
    navigate('/');
    if (isTimerOn) {
      dispatch(playTimer());
    }
  };

  return (
    <div className='game'>
      {catId === CategoryType.ARTISTS && (
        <ArtistQuiz
          artistQuestion={artistQuestions[questionNumber]}
          pagination={pagination}
          onAnswerBtnClick={onAnswerBtnClick}
          answers={userAnswer.answers}
          isTimerOn={isTimerOn}
        />
      )}

      {catId === CategoryType.PAINTINGS && (
        <PaintingQuiz
          paintingQuestion={paintingQuetions[questionNumber]}
          pagination={pagination}
          onAnswerBtnClick={onAnswerBtnClick}
          isTimerOn={isTimerOn}
        />
      )}

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
        onHomeBtnClick={onHomeBtnClick}
      />
    </div>
  );
};

export default GamePage;
