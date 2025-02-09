import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type Props = {
  variant: 'primary' | 'secondary' | 'tertiary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant, className, ...props }: Props) => {
  return (
    <button
      className={cn('py-2 px-4 whitespace-nowrap rounded-sm', className, {
        ['text-black bg-success hover:text-white hover:bg-[#468A4D]']:
          variant === 'primary',
        ['bg-[#26282F] hover:bg-[#454856]']: variant === 'secondary',
        ['bg-[#444857] hover:bg-[#5A5F73]']: variant === 'tertiary',
      })}
      {...props}
    ></button>
  );
};
