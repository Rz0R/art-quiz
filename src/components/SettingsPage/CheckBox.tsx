type CheckBoxProps = {
  id: string;
  isChecked: boolean;
  onChange: () => void;
};

export const CheckBox = ({ id, isChecked, onChange }: CheckBoxProps) => {
  return (
    <div className='menu__checkbox checkbox'>
      <input checked={isChecked} onChange={onChange} type='checkbox' className='checkbox__input' id={`checkbox__${id}`} />
      <label htmlFor={`checkbox__${id}`} className='checkbox__label' />
    </div>
  );
};
