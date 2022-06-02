import { Link } from 'react-router-dom';
import { artistsBtnImg, picturesBtnImg } from '../../consts/assetsPaths';
import { CategoryType } from '../../consts/const';
import LoadableImage from '../LoadableImage';

const HomePage: React.FC = () => {
  return (
    <div className='home'>
      <div className='logo'></div>

      <div className='quiz-menu'>
        <div className='quiz-menu__wrapper'>
          <div className='quiz-menu__item'>
            <Link className='quiz-menu__btn' to={`/category/${CategoryType.ARTISTS}`}>
              <LoadableImage src={artistsBtnImg} alt='artists quiz' />
              <h3 className='quiz-menu__title'>
                <span>artists</span> quiz
              </h3>
            </Link>
          </div>
          <div className='quiz-menu__item'>
            <Link className='quiz-menu__btn' to={`/category/${CategoryType.PAINTINGS}`}>
              <LoadableImage src={picturesBtnImg} alt='artists quiz' />
              <h3 className='quiz-menu__title'>
                <span>pictures</span> quiz
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <Link className='btn btn--settings' to='/settings'>
        settings
      </Link>
    </div>
  );
};

export default HomePage;
