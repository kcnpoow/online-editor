import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from './Header';
import { Editor } from './Editor';
import { Settings } from './Settings';
import { SettingsProvider, useSettings } from '../model/SettingsContext';
import { EditorProvider } from '../model/EditorContext';
import { CollabProvider, useCollab } from '../model/CollabContext';
import { useEditor } from '../model/EditorContext';
import { generateOutput } from '@pages/edit copy/lib/generateOutput';
import { socket } from '@shared/config/socket';
import { Cursor } from '../model/types';
import { useDebounce } from '@shared/hooks/useDebounce';

const Edit = () => {
  const [searchParams] = useSearchParams();
  const [output, setOutput] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { htmlCode, cssCode, jsCode } = useEditor();
  const { setCursors } = useCollab();
  const { autoUpdate } = useSettings();

  const handleExecute = () => {
    setOutput(generateOutput(htmlCode, cssCode, jsCode));
  };

  const handleExecuteDebounced = useDebounce(handleExecute, 1000);

  useEffect(() => {
    const handleCursorMove = (cursors: Cursor[]) => {
      setCursors(cursors);
    };

    socket.on('cursor-move', handleCursorMove);

    return () => {
      socket.off('cursor-move', handleCursorMove);
    };
  }, [setCursors]);

  // Join collab room if roomId is provided
  useEffect(() => {
    const roomId = searchParams.get('roomId');

    if (roomId) {
      socket.emit('join-room', roomId);
    }
  }, []);

  // Auto update output
  useEffect(() => {
    if (autoUpdate) {
      handleExecuteDebounced();
    }
  }, [htmlCode, cssCode, jsCode, autoUpdate]);

  return (
    <div className='flex flex-col h-screen text-white bg-black'>
      <Header
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onExecute={handleExecute}
      />

      <Settings
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />

      <Editor output={output} />
    </div>
  );
};

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
