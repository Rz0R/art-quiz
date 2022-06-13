import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

type SaveButtonProps = {
  className?: string;
  onClick: () => void;
};

const SaveButton = ({ className = '', onClick }: SaveButtonProps) => {
  const navigate = useNavigate();
  const { previousUrl } = useAppSelector((state) => state.APP);

  const onSaveBtnClick = () => {
    onClick();
    navigate(previousUrl);
  };

  return (
    <button className={`btn ${className}`} onClick={onSaveBtnClick}>
      save
    </button>
  );
};

export { SaveButton };
