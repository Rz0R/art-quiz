import { createImageUrl } from '../../../../utils/common';
import { correctAnswerIcon } from '../../../../consts/assetsPaths';
import { wrongAnswerIcon } from '../../../../consts/assetsPaths';

type NextQuestionPopupProps = {
  author: string;
  name: string;
  year: string;
  imageNum: string;
  isAnwerCorrect: boolean;
  onNextBtnClick: () => void;
};

const NextQuestionPopup = ({ author, name, year, imageNum, isAnwerCorrect, onNextBtnClick }: NextQuestionPopupProps) => {
  const imageUrl = createImageUrl(imageNum);

  return (
    <>
      <div className='popup__answer'>
        <img src={isAnwerCorrect ? correctAnswerIcon : wrongAnswerIcon} alt={isAnwerCorrect ? 'correct answer' : 'wrong answer'} />
      </div>
      <div className='popup__picture'>
        <img src={imageUrl} alt={name} />
      </div>
      <div className='popup__picture-name'>{name}</div>
      <div className='popup__picture-author'>{author}</div>
      <div className='popup__picture-year'>{year}</div>
      <button className='btn btn--next' onClick={onNextBtnClick}>
        <span>Next</span>
      </button>
    </>
  );
};

export default NextQuestionPopup;
