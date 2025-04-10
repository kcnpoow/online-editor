import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from './Header';
import { Editor } from './Editor';
import { Settings } from './Settings';
import { useEdit } from '../lib/useEdit';
import { EditorStateFields, EditProvider } from '../model';
import { socket } from '@shared/config/socket';
import { generateCollabId } from '../test/generateCollabLink';

const Wrapper = () => {
  const { editorState, onEditorStateChange } = useEdit();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchParams, _] = useSearchParams();

  const handleTextChange = ({
    text,
    field,
  }: {
    text: string;
    field: EditorStateFields;
  }) => {
    console.log(text);
    onEditorStateChange(field, text);
  };

  useEffect(() => {
    socket.on('text-change', handleTextChange);

    return () => {
      socket.off('text-change', handleTextChange);
    };
  }, []);

  // Join to room when user enters via link
  useEffect(() => {
    const collabId = searchParams.get('collabId');

    if (collabId) {
      socket.emit('join-room', collabId);
      onEditorStateChange('collabId', collabId);
    }
  }, [searchParams]);

  // Join to room when user enables collaborative work mode
  useEffect(() => {
    if (editorState.collabMode) {
      const collabId = generateCollabId();

      socket.emit('join-room', collabId);

      onEditorStateChange('collabId', collabId);
    }
  }, [editorState.collabMode]);

  return (
    <div className='flex flex-col h-screen text-white bg-black'>
      <Settings
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />

      <Header onSettingsOpen={() => setIsSettingsOpen(true)} />

      <Editor />
    </div>
  );
};

export const Edit = () => {
  return (
    <EditProvider>
      <Wrapper />
    </EditProvider>
  );
};
