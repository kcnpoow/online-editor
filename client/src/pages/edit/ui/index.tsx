import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from './Header';
import { Editor } from './Editor';
import { Settings } from './Settings';
import { SettingsProvider, useSettings } from '../model/SettingsContext';
import { CollabProvider } from '../model/CollabContext';
import { EditorProvider, useEditor } from '../model/EditorContext';
import { useCollabSync } from '../lib/useCollabSync';
import { generateOutput } from '../lib/generateOutput';
import { socket } from '@shared/config/socket';
import { useDebounce } from '@shared/hooks/useDebounce';

const Edit = memo(() => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const { settingsValues } = useSettings();
  const { editorValues, setEditorValue } = useEditor();

  useCollabSync();

  useEffect(() => {
    const roomId = searchParams.get('roomId');

    if (roomId) {
      socket.emit('join-room', roomId);
    }
  }, [socket]);

  const handleExecute = () => {
    const output = generateOutput(
      editorValues.html,
      editorValues.css,
      editorValues.js
    );

    setEditorValue('output', output);
  };

  const handleExecuteDebounced = useDebounce(() => {
    if (settingsValues.autoUpdate) handleExecute();
  }, 1000);

  useEffect(handleExecuteDebounced, [
    settingsValues.autoUpdate,
    editorValues.html,
    editorValues.css,
    editorValues.js,
  ]);

  return (
    <div className='relative overflow-x-hidden flex flex-col h-screen text-white bg-black'>
      <Header
        onExecute={handleExecute}
        onSettingsOpen={() => setIsSettingsOpen(true)}
      />

      <Editor />

      <Settings
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
});

const EditWithProviders = () => (
  <SettingsProvider>
    <CollabProvider>
      <EditorProvider>
        <Edit />
      </EditorProvider>
    </CollabProvider>
  </SettingsProvider>
);

export { EditWithProviders as Edit };
