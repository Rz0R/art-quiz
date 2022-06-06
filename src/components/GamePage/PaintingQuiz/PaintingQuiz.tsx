import { PaintingQuestion } from '../../../types/questions';
import { Link } from 'react-router-dom';
import { createImageUrl } from '../../../utils/common';
import { CategoryType, ANSWERS_TYPE } from '../../../consts/const';
import Pagination from '../Pagination';
import LoadableImage from '../../LoadableImage';
import { CountdownTimer } from '../CoundownTimer';
import classnames from 'classnames';

type PaintingQuizProps = {
  paintingQuestion: PaintingQuestion;
  pagination: ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, author: string) => void;
  isTimerOn: boolean;
};

const PaintingQuiz = ({ paintingQuestion, pagination, onAnswerBtnClick, isTimerOn }: PaintingQuizProps) => {
  const { question, paintings } = paintingQuestion;

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
      <div className='game__pictures pictures'>
        {paintings.map((item, ind) => (
          <div key={`${item}-${ind}`} className='pictures__item' onClick={() => onAnswerBtnClick(ind, item)}>
            <LoadableImage src={createImageUrl(item)} alt={`painting-${ind}`} />
          </div>
        ))}
        <Pagination paginationValue={pagination} />
      </div>
    </>
  );
};

export default PaintingQuiz;
