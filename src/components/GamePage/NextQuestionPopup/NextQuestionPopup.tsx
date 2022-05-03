import ReactDOM from 'react-dom';
import { createImageUrl } from '../../../utils/common';
import { correctAnswerIcon } from '../../../consts/assetsPaths';
import { wrongAnswerIcon } from '../../../consts/assetsPaths';

type NextQuestionPopupType = {
  author: string;
  name: string;
  year: string;
  imageNum: string;
  isPopupActive: boolean;
  isAnwerCorrect: boolean;
  onNextBtnClick: () => void;
};

const NextQuestionPopup = ({
  author,
  name,
  year,
  imageNum,
  isPopupActive,
  isAnwerCorrect,
  onNextBtnClick,
}: NextQuestionPopupType): React.ReactPortal => {
  const imageUrl = createImageUrl(imageNum);

  return ReactDOM.createPortal(
    <>
      <div className={`overlay ${isPopupActive ? 'active' : ''}`}></div>
      <div className={`popup ${isPopupActive ? 'active' : ''}`}>
        <div className='popup__content'>
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
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default NextQuestionPopup;
