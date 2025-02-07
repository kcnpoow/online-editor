import { Button } from '@shared/ui/button';
import { Modal, ModalFooter } from '@shared/ui/modal';

type Props = {
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
};

export const Settings = ({ isSettingsOpen, onSettingsClose }: Props) => {
  return (
    <Modal isOpened={isSettingsOpen} onClose={onSettingsClose}>
      <ModalFooter>
        <Button variant='secondary' />
      </ModalFooter>
    </Modal>
  );
};
