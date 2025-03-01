import { useState } from 'react';

import { Header } from './Header';
import { EditProvider } from '../model';
import { Editor } from '@widgets/editor';
import { Settings } from '@widgets/settings';

export const Edit = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <EditProvider>
      <div className='flex flex-col h-screen text-white bg-black'>
        <Settings
          isSettingsOpen={isSettingsOpen}
          onSettingsClose={() => setIsSettingsOpen(false)}
        />

        <Header onSettingsOpen={() => setIsSettingsOpen(true)} />

        <Editor />
      </div>
    </EditProvider>
  );
};
