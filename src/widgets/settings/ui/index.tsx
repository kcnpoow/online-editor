import { useState } from 'react';

import { Menu } from './Menu';
import { Behavior } from './Behavior';
import type { Tabs } from '../model';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/modal';

type Props = {
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
};

export const Settings = ({ isSettingsOpen, onSettingsClose }: Props) => {
  const [currentTab, setCurrentTab] = useState<Tabs>('privacy');

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'behavior':
        return <Behavior />;
    }
  };

  return (
    <Modal
      className='text-xl'
      isOpen={isSettingsOpen}
      onClose={onSettingsClose}
    >
      <Modal.Header title='Draft Settings' />

      <Modal.Body className='md:grid md:grid-cols-[200px_1fr]'>
        <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className='p-4'>{renderCurrentTab()}</div>
      </Modal.Body>

      <Modal.Footer className='flex justify-end'>
        <Button variant='primary' onClick={onSettingsClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
