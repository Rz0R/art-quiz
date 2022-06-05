import { MouseEvent, useState } from 'react';
import LoadableImage from '../../LoadableImage';
import { correctAnswerIcon, wrongAnswerIcon } from '../../../consts/assetsPaths';
import { createImageUrl } from '../../../utils/common';
import classnames from 'classnames';
import { Question } from '../../../types/questions';
import { ANSWERS_TYPE } from '../../../consts/const';

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
    <div className='item'>
      <div
        className={classnames('item__body', {
          correct: answer === ANSWERS_TYPE.CORRECT,
          wrong: answer === ANSWERS_TYPE.WRONG,
          show: isInfoActive,
        })}
        onClick={onItemClick}
      >
        <div className='item__header'>
          <div className='item__number'>{questionNumber}</div>
          <div className='item__check'>
            {answer === ANSWERS_TYPE.CORRECT && <img src={correctAnswerIcon} alt='correct answer'></img>}
            {answer === ANSWERS_TYPE.WRONG && <img src={wrongAnswerIcon} alt='wrong answer'></img>}
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
      </div>
    </div>
  );
};

export default ScoreGroupItem;
