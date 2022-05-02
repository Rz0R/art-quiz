import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { loadQuestionsAction } from '../../store/serviceActions';
import { Link } from 'react-router-dom';
import { logo, homeIcon } from '../../consts/assetsPaths';
import { createImageUrl, replaceElementInArray } from '../../utils/common';
import { QUESTIONS_IN_GROUP } from '../../consts/const';

const GamePage: React.FC = () => {
  const { groupId = '' } = useParams();
  const dispatch = useAppDispatch();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState({
    isAnswered: false,
    answers: [null, null, null, null],
  });
  const [pagination, setPagination] = useState(new Array(QUESTIONS_IN_GROUP).fill(null));
  const { questions, isLoading, error } = useAppSelector((state) => state.GAME);

  useEffect(() => {
    dispatch(loadQuestionsAction(Number(groupId)));
  }, [groupId, dispatch]);

  if (isLoading || questions.length === 0) {
    return <h2>Loading....</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const { question, answer, imageNum, authors } = questions[questionNumber];

  const imageUrl = createImageUrl(imageNum);

  const { isAnswered, answers } = userAnswer;

  const onAnswerBtnClick = (ind: number, author: string) => {
    if (isAnswered) {
      return;
    }

    if (author === answer) {
      setPagination(replaceElementInArray(pagination, questionNumber, 'pagination__item--correct'));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, 'answers__answer--correct'),
      });
    } else {
      setPagination(replaceElementInArray(pagination, questionNumber, 'pagination__item--wrong'));
      setUserAnswer({
        isAnswered: true,
        answers: replaceElementInArray(answers, ind, 'answers__answer--wrong'),
      });
    }

    setTimeout(() => {
      if (!(questionNumber + 1 >= QUESTIONS_IN_GROUP)) {
        setQuestionNumber(questionNumber + 1);

        setUserAnswer({
          isAnswered: false,
          answers: [null, null, null, null],
        });
      }
    }, 1000);
  };

  return (
    <div className='game'>
      <div className='header header--game'>
        <div className='header__top'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <Link to='/' className='btn'>
            <img src={homeIcon} alt='home button' />
            <span>home</span>
          </Link>
        </div>
        <div className='header__question'>{question}</div>
      </div>
      <div className='game__picture'>
        <img src={imageUrl} alt='' />
        <div className='pagination'>
          {questions.map((_, ind) => (
            <div key={`pagItem-${ind}`} className={`pagination__item ${pagination[ind] ? pagination[ind] : ''}`} />
          ))}
        </div>
      </div>
      <div className='game__answers answers'>
        <ul className='answers--wrapper'>
          {authors.map((author, ind) => (
            <li
              key={`${author}-${ind}`}
              className={`answers__answer ${answers[ind] ? answers[ind] : ''}`}
              onClick={() => {
                onAnswerBtnClick(ind, author);
              }}
            >
              {author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePage;
