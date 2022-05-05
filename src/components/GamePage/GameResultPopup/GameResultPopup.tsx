import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { homeIcon } from '../../../consts/assetsPaths';

type GameResultPopupProps = {
  correctAnswers: number;
  isPopupActive: boolean;
  onNextQuizBtnClick: () => void;
};

const GameResultPopup = ({ correctAnswers, isPopupActive, onNextQuizBtnClick }: GameResultPopupProps) => {
  return ReactDOM.createPortal(
    <>
      <div className={`overlay ${isPopupActive ? 'active' : ''}`}></div>
      <div className={`popup ${isPopupActive ? 'active' : ''}`}>
        <div className='popup__content'>
          <div className='popup__text-congrats'>contgratulations!</div>
          <div className='popup__text-result'>{correctAnswers}/10</div>
          <div className='popup__good-job-icon'>
            <img src='/assets/icons/good-job.png' alt='good job' />
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
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default GameResultPopup;
