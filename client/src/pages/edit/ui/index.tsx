import { memo, useState } from 'react';

import { Header } from './Header';
import { Editor } from './Editor';
import { Settings } from './Settings';
import { SettingsProvider } from '../model/SettingsContext';
import { CollabProvider } from '../model/CollabContext';
import { EditorProvider } from '../model/EditorContext';
import { useCollabSync } from '../lib/useCollabSync';
import { useEditorSetup } from '../lib/useEditorSetup';

const Edit = memo(() => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEditorSetup();
  useCollabSync();

  return (
    <div className='relative overflow-x-hidden flex flex-col h-screen text-white bg-black'>
      <Header onSettingsOpen={() => setIsSettingsOpen(true)} />

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
