import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
};

export const Tab = ({ onClick, children, isActive }: Props) => {
  return (
    <li
      className={cn('py-2 px-4 bg-[#2C303A] cursor-pointer select-none', { ['bg-[#444857]']: isActive })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
