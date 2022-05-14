import React from 'react';
import { Link } from 'react-router-dom';
import LoadableImage from '../../LoadableImage';
import classnames from 'classnames';

interface IGroupItem {
  categoryId: string;
  groupNumber: number;
  imageSrc: string;
  isAnswered: boolean;
  score: number;
}

const GroupItem: React.FC<IGroupItem> = ({ categoryId, groupNumber, imageSrc, isAnswered, score }) => {
  return (
    <Link className={classnames('item', { answered: isAnswered })} to={`/category/${categoryId}/${groupNumber}`}>
      <div className='item__header'>
        <div className='item__number'>{groupNumber}</div>
        {isAnswered && <div className='item__score'>{score}/10</div>}
      </div>
      <div className='item__picture'>
        <LoadableImage src={imageSrc} />
      </div>
    </Link>
  );
};

export default GroupItem;
