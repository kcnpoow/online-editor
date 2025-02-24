import { ButtonHTMLAttributes, ElementType } from 'react';
import cn from 'classnames';

type Color = 'primary' | 'secondary' | 'tertiary';
type Variant = 'filled' | 'outlined';

type Props<T extends ElementType> = {
  color?: Color;
  variant?: Variant;
  as?: T;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  React.ComponentPropsWithoutRef<T>;

const colors: { [K in Color]: string } = {
  primary:
    'text-black bg-success border-success hover:text-white hover:bg-[#468A4D]',
  secondary: 'text-white bg-[#26282F] border-[#26282F] hover:bg-[#454856]',
  tertiary: 'bg-[#444857] border-[#444857] hover:text-white hover:bg-[#5A5F73]',
};

const variants: { [K in Variant]: string } = {
  filled: 'px-4 py-2',
  outlined: 'px-6 py-2 bg-transparent border-2 rounded-full',
};

export const Button = <T extends ElementType = 'button'>({
  color = 'primary',
  variant = 'filled',
  className,
  as,
  adaptive,
  ...props
}: Props<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        'active:translate-y-[1px]',
        colors[color],
        variants[variant],
        className
      )}
      {...props}
    />
    // <Component
    //   className={cn(
    //     className,
    //     'text-sm whitespace-nowrap rounded-sm active:translate-y-[1px]',
    //     {
    //       'p-2 md:px-4 md:py-3 md:text-md': adaptive,
    //       'px-4 py-3': !adaptive,
    //     },
    //     colors[color]
    //   )}
    //   {...props}
    // />
  );
};
