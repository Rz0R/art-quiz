import classnames from 'classnames';
import { ANSWERS_TYPE } from '../../../consts/const';

type PaginationProps = {
  paginationValue: ANSWERS_TYPE[];
};

const Pagination = ({ paginationValue }: PaginationProps) => {
  return (
    <div className='pagination'>
      {paginationValue.map((item, ind) => (
        <div
          key={`pagItem-${ind}`}
          className={classnames('pagination__item', {
            'pagination__item--correct': item === ANSWERS_TYPE.CORRECT,
            'pagination__item--wrong': item === ANSWERS_TYPE.WRONG,
          })}
        />
      ))}
    </div>
  );
};

export default Pagination;
