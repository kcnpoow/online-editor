import { MouseEvent, ReactNode, useRef, useEffect } from 'react';
import cn from 'classnames';

import { ModalHeader } from './Header';
import { ModalBody } from './Body';
import { ModalFooter } from './Footer';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, children, className }: Props) => {
  const $backdrop = useRef(null);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === $backdrop.current) {
      onClose();
    }
  };

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);
  return (
    <div
      ref={$backdrop}
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center px-4 py-8 bg-black/75',
        className,
        isOpen ? '' : 'hidden'
      )}
      tabIndex={1}
      onClick={handleBackdropClick}
    >
      <div
        className={
          'flex flex-col size-full max-w-[700px] max-h-[800px] bg-primary border-4 border-secondary rounded-md'
        }
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
