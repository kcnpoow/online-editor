import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Chip = ({ children }: Props) => {
  return (
    <span className='flex items-center gap-x-1 px-2 py-1 text-xs bg-[#454856] rounded-sm transition-colors hover:bg-[#5b5e6f]'>
      {children}
    </span>
  );
};
