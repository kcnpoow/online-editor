import { useState } from 'react';

import { Menu } from './Menu';
import { Behavior, Privacy } from './Tabs';
import { Collab } from './Tabs/Collab';
import { SettingsTab } from '@pages/edit/model/types';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';

type Props = {
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
};

export const Settings = ({ isSettingsOpen, onSettingsClose }: Props) => {
  const [currentTab, setCurrentTab] = useState<SettingsTab>('behavior');

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'behavior':
        return <Behavior />;
      case 'privacy':
        return <Privacy />;
      case 'collab':
        return <Collab />;
    }
  };

  return (
    <Modal
      className='text-md'
      isOpen={isSettingsOpen}
      onClose={onSettingsClose}
    >
      <Modal.Header title='Draft Settings' />

      <Modal.Body className='md:grid md:grid-cols-[200px_1fr]'>
        <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className='p-4'>{renderCurrentTab()}</div>
      </Modal.Body>

      <Modal.Footer className='flex justify-end'>
        <Button color='primary' onClick={onSettingsClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
