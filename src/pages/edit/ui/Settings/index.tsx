import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/modal';
import { Switch } from '@shared/ui/Switch';

type Props = {
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
};

export const Settings = ({ isSettingsOpen, onSettingsClose }: Props) => {
  return (
    <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
      <Modal.Header title='Draft Settings'></Modal.Header>

      <Modal.Body>
        <label htmlFor='auto-update'>Auto Update</label>
        <Switch id='auto-update' />
      </Modal.Body>

      <Modal.Footer className='flex justify-end'>
        <Button variant='primary' onClick={onSettingsClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
