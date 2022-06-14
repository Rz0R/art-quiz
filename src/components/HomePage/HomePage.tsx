import { Link } from 'react-router-dom';

import { artistsBtnImg, picturesBtnImg } from '../../consts/assetsPaths';
import { CategoryType, AppRoute } from '../../consts/const';
import LoadableImage from '../LoadableImage';
import { SettingsButton } from '../SettingsButton';

const HomePage: React.FC = () => {
  return (
    <div className='home'>
      <div className='logo'></div>

      <div className='quiz-menu'>
        <div className='quiz-menu__wrapper'>
          <div className='quiz-menu__item'>
            <Link className='quiz-menu__btn' to={`${AppRoute.Category}/${CategoryType.ARTISTS}`}>
              <LoadableImage src={artistsBtnImg} alt='artists quiz' />
              <h3 className='quiz-menu__title'>
                <span>artists</span> quiz
              </h3>
            </Link>
          </div>
          <div className='quiz-menu__item'>
            <Link className='quiz-menu__btn' to={`${AppRoute.Category}/${CategoryType.PAINTINGS}`}>
              <LoadableImage src={picturesBtnImg} alt='pictures quiz' />
              <h3 className='quiz-menu__title'>
                <span>pictures</span> quiz
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <SettingsButton />
    </div>
  );
};

export default HomePage;
