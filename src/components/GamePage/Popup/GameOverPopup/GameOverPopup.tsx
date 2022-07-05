import { cupIcon } from '../../../../consts/assetsPaths';
import { POPUP_TEXT } from '../../../../consts/const';
import { useAppSelector } from '../../../../hooks/redux';

type GameOverPopupProps = {
  onTryAgainYesBtnClick: () => void;
  onTryAgainNoBtnClick: () => void;
};

const GameOverPopup = ({ onTryAgainYesBtnClick, onTryAgainNoBtnClick }: GameOverPopupProps) => {
  const { language } = useAppSelector((state) => state.SETTINGS);
  return (
    <>
      <div className='popup__text-game-over'>{POPUP_TEXT[language].gameOver}</div>
      <div className='popup__cup-icon'>
        <img src={cupIcon} alt='game over' />
      </div>
      <div className='popup__text-play-again'>{POPUP_TEXT[language].playAgain}</div>
      <div className='popup_btns'>
        <button className='btn' onClick={onTryAgainYesBtnClick}>
          Yes
        </button>
        <button className='btn' onClick={onTryAgainNoBtnClick}>
          No
        </button>
      </div>
    </>
  );
};

export default GameOverPopup;
