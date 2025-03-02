import { ReactNode } from 'react';
import cn from 'classnames';

type Props = { children?: ReactNode; className?: string };

export const Divider = ({ children, className }: Props) => {
  return (
    // <div
    //   className={cn(
    //     'relative flex justify-center items-center w-full text-black/50',
    //     className
    //   )}
    // >
    //   <hr className='w-full' />

    //   <div className='absolute'>{children}</div>
    // </div>
    <div className={cn('flex items-center w-full', className)}>
      <hr className='flex-1' />

      {children && (
        <>
          <div className='mx-4 -mt-1'>{children}</div>

          <hr className='flex-1' />
        </>
      )}
    </div>
  );
};
