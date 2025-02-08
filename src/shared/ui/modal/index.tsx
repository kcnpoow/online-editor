import { MouseEvent, ReactNode, useRef } from 'react';
import cn from 'classnames';

import { ModalHeader } from './Header';
import { ModalBody } from './Body';
import { ModalFooter } from './Footer';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
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
        'fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/75',
        isOpen ? 'visible' : 'invisible'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={
          'w-full max-w-[35rem] bg-primary border-4 border-secondary rounded-md'
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
