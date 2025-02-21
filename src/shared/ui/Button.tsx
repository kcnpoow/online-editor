import { ButtonHTMLAttributes, ElementType } from 'react';
import cn from 'classnames';

type Props<T extends ElementType> = {
  color: 'primary' | 'secondary' | 'tertiary';
  as?: T;
  adaptive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  React.ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>({
  color,
  className,
  as,
  adaptive,
  variant,
  ...props
}: Props<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        'text-sm whitespace-nowrap rounded-sm active:translate-y-[1px]',
        className,
        {
          'p-2 md:px-4 md:py-3 md:text-md': adaptive,
          'px-4 py-3': !adaptive,
        },
        {
          ['text-black bg-success hover:text-white hover:bg-[#468A4D]']:
            color === 'primary',
          ['text-white bg-[#26282F] hover:bg-[#454856]']: color === 'secondary',
          ['bg-[#444857] hover:bg-[#5A5F73]']: color === 'tertiary',
        }
      )}
      {...props}
    />
  );
};
