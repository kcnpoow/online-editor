import { InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames';
import styles from './style.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Switch = ({
  checked = false,
  className,
  onChange,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={cn('relative inline-block select-none', className)}>
      <input
        ref={inputRef}
        className='hidden'
        type='checkbox'
        onChange={onChange}
        checked={checked}
        {...props}
      />
      <label
        onClick={handleClick}
        className={cn(styles.switch)}
        htmlFor={props.id}
      />
    </div>
  );
};
