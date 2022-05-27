import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { setVolume, setTimer } from '../../store/settingsState/settingsState';
import { saveSettingsAction } from '../../store/serviceActions';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../consts/assetsPaths';
import { InputRange } from './InputRange';
import { CheckBox } from './CheckBox';
import { TIMER_DEFAULT_SETTINGS, VOLUME_DEFAULT_SETTINGS } from '../../consts/const';

const SettingsPage: React.FC = () => {
  const { isVolumeOn, volumeLevel, isTimerOn, time } = useAppSelector((state) => state.SETTINGS);
  const dispatch = useAppDispatch();

  const [volumeValue, setVolumeValue] = useState(volumeLevel);
  const [isVolumeActive, setIsVolumeActive] = useState(isVolumeOn);

  const [timeValue, setTimeValue] = useState(time);
  const [isTimerActive, setIsTimeActive] = useState(isTimerOn);
  const navigate = useNavigate();

  const { MIN_TIME, MAX_TIME, TIME_STEP } = TIMER_DEFAULT_SETTINGS;
  const { MIN_VOLUME_VALUE, MAX_VOLUME_VALUE, VOLUME_STEP } = VOLUME_DEFAULT_SETTINGS;

  const onSaveBtnClick = () => {
    // dispatch(setVolume({ isVolumeOn: isVolumeActive, volumeLevel: volumeValue }));
    // dispatch(setTimer({ isTimerOn: isTimerActive, time: timeValue }));
    dispatch(saveSettingsAction({ isVolumeOn: isVolumeActive, volumeLevel: volumeValue, isTimerOn: isTimerActive, time: timeValue }));
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
          <InputRange
            value={volumeValue}
            isActive={isVolumeActive}
            min={MIN_VOLUME_VALUE}
            max={MAX_VOLUME_VALUE}
            step={VOLUME_STEP}
            onChange={(evt) => setVolumeValue(Number(evt.target.value))}
          />
          <CheckBox id='volume' isChecked={isVolumeActive} onChange={() => setIsVolumeActive(!isVolumeActive)} />
          <div className='menu__title'>volume</div>
        </div>
        <div className='menu__item'>
          <div className='menu__icon menu__icon--time' />
          <div className='menu__input-wrapper'>
            <InputRange
              value={timeValue}
              isActive={isTimerActive}
              min={MIN_TIME}
              max={MAX_TIME}
              step={TIME_STEP}
              onChange={(evt) => setTimeValue(Number(evt.target.value))}
            />
            <span className='menu__time-value'>{timeValue}</span>
          </div>
          <CheckBox id='time' isChecked={isTimerActive} onChange={() => setIsTimeActive(!isTimerActive)} />
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
