import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const MenuItem = ({ onClick, isActive, children }: Props) => {
  return (
    <li
      className={cn(
        'p-1 cursor-pointer md:pl-4 md:border-l-2 hover:bg-[#2D3039] transition-colors select-none',
        isActive ? 'bg-[#2D3039] border-success' : 'border-transparent'
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
