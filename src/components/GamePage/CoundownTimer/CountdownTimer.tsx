import { useEffect, useState, useRef } from 'react';
import { formatTime } from '../../../utils/common';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { timeIsOver, playTimer } from '../../../store/gameState/gameState';
import { TimerActions } from '../../../consts/const';

export const CountdownTimer = () => {
  const { time } = useAppSelector((state) => state.SETTINGS);
  const { timerActions } = useAppSelector((state) => state.GAME);
  const dispatch = useAppDispatch();

  const [remainingTime, setRemaningTime] = useState(time);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (remainingTime > 0 && timerActions === TimerActions.PLAY) {
      timerId.current = setTimeout(() => {
        setRemaningTime((prev) => prev - 1);
      }, 1000);
    } else if (timerActions === TimerActions.STOP) {
      clearInterval(timerId.current as NodeJS.Timeout);
    } else if (timerActions === TimerActions.RESET) {
      dispatch(playTimer());
      setRemaningTime(time);
    }
    return () => clearInterval(timerId.current as NodeJS.Timeout);
  }, [remainingTime, timerActions, time, dispatch]);

  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(timerId.current as NodeJS.Timeout);
      dispatch(timeIsOver());
    }
  }, [remainingTime, dispatch]);

  const formattedTime = formatTime(remainingTime);

  return <div className='countdown-timer'>{formattedTime}</div>;
};
