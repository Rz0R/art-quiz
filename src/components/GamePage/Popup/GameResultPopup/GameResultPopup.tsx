import { Link } from 'react-router-dom';
import { goodJobIcon } from '../../../../consts/assetsPaths';
import LoadableImage from '../../../LoadableImage';

type GameResultPopupProps = {
  correctAnswers: number;
  onNextQuizBtnClick: () => void;
};

const GameResultPopup = ({ correctAnswers, onNextQuizBtnClick }: GameResultPopupProps) => {
  return (
    <>
      <div className='popup__content'>
        <div className='popup__text-congrats'>contgratulations!</div>
        <div className='popup__text-result'>{correctAnswers}/10</div>
        <div className='popup__good-job-icon'>
          <LoadableImage src={goodJobIcon} alt='good job' />
        </div>
        <div className='popup_btns'>
          <Link to='/' className='btn btn--home'>
            home
          </Link>
          <button className='btn' onClick={onNextQuizBtnClick}>
            Next Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default GameResultPopup;
