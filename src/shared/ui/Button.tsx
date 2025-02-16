import { ButtonHTMLAttributes, ElementType } from 'react';
import cn from 'classnames';

type Props<T extends ElementType> = {
  variant: 'primary' | 'secondary' | 'tertiary';
  as?: T;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  React.ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>({
  variant,
  className,
  as,
  ...props
}: Props<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        'py-2 px-2 text-sm whitespace-nowrap rounded-sm active:translate-y-[1px] md:px-4 md:py-3 md:text-md',
        className,
        {
          ['text-black bg-success hover:text-white hover:bg-[#468A4D]']:
            variant === 'primary',
          ['bg-[#26282F] hover:bg-[#454856]']: variant === 'secondary',
          ['bg-[#444857] hover:bg-[#5A5F73]']: variant === 'tertiary',
        }
      )}
      {...props}
    />
  );
};
