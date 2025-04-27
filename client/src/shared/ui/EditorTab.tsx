import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
};

export const EditorTab = ({ onClick, children, active, className }: Props) => {
  return (
    <li
      className={cn(
        'py-2 px-4 cursor-pointer select-none border-t-2',
        {
          'bg-[#444857] border-[#D5D7DD] hover:bg-[#505466]': active,
          'bg-[#2D3039] border-[#454856] hover:bg-[#3a3d47]': !active,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
