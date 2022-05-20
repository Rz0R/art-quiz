import { Link } from 'react-router-dom';
import { logo, artistsBtnImg, picturesBtnImg } from '../../consts/assetsPaths';
import { CategoryType } from '../../consts/const';
import LoadableImage from '../LoadableImage';

const HomePage: React.FC = () => {
  return (
    <div className='home'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>

      <div className='quiz-menu'>
        <Link className='quiz-menu__btn' to={`/category/${CategoryType.ARTISTS}`}>
          <LoadableImage src={artistsBtnImg} alt='artists quiz' />
          <h3 className='quiz-menu__btn-title'>
            <span>artists</span> quiz
          </h3>
        </Link>
        <Link className='quiz-menu__btn' to={`/category/${CategoryType.PAINTINGS}`}>
          <LoadableImage src={picturesBtnImg} alt='artists quiz' />
          <h3 className='quiz-menu__btn-title'>
            <span>pictures</span> quiz
          </h3>
        </Link>
      </div>
      <Link className='btn btn--settings' to='/settings'>
        settings
      </Link>
    </div>
  );
};

export default HomePage;
