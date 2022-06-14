import { useLocation, useNavigate } from 'react-router-dom';

import { setPreviousUrl } from '../../store/appState/appState';
import { useAppDispatch } from '../../hooks/redux';
import { AppRoute } from '../../consts/const';

type SettingsButtonProps = {
  className?: string;
};

const SettingsButton = ({ className = '' }: SettingsButtonProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setPreviousUrl(pathname));
    navigate(AppRoute.Settings);
  };

  return (
    <button className={`btn btn--settings ${className}`} onClick={onClick}>
      settings
    </button>
  );
};

export { SettingsButton };
