import { PaintingQuestion } from '../../../types/questions';
import { Link } from 'react-router-dom';
import { logo, homeIcon } from '../../../consts/assetsPaths';
import { createImageUrl } from '../../../utils/common';
import { CORRECT_ANSWERS_TYPE } from '../../../consts/const';
import Pagination from '../Pagination';
import LoadableImage from '../../LoadableImage';

type PaintingQuizProps = {
  paintingQuestion: PaintingQuestion;
  pagination: CORRECT_ANSWERS_TYPE[];
  // answers: CORRECT_ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, author: string) => void;
};

const PaintingQuiz = ({ paintingQuestion, pagination, onAnswerBtnClick }: PaintingQuizProps) => {
  const { question, paintings } = paintingQuestion;

  return (
    <>
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
