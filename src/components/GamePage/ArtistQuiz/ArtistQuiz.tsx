import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { ArtistQuestion } from '../../../types/questions';
import { createImageUrl } from '../../../utils/common';
import { ANSWERS_TYPE, CategoryType } from '../../../consts/const';
import Pagination from '../Pagination';
import { CountdownTimer } from '../CoundownTimer';

type ArtistQuizProps = {
  artistQuestion: ArtistQuestion;
  pagination: ANSWERS_TYPE[];
  answers: ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, author: string) => void;
  isTimerOn: boolean;
};

const ArtistQuiz = ({ artistQuestion, pagination, answers, onAnswerBtnClick, isTimerOn }: ArtistQuizProps): JSX.Element => {
  const { question, imageNum, authors } = artistQuestion;

  const imageUrl = createImageUrl(imageNum);

  return (
    <>
      <div
        className={classnames('game__header', {
          'game__header--with-timer': isTimerOn,
        })}
      >
        <Link className='logo game__logo' to='/'></Link>
        {isTimerOn && <CountdownTimer />}
        <Link className='btn btn--categories game__settings-btn' to={`/category/${CategoryType.ARTISTS}`}>
          categories
        </Link>
        <div className='game__question'>{question}</div>
      </div>
      <div className='game__picture'>
        <img src={imageUrl} alt='picture' />
        <Pagination paginationValue={pagination} />
      </div>
      <div className='game__answers answers'>
        <ul className='answers--wrapper'>
          {authors.map((author, ind) => (
            <li
              key={`${author}-${ind}`}
              className={classnames('answers__answer', {
                'answers__answer--correct': answers[ind] === ANSWERS_TYPE.CORRECT,
                'answers__answer--wrong': answers[ind] === ANSWERS_TYPE.WRONG,
              })}
              onClick={() => {
                onAnswerBtnClick(ind, author);
              }}
            >
              {author}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArtistQuiz;
