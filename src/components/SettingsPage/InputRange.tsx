import { ChangeEvent } from 'react';

type InputRangeProps = {
  value: number;
  isActive: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const InputRange = ({ value, isActive, min = 0, max = 100, step = 1, onChange }: InputRangeProps) => {
  const percent = (100 * (value - min)) / (max - min);

  return (
    <input
      type='range'
      className='menu__progress'
      value={value}
      disabled={!isActive}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      style={{ background: `linear-gradient(90deg, dimgray 0%, dimgray ${percent}%, #e5e5e5 0, #e5e5e5)` }}
    />
  );
};
