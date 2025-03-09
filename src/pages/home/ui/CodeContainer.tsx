import { ReactNode } from 'react';
import cn from 'classnames'

type Props = {
  title: string;
  children?: ReactNode;
  className: string;
};

export const CodeContainer = ({ title, children, className }: Props) => {
  return (
    <div className={cn('absolute w-[300px] h-[140px] bg-[#1d1e22] rounded-[6px] shadow-[0_4px_30px_rgba(0,0,0,0.5)]', className)}>
      <header className='grid grid-cols-[36px_auto_36px] items-center'>
        <svg className='m-[10px]' width='16' height='16' fill='none'>
          <path
            d='M15 6.675l-1.8-.6c-.2-.1-.3-.3-.2-.4l.9-1.7c.6-1.2-.7-2.5-1.9-1.9l-1.7.9c-.1.1-.3 0-.4-.2l-.6-1.8c-.4-1.3-2.2-1.3-2.6 0l-.6 1.8c-.1.2-.3.3-.4.2l-1.7-.9c-1.2-.6-2.5.7-1.9 1.9l.9 1.7c.1.1 0 .3-.2.4l-1.8.6c-1.3.4-1.3 2.3 0 2.7l1.8.6c.2 0 .3.2.2.3l-.9 1.7c-.6 1.2.7 2.5 1.9 1.9l1.7-.9c.2-.1.4 0 .4.2l.6 1.8c.4 1.3 2.3 1.3 2.7 0l.6-1.8c.1-.2.3-.3.4-.2l1.7.9c1.2.6 2.5-.7 1.9-1.9l-1-1.7c-.1-.2 0-.4.2-.4l1.8-.6c1.3-.4 1.3-2.2 0-2.6zm-7 3.7c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4z'
            fill='#4C4F5A'
          ></path>
        </svg>
        {/* icon */}

        <div className='font-black text-[13px] tracking-[1.57px] text-[#c5c8d4] m-0'>
          {title}
        </div>

        {/* icon */}
        <svg className='m-[10px]' width='16' height='8' fill='none'>
          <path
            d='M8.709 7.651l6.161-5.622c.241-.22.383-.517.383-.84 0-.323-.142-.62-.383-.84A1.361 1.361 0 0 0 13.95 0c-.354 0-.68.13-.921.349l-5.27 4.808L2.492.349A1.361 1.361 0 0 0 1.57 0C1.215 0 .89.13.648.336.38.569.253.879.253 1.189c0 .297.127.595.368.84 1.615 1.486 5.807 5.325 6.09 5.596l.03.026c.509.465 1.458.465 1.968 0z'
            fill='#4C4F5A'
          ></path>
        </svg>
      </header>
      <div className='text-[13px] leading-[1.3] m-0 mx-[10px] mb-[10px]'>
        {children}
      </div>
    </div>
  );
};