import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const onItemClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    navigate(`/category/${categoryId}/${groupNumber}`);
  };

  const onScoreBntClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    navigate(`/score/${categoryId}/${groupNumber}`);
  };

  return (
    <button className={classnames('item', { answered: isAnswered })} onClick={onItemClick}>
      <div className='item__header'>
        <div className='item__number'>{groupNumber}</div>
        {isAnswered && <div className='item__score'>{score}/10</div>}
      </div>
      <div className='item__picture'>
        <LoadableImage src={imageSrc} />
        <div className='item__score-btn' onClick={onScoreBntClick}>
          score
        </div>
      </div>
    </button>
  );
};

export default GroupItem;
