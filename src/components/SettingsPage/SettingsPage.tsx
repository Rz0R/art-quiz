import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../consts/assetsPaths';
import { InputRange } from './InputRange';

const SettingsPage: React.FC = () => {
  const [volumeValue, setVolumeValue] = useState(40);
  const [timeValue, setTimeValue] = useState(40);
  const navigate = useNavigate();

  const onSaveBtnClick = () => {
    navigate('/');
  };

  return (
    <div className='settings'>
      <Link className='logo' to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <h2 className='settings__title'>settings</h2>
      <div className='settings__menu menu'>
        <div className='menu__item'>
          <div className='menu__icon menu__icon--volume' />
          <InputRange value={volumeValue} onChange={(evt) => setVolumeValue(Number(evt.target.value))} />
          <input type='checkbox' className='menu__checkbox' />
          <div className='menu__title'>volume</div>
        </div>
        <div className='menu__item'>
          <div className='menu__icon menu__icon--time' />
          <InputRange value={timeValue} onChange={(evt) => setTimeValue(Number(evt.target.value))} />
          <input type='checkbox' className='menu__checkbox' />
          <div className='menu__title'>time</div>
        </div>
      </div>
      <button className='btn' onClick={onSaveBtnClick}>
        save
      </button>
    </div>
  );
};

export { SettingsPage };
