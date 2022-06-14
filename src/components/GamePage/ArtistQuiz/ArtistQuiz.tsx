import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { ArtistQuestion } from '../../../types/questions';
import { createImageUrl } from '../../../utils/common';
import { ANSWERS_TYPE, CategoryType, AppRoute } from '../../../consts/const';
import Pagination from '../Pagination';
import { CountdownTimer } from '../CoundownTimer';
import LoadableImage from '../../LoadableImage';

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
        <Link className='logo game__logo' to={AppRoute.Root}></Link>
        {isTimerOn && <CountdownTimer />}
        <Link className='btn btn--categories game__settings-btn' to={`${AppRoute.Category}/${CategoryType.ARTISTS}`}>
          categories
        </Link>
        <div className='game__question'>{question}</div>
      </div>
      <div className='game__picture'>
        <LoadableImage src={imageUrl} alt='picture' />
        <Pagination paginationValue={pagination} />
      </div>
      <div className='game__answers answers'>
        <div className='answers--wrapper'>
          {authors.map((author, ind) => (
            <button
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
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtistQuiz;
