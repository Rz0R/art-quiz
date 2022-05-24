import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../consts/assetsPaths';
import { InputRange } from './InputRange';
import { CheckBox } from './CheckBox';

const SettingsPage: React.FC = () => {
  const [volumeValue, setVolumeValue] = useState(40);
  const [isVolumeActive, setIsVolumeActive] = useState(false);

  const [timeValue, setTimeValue] = useState(40);
  const [isTimeActive, setIsTimeActive] = useState(false);
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
          <InputRange value={volumeValue} isActive={isVolumeActive} onChange={(evt) => setVolumeValue(Number(evt.target.value))} />
          <CheckBox id='volume' isChecked={isVolumeActive} onChange={() => setIsVolumeActive(!isVolumeActive)} />
          <div className='menu__title'>volume</div>
        </div>
        <div className='menu__item'>
          <div className='menu__icon menu__icon--time' />
          <InputRange value={timeValue} isActive={isTimeActive} onChange={(evt) => setTimeValue(Number(evt.target.value))} />
          <CheckBox id='time' isChecked={isTimeActive} onChange={() => setIsTimeActive(!isTimeActive)} />
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
