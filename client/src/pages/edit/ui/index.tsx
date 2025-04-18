import { useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from './Header';
import { Settings } from './Settings';
import { Editor } from './Editor';
import { SettingsProvider, useSettings } from '../model/SettingsContext';
import { EditorProvider } from '../model/EditorContext';
import { CollabProvider, useCollab } from '../model/CollabContext';
import { collabService } from '../api/CollabService';
import { useDebounce } from '@shared/hooks/useDebounce';

const Edit = memo(() => {
  const [searchParams] = useSearchParams();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { autoUpdate, setCollabMode } = useSettings();
  const { setRoomId } = useCollab();

  const handleExecute = () => {};

  const handleExecuteDebounced = useDebounce(handleExecute, 1000);

  // Join room via roomId from link
  useEffect(() => {
    const roomId = searchParams.get('roomId');

    if (roomId) {
      collabService.join(roomId);

      setCollabMode(true);
      setRoomId(roomId);
    }
  }, [searchParams, setCollabMode, setRoomId]);

  // TODO: Complete
  useEffect(() => {
    if (autoUpdate) {
      handleExecuteDebounced();
    }
  }, [autoUpdate]);

  return (
    <div className='relative overflow-hidden flex flex-col h-screen text-white bg-black'>
      <Header
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onExecute={handleExecute}
      />

      <Settings
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />

      <Editor />
    </div>
  );
});

const EditWithProviders = () => {
  return (
    <SettingsProvider>
      <EditorProvider>
        <CollabProvider>
          <Edit />
        </CollabProvider>
      </EditorProvider>
    </SettingsProvider>
  );
};

export { EditWithProviders as Edit };
