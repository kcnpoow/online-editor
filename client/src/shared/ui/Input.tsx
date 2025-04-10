import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import cn from 'classnames';

type Props = {
  icon?: ReturnType<IconType>;
  containerClassName?: string;
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  className,
  containerClassName,
  icon,
  label,
  placeholder,
  error,
  ...props
}: Props) => {
  return (
    <div className={cn(containerClassName, { 'pt-6': label })}>
      <div className='relative  w-full h-full'>
        <input
          className={cn(
            className,
            'peer w-full p-3 text-white placeholder-[#878C9E] bg-[#26282F] rounded-md not-read-only:focus-within:bg-[#454856]',
            {
              'pl-10': icon,
              'outline-0 ring-2 ring-red-400 focus-within:ring-2': error,
              'not-read-only:focus-within:outline-0': !error,
            }
          )}
          placeholder={label ? ' ' : placeholder}
          id={id}
          {...props}
        />

        {label && (
          <label
            className={cn(
              `
            absolute top-1/2 left-0 -translate-y-1/2 text-[#878c9e] transition-transform pointer-events-none
            peer-focus-within:-translate-y-12 peer-focus-within:translate-x-0 peer-focus-within:text-white peer-[:not(:placeholder-shown)]:text-white
            peer-[:not(:placeholder-shown)]:-translate-y-12 peer-[:not(:placeholder-shown)]:translate-x-0
            `,
              {
                'translate-x-10': icon,
                'translate-x-3': !icon,
              }
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}

        {icon && (
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#878C9E] text-lg pointer-events-none transition-all'>
            {icon}
          </span>
        )}
      </div>

      {error && <p className='text-red-400'>{error}</p>}
    </div>
  );
};
