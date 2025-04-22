import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export const Tab = ({ onClick, children, isActive }: Props) => {
  return (
    <li
      className={cn('py-2 px-4  cursor-pointer select-none border-t-2', {
        'bg-[#444857] border-[#D5D7DD]': isActive,
        'bg-[#2D3039] border-[#454856]': !isActive,
      })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
