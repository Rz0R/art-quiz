import { Link } from 'react-router-dom';

type ErrorPageProps = {
  errorMessage: string;
};

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className='error'>
      <div className='header'>
        <div className='logo header__logo'></div>
        <Link className='btn btn--home header__home-btn' to='/'>
          home
        </Link>
        <div className='header__title'>Error</div>
        <Link className='btn btn--settings header__settings-btn' to='/settings'>
          settings
        </Link>
      </div>

      <div className='error__body'>
        <p className='error__text'>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
