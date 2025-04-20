import { useState } from 'react';

import { Menu } from './Menu';
import { Behavior, Collab } from './Tabs';
import { SettingsTab } from '@pages/edit/model/types';
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';

type Props = {
  isSettingsOpen: boolean;
  onSettingsClose: () => void;
};

export const Settings = ({ isSettingsOpen, onSettingsClose }: Props) => {
  const [currentTab, setCurrentTab] = useState<SettingsTab>(
    SettingsTab.Behavior
  );

  const renderCurrentTab = () => {
    if (currentTab === SettingsTab.Behavior) {
      return <Behavior />;
    }

    if (currentTab === SettingsTab.Privacy) {
      return null;
    }

    if (currentTab === SettingsTab.Collab) {
      return <Collab />;
    }
  };

  return (
    <Modal open={isSettingsOpen} onClose={onSettingsClose}>
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
