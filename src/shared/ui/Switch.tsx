import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch = ({ id, value, ...props }: Props) => {
  return (
    <div className='relative inline-block'>
      <input id={id} className='peer hidden' type='checkbox' value={value} />
      <label
        htmlFor={id}
        className='block w-[44px] h-[26px]'
      ></label>
    </div>
  );
};
