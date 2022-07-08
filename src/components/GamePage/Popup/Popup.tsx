import { motion } from 'framer-motion';

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
  onTryAgainNoBtnClick: () => void;
  onHomeBtnClick: () => void;
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
  onTryAgainNoBtnClick,
  onHomeBtnClick,
}: PopupProps) => {
  return ReactDOM.createPortal(
    <>
      <motion.div
        key='overlay'
        className={`overlay ${isPopupActive ? 'active' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.div
        key='popup'
        className={`popup ${isPopupActive ? 'active' : ''}`}
        initial={{ left: '-300%' }}
        animate={{ left: '50%' }}
        exit={{ left: '300%' }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className='popup__content'>
          {popupType === POPUP_TYPE.INFO && (
            <NextQuestionPopup
              isActive={isPopupActive}
              author={author}
              name={name}
              year={year}
              imageNum={imageNum}
              isAnwerCorrect={isAnwerCorrect}
              onNextBtnClick={onNextBtnClick}
            />
          )}
          {popupType === POPUP_TYPE.RESULT && (
            <GameResultPopup correctAnswers={correctAnswers} onNextQuizBtnClick={onNextQuizBtnClick} onHomeBtnClick={onHomeBtnClick} />
          )}
          {popupType === POPUP_TYPE.GAME_OVER && (
            <GameOverPopup onTryAgainYesBtnClick={onTryAgainBtnClick} onTryAgainNoBtnClick={onTryAgainNoBtnClick} />
          )}
        </div>
      </motion.div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Popup;
