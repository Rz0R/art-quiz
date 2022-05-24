import { ChangeEvent } from 'react';

type InputRangeProps = {
  value: number;
  isActive: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const InputRange = ({ value, isActive, onChange }: InputRangeProps) => {
  return (
    <input
      type='range'
      className='menu__progress'
      value={value}
      disabled={!isActive}
      onChange={onChange}
      style={{ background: `linear-gradient(90deg, dimgray 0, dimgray ${value}%, #e5e5e5 0, #e5e5e5)` }}
    />
  );
};
