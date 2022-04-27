import { Link } from 'react-router-dom';
import { logo, artistsBtnImg, picturesBtnImg, settingsIcon } from '../../consts/AseetsPaths';

const HomePage: React.FC = () => {
  return (
    <div className='home'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>

      <div className='quiz-menu'>
        <Link className='quiz-menu__btn' to='/category/artists'>
          <img src={artistsBtnImg} alt='artists quiz' />
          <h3 className='quiz-menu__btn-title'>
            <span>artists</span> quiz
          </h3>
        </Link>
        <Link className='quiz-menu__btn' to='/category/pictures'>
          <img src={picturesBtnImg} alt='pictures quiz' />
          <h3 className='quiz-menu__btn-title'>
            <span>pictures</span> quiz
          </h3>
        </Link>
      </div>
      <Link className='btn btn--settings' to='/settings'>
        <img src={settingsIcon} alt='pictures quiz' />
        <span>settings</span>
      </Link>
    </div>
  );
};

export default HomePage;
