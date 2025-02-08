import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const ModalBody = ({ children, className }: Props) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};
