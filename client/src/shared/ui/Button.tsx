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
  filled: 'px-4 py-2 rounded-sm',
  outlined: 'px-6 py-2 bg-transparent border-2 rounded-full',
};

export const Button = <T extends ElementType = 'button'>({
  color = 'primary',
  variant = 'filled',
  className,
  as,
  disabled,
  ...props
}: Props<T>) => {
  const Component = as || 'button';

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <Component
      className={cn(
        'inline-block active:translate-y-[1px]',
        colors[color],
        variants[variant],
        disabled && disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};
