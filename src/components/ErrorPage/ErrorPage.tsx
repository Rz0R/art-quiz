import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/const';

type ErrorPageProps = {
  errorMessage: string;
};

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className='error'>
      <div className='header'>
        <div className='logo header__logo'></div>
        <Link className='btn btn--home __left-element' to={AppRoute.Root}>
          home
        </Link>
        <div className='header__title'>Error</div>
      </div>

      <div className='error__body'>
        <p className='error__text'>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
