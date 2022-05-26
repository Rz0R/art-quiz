import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { ArtistQuestion } from '../../../types/questions';
import { createImageUrl } from '../../../utils/common';
import { CORRECT_ANSWERS_TYPE, CategoryType } from '../../../consts/const';
import Pagination from '../Pagination';
import { CountdownTimer } from '../CoundownTimer';
import { logo } from '../../../consts/assetsPaths';

type ArtistQuizProps = {
  artistQuestion: ArtistQuestion;
  pagination: CORRECT_ANSWERS_TYPE[];
  answers: CORRECT_ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, author: string) => void;
  isTimerOn: boolean;
};

const ArtistQuiz = ({ artistQuestion, pagination, answers, onAnswerBtnClick, isTimerOn }: ArtistQuizProps): JSX.Element => {
  const { question, imageNum, authors } = artistQuestion;

  const imageUrl = createImageUrl(imageNum);

  return (
    <>
      <div className='header header--game'>
        <div className='header__top'>
          <Link className='logo' to='/'>
            <img src={logo} alt='logo' />
          </Link>
          {isTimerOn && <CountdownTimer />}
          <Link className='btn btn--categories' to={`/category/${CategoryType.ARTISTS}`}>
            categories
          </Link>
        </div>
        <div className='header__question'>{question}</div>
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
                'answers__answer--correct': answers[ind] === 'CORRECT',
                'answers__answer--wrong': answers[ind] === 'WRONG',
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
