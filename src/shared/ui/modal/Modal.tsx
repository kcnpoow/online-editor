import { MouseEvent, ReactNode, useRef } from 'react';
import cn from 'classnames';

type Props = {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpened, onClose, children }: Props) => {
  const $backdrop = useRef(null);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === $backdrop.current) {
      onClose();
    }
  };

  return (
    <div
      ref={$backdrop}
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center bg-black/75',
        isOpened ? '' : 'hidden'
      )}
      onClick={handleBackdropClick}
    >
      <div className='bg-primary border-2 border-secondary rounded-sm'>
        {children}
      </div>
    </div>
  );
};
