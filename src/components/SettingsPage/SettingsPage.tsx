import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { saveSettingsAction } from '../../store/serviceActions';
import { InputRange } from './InputRange';
import { CheckBox } from './CheckBox';
import { SaveButton } from './SaveButton';
import { TIMER_DEFAULT_SETTINGS, VOLUME_DEFAULT_SETTINGS, SETTING_PAGE_TEXT, AppRoute, Language } from '../../consts/const';

const SettingsPage: React.FC = () => {
  const { isVolumeOn, volumeLevel, isTimerOn, time, language } = useAppSelector((state) => state.SETTINGS);
  const dispatch = useAppDispatch();

  const [volumeValue, setVolumeValue] = useState(volumeLevel);
  const [isVolumeActive, setIsVolumeActive] = useState(isVolumeOn);

  const [timeValue, setTimeValue] = useState(time);
  const [isTimerActive, setIsTimeActive] = useState(isTimerOn);

  const [languageValue, setLanguageValue] = useState(language);

  const { MIN_TIME, MAX_TIME, TIME_STEP } = TIMER_DEFAULT_SETTINGS;
  const { MIN_VOLUME_VALUE, MAX_VOLUME_VALUE, VOLUME_STEP } = VOLUME_DEFAULT_SETTINGS;

  const onLaguageChange = () => {
    if (languageValue === Language.EN) {
      setLanguageValue(Language.RU);
    } else {
      setLanguageValue(Language.EN);
    }
  };

  const onSaveBtnClick = () => {
    dispatch(
      saveSettingsAction({
        isVolumeOn: isVolumeActive,
        volumeLevel: volumeValue,
        isTimerOn: isTimerActive,
        time: timeValue,
        language: languageValue,
      })
    );
  };
  return (
    <div className='settings'>
      <div className='settings__header'>
        <Link className='logo settings__logo' to={AppRoute.Root}></Link>
        <h2 className='settings__title'>{SETTING_PAGE_TEXT[languageValue].title}</h2>
      </div>
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
          <div className='menu__title'>{SETTING_PAGE_TEXT[languageValue].volume}</div>
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
          <div className='menu__title'>{SETTING_PAGE_TEXT[languageValue].time}</div>
        </div>

        <div className='menu__item'>
          <div className='menu__icon menu__icon--language' />
          <div className='menu__input-wrapper'>
            <button className='menu__language-btn' onClick={onLaguageChange}>
              <div className='menu__arrow-left'></div>
            </button>
            <p className='menu__language-value'>{languageValue === Language.EN ? 'english' : 'русский'}</p>
            <button className='menu__language-btn' onClick={onLaguageChange}>
              <div className='menu__arrow-right'></div>
            </button>
          </div>
          <div className='menu__title'>{SETTING_PAGE_TEXT[languageValue].language}</div>
        </div>
      </div>
      <SaveButton onClick={onSaveBtnClick} />
    </div>
  );
};

export { SettingsPage };
