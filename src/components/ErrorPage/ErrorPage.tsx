import { Link } from 'react-router-dom';
import { homeIcon, logo, settingsIcon } from '../../consts/assetsPaths';

type ErrorPageProps = {
  errorMessage: string;
};

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className='error'>
      <div className='header header--categories'>
        <div className='header__title'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='header__title-name'>Error</div>
        </div>
        <div className='header__btns'>
          <Link className='btn' to='/'>
            <img src={homeIcon} alt='home' />
            <span>home</span>
          </Link>
          <Link className='btn btn--settings' to='/settings'>
            <img src={settingsIcon} alt='settings' />
            <span>settings</span>
          </Link>
        </div>
      </div>
      <div className='error__body'>
        <p className='error__text'>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
