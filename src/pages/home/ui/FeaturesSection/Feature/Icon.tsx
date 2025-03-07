import { ReactNode } from 'react';

type Props = { children?: ReactNode };

export const Icon = ({ children }: Props) => {
  return (
    <div className='flex items-center justify-center w-[75px] h-[75px] -mt-12 mb-4 bg-primary rounded-lg'>
      {children}
    </div>
  );
};
