import { useState, useEffect } from 'react';

import { createImageUrl } from '../../../../utils/common';
import { correctAnswerIcon } from '../../../../consts/assetsPaths';
import { wrongAnswerIcon } from '../../../../consts/assetsPaths';
import LoadableImage from '../../../LoadableImage';
import { ANIMATION_TIME } from '../../../../consts/const';

type NextQuestionPopupProps = {
  isActive: boolean;
  author: string;
  name: string;
  year: string;
  imageNum: string;
  isAnwerCorrect: boolean;
  onNextBtnClick: () => void;
};

const NextQuestionPopup = ({ author, name, year, imageNum, isAnwerCorrect, onNextBtnClick, isActive }: NextQuestionPopupProps) => {
  const imageUrl = createImageUrl(imageNum);
  const [isPopupActive, setIsPopupActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsPopupActive(isActive);
    } else {
      setTimeout(() => {
        setIsPopupActive(isActive);
      }, ANIMATION_TIME);
    }
  }, [isActive]);

  return isPopupActive ? (
    <>
      <div className='popup__answer'>
        <img src={isAnwerCorrect ? correctAnswerIcon : wrongAnswerIcon} alt={isAnwerCorrect ? 'correct answer' : 'wrong answer'} />
      </div>
      <div className='popup__picture'>
        <LoadableImage src={imageUrl} alt={name} />
      </div>
      <div className='popup__picture-name'>{name}</div>
      <div className='popup__picture-author'>{author}</div>
      <div className='popup__picture-year'>{year}</div>
      <button className='btn' onClick={onNextBtnClick}>
        Next
      </button>
    </>
  ) : (
    <></>
  );
};

export default NextQuestionPopup;
