import { useEffect, useState, useRef } from 'react';
import { formatTime } from '../../../utils/common';

const defaultRamainingTime = 60;

export const CountdownTimer = () => {
  const [remainingTime, setRemaningTime] = useState(defaultRamainingTime);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (remainingTime > 0) {
      timerId.current = setTimeout(() => {
        setRemaningTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime <= 0) {
      clearInterval(timerId.current as NodeJS.Timeout);
    }

    return () => clearInterval(timerId.current as NodeJS.Timeout);
  }, [remainingTime]);

  const time = formatTime(remainingTime);

  return <div className='countdown-timer'>{time}</div>;
};
