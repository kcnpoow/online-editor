import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Description = ({ children }: Props) => {
  return <p className='text-white/80'>{children}</p>;
};
