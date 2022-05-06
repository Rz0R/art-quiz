import { Link } from 'react-router-dom';
import { homeIcon, goodJobIcon } from '../../../../consts/assetsPaths';

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
          <img src={goodJobIcon} alt='good job' />
        </div>
        <div className='popup_btns'>
          <Link to='/' className='btn'>
            <img src={homeIcon} alt='home button' />
            <span>home</span>
          </Link>
          <button className='btn btn--next' onClick={onNextQuizBtnClick}>
            <span>Next Quiz</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default GameResultPopup;
