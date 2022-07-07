import { ANSWERS_TYPE } from '../../../consts/const';
import Pagination from '../Pagination';
import Picture from './Picture';

type PicturesProps = {
  paintings: string[];
  pagination: ANSWERS_TYPE[];
  onAnswerBtnClick: (ind: number, painting: string) => void;
};

const Pictures = ({ paintings, pagination, onAnswerBtnClick }: PicturesProps) => {
  return (
    <div className='game__pictures pictures'>
      {paintings.map((item, ind) => (
        <Picture key={`${item}-${ind}`} ind={ind} picture={item} onAnswerBtnClick={onAnswerBtnClick} />
      ))}
      <Pagination paginationValue={pagination} />
    </div>
  );
};

export default Pictures;
