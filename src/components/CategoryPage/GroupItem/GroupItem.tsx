import React from 'react';
import { Link } from 'react-router-dom';
import LoadableImage from '../../LoadableImage';

interface IGroupItem {
  categoryId: string;
  groupNumber: string;
  imageSrc: string;
}

const GroupItem: React.FC<IGroupItem> = ({ categoryId, groupNumber, imageSrc }) => {
  return (
    <Link className='item' to={`/category/${categoryId}/${groupNumber}`}>
      <div className='item__header'>
        <div className='item__number'>{groupNumber}</div>
        <div className='item__score'>9/10</div>
      </div>
      <div className='item__picture'>
        <LoadableImage src={imageSrc} />
      </div>
    </Link>
  );
};

export default GroupItem;
