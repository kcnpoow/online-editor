import { InputHTMLAttributes } from 'react';

import styles from './style.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch = ({ id, value, onChange }: Props) => {
  return (
    <div className='relative inline-block'>
      <input
        id={id}
        className='hidden'
        type='checkbox'
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.switch}></label>
    </div>
  );
};
