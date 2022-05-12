import classnames from 'classnames';
import { CORRECT_ANSWERS_TYPE } from '../../../consts/const';

type PaginationProps = {
  paginationValue: CORRECT_ANSWERS_TYPE[];
};

const Pagination = ({ paginationValue }: PaginationProps) => {
  return (
    <div className='pagination'>
      {paginationValue.map((item, ind) => (
        <div
          key={`pagItem-${ind}`}
          className={classnames('pagination__item', {
            'pagination__item--correct': item === 'CORRECT',
            'pagination__item--wrong': item === 'WRONG',
          })}
        />
      ))}
    </div>
  );
};

export default Pagination;
