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
        'cursor-pointer max-md:p-1 md:pl-4 md:border-l-2',
        isActive ? 'bg-[#2D3039] border-success' : 'border-transparent'
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
