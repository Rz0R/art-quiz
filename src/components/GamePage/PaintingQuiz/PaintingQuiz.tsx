import { PaintingQuestion } from '../../../types/questions';
import { Link } from 'react-router-dom';
import { logo } from '../../../consts/assetsPaths';
import { createImageUrl } from '../../../utils/common';
import { CategoryType, CORRECT_ANSWERS_TYPE } from '../../../consts/const';
import Pagination from '../Pagination';
import LoadableImage from '../../LoadableImage';
import { CountdownTimer } from '../CoundownTimer';

type PaintingQuizProps = {
  paintingQuestion: PaintingQuestion;
  pagination: CORRECT_ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, author: string) => void;
  isTimerOn: boolean;
};

const PaintingQuiz = ({ paintingQuestion, pagination, onAnswerBtnClick, isTimerOn }: PaintingQuizProps) => {
  const { question, paintings } = paintingQuestion;

  return (
    <>
      <div className='header header--game'>
        <div className='header__top'>
          <Link className='logo' to='/'>
            <img src={logo} alt='logo' />
          </Link>
          {isTimerOn && <CountdownTimer />}
          <Link className='btn btn--categories' to={`/category/${CategoryType.PAINTINGS}`}>
            categories
          </Link>
        </div>
        <div className='header__question'>{question}</div>
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
