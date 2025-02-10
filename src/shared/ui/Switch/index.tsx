import { InputHTMLAttributes, useRef } from 'react';

import styles from './style.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch = ({ checked, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative inline-block select-none'>
      <input
        ref={inputRef}
        className='hidden'
        type='checkbox'
        onChange={onChange}
        checked={checked}
      />

      <label
        onClick={() => inputRef?.current?.click()}
        className={styles.switch}
      />
    </div>
  );
};
