import { Link } from 'react-router-dom';
import { logo } from '../../consts/assetsPaths';

type ErrorPageProps = {
  errorMessage: string;
};

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className='error'>
      <div className='header header--categories'>
        <div className='header__title'>
          <Link className='logo' to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <div className='header__title-name'>Error</div>
        </div>
        <div className='header__btns'>
          <Link className='btn btn--home' to='/'>
            home
          </Link>
          <Link className='btn btn--settings' to='/settings'>
            settings
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
