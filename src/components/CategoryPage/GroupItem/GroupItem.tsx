import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadableImage from '../../LoadableImage';
import classnames from 'classnames';
import { AppRoute } from '../../../consts/const';

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
    navigate(`${AppRoute.Category}/${categoryId}/${groupNumber}`);
  };

  const onScoreBntClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    navigate(`${AppRoute.Score}/${categoryId}/${groupNumber}`);
  };

  return (
    <div className='item'>
      <button className={classnames('item__body', { answered: isAnswered })} onClick={onItemClick}>
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
    </div>
  );
};

export default GroupItem;
