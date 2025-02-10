import { InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, icon, ...props }: Props) => {
  return (
    <input
      className={cn(
        'w-full p-3 bg-[#26282F] rounded-md text-sm md:text-md focus-within:outline-0 focus-within:bg-[#454856]',
        className
      )}
      {...props}
    />
  );
};
