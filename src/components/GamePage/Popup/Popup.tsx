import ReactDOM from 'react-dom';
import GameResultPopup from './GameResultPopup';
import NextQuestionPopup from './NextQuestionPopup';
import GameOverPopup from './GameOverPopup';
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
  onTryAgainBtnClick: () => void;
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
  onTryAgainBtnClick,
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
          {popupType === 'GAME_OVER' && (
            <GameOverPopup onTryAgainYesBtnClick={onTryAgainBtnClick} onTryAgainNoBtnClick={onNextQuizBtnClick} />
          )}
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Popup;
