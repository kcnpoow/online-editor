import { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = {
  children?: ReactNode;
};

export const Chip = ({ children }: Props) => {
  return (
    <Link
      className='flex items-center gap-x-1 px-2 py-1 text-xs bg-[#454856] rounded-sm hover:bg-[#5B5F71]'
      to='#'
    >
      {children}
    </Link>
  );
};
