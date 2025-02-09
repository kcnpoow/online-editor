import { InputHTMLAttributes } from 'react';

import styles from './style.module.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Switch = ({ checked, id, onChange }: Props) => {
  return (
    <div className='relative inline-block'>
      <input
        id={id}
        className='hidden'
        type='checkbox'
        onChange={onChange}
        checked={checked}
      />

      <label htmlFor={id} className={styles.switch}></label>
    </div>
  );
};
