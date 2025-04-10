import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ModalFooter = ({ children, className }: Props) => {
  return (
    <footer className={cn('p-3 bg-secondary', className)}>{children}</footer>
  );
};
