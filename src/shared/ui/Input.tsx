import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import cn from 'classnames';

type Props = {
  icon?: ReturnType<IconType>;
  containerClassName?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  className,
  containerClassName,
  icon,
  label,
  placeholder,
  ...props
}: Props) => {
  return (
    <div
      className={cn(containerClassName, 'relative flex items-center w-full', {
        'mt-6': label,
      })}
    >
      <input
        className={cn(
          className,
          `
          peer w-full p-3 text-white placeholder-[#878C9E] bg-[#26282F] rounded-md
          not-read-only:focus-within:outline-0 not-read-only:focus-within:bg-[#454856]
          `,
          {
            'pl-10': icon,
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
            absolute text-[#878c9e] transition-all pointer-events-none 
            peer-focus-within:-translate-y-9 peer-focus-within:translate-x-0 peer-focus-within:text-white
            peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:translate-x-0 peer-[:not(:placeholder-shown)]:text-white
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
        <span className='absolute left-3 text-[#878C9E] text-lg pointer-events-none'>
          {icon}
        </span>
      )}
    </div>
  );
};
