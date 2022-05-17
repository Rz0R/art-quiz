import { MouseEvent, useState } from 'react';
import LoadableImage from '../../LoadableImage';
import { correctAnswerIcon, wrongAnswerIcon } from '../../../consts/assetsPaths';
import { createImageUrl } from '../../../utils/common';
import classnames from 'classnames';
import { Question } from '../../../types/questions';

type ScoreGroupItemProps = {
  questionNumber: number;
  question: Question;
  answer: string;
};

const ScoreGroupItem = ({ questionNumber, question, answer }: ScoreGroupItemProps) => {
  const [isInfoActive, setIsInfoActive] = useState(false);
  const { author, imageNum, name, year } = question;

  const imageSrc = createImageUrl(imageNum);

  const onItemClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    setIsInfoActive(!isInfoActive);
  };

  return (
    <button
      className={classnames('item', {
        correct: answer === 'CORRECT',
        wrong: answer === 'WRONG',
        'item--show-info': isInfoActive,
      })}
      onClick={onItemClick}
    >
      <div className='item__header'>
        <div className='item__number'>{questionNumber}</div>
        <div className='item__check'>
          {answer === 'CORRECT' && <img src={correctAnswerIcon} alt='correct answer'></img>}
          {answer === 'WRONG' && <img src={wrongAnswerIcon} alt='wrong answer'></img>}
        </div>
      </div>
      <div className='item__picture'>
        <LoadableImage src={imageSrc} />
        <div className='item__info'>
          <p>{name}</p>
          <p>{author}</p>
          <p>{year}</p>
        </div>
      </div>
    </button>
  );
};

export default ScoreGroupItem;