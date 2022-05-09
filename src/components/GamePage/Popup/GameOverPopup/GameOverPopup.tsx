import LoadableImage from '../../../LoadableImage';
import { cupIcon } from '../../../../consts/assetsPaths';

type GameOverPopupProps = {
  onTryAgainYesBtnClick: () => void;
  onTryAgainNoBtnClick: () => void;
};

const GameOverPopup = ({ onTryAgainYesBtnClick, onTryAgainNoBtnClick }: GameOverPopupProps) => {
  return (
    <>
      <div className='popup__text-game-over'>game over</div>
      <div className='popup__cup-icon'>
        <LoadableImage src={cupIcon} alt='alt' />
      </div>
      <div className='popup__text-play-again'>play again?</div>
      <div className='popup_btns'>
        <button className='btn btn--text-only' onClick={onTryAgainYesBtnClick}>
          <span>Yes</span>
        </button>
        <button className='btn btn--text-only' onClick={onTryAgainNoBtnClick}>
          <span>No</span>
        </button>
      </div>
    </>
  );
};

export default GameOverPopup;
