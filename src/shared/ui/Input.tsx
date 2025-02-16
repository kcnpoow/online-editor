import { InputHTMLAttributes, cloneElement } from 'react';
import { IconType } from 'react-icons/lib';
import cn from 'classnames';

type Props = {
  icon?: ReturnType<IconType>;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, icon, ...props }: Props) => {
  const iconWithProps = icon ? cloneElement(icon, { color: '#878C9E' }) : null;

  return (
    <div className='relative h-full text-sm md:text-md '>
      <input
        className={cn(
          'w-full p-3 text-white bg-[#26282F] rounded-md not-read-only:focus-within:outline-0 not-read-only:focus-within:bg-[#454856]',
          className,
          { 'pl-8 md:pl-10': icon }
        )}
        {...props}
      />

      <div className='absolute top-1/2 left-3 -translate-y-1/2 text-md md:text-lg'>
        {iconWithProps}
      </div>
    </div>
  );
};
