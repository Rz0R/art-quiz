import { goodJobIcon } from '../../../../consts/assetsPaths';
import LoadableImage from '../../../LoadableImage';
import { POPUP_TEXT } from '../../../../consts/const';
import { useAppSelector } from '../../../../hooks/redux';

type GameResultPopupProps = {
  correctAnswers: number;
  onNextQuizBtnClick: () => void;
  onHomeBtnClick: () => void;
};

const GameResultPopup = ({ correctAnswers, onNextQuizBtnClick, onHomeBtnClick }: GameResultPopupProps) => {
  const { language } = useAppSelector((state) => state.SETTINGS);

  return (
    <>
      <div className='popup__content'>
        <div className='popup__text-congrats'>{POPUP_TEXT[language].congratulation}</div>
        <div className='popup__text-result'>{correctAnswers}/10</div>
        <div className='popup__good-job-icon'>
          <LoadableImage src={goodJobIcon} alt='good job' />
        </div>
        <div className='popup_btns'>
          <button className='btn btn--home' onClick={onHomeBtnClick}>
            home
          </button>
          <button className='btn' onClick={onNextQuizBtnClick}>
            Next Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default GameResultPopup;
