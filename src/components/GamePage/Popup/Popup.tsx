import ReactDOM from 'react-dom';
import GameResultPopup from './GameResultPopup';
import NextQuestionPopup from './NextQuestionPopup';
import { POPUP_TYPE } from '../../../consts/const';

type PopupProps = {
  popupType: POPUP_TYPE;
  isPopupActive: boolean;
  author: string;
  name: string;
  year: string;
  imageNum: string;
  correctAnswers: number;
  isAnwerCorrect: boolean;
  onNextBtnClick: () => void;
  onNextQuizBtnClick: () => void;
};

const Popup = ({
  popupType,
  author,
  name,
  year,
  imageNum,
  correctAnswers,
  isPopupActive,
  isAnwerCorrect,
  onNextBtnClick,
  onNextQuizBtnClick,
}: PopupProps) => {
  return ReactDOM.createPortal(
    <>
      <div className={`overlay ${isPopupActive ? 'active' : ''}`}></div>
      <div className={`popup ${isPopupActive ? 'active' : ''}`}>
        <div className='popup__content'>
          {popupType === 'INFO' && (
            <NextQuestionPopup
              author={author}
              name={name}
              year={year}
              imageNum={imageNum}
              isAnwerCorrect={isAnwerCorrect}
              onNextBtnClick={onNextBtnClick}
            />
          )}
          {popupType === 'RESULT' && <GameResultPopup correctAnswers={correctAnswers} onNextQuizBtnClick={onNextQuizBtnClick} />}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Popup;
