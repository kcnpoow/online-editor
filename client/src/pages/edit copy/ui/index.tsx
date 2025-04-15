import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Header } from './Header';
import { Editor } from './Editor';
import { Settings } from './Settings';
import { EditProvider } from '../model/EditContext';
import { Cursor, EditorField } from '../model/types';
import { socket } from '@shared/config/socket';
import { useEdit } from '../lib/useEdit';
import { collabApi } from '../api/CollabApi';

const Edit = () => {
  // const { onEditorStateChange } = useEdit();
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const roomId = searchParams.get('roomId');

  //   if (roomId) {
  //     collabApi.joinRoom(roomId);
  //     onEditorStateChange('settings', 'collabMode', true);
  //     onEditorStateChange('collab', 'roomId', roomId);
  //   }
  // }, [searchParams, onEditorStateChange]);

  // useEffect(() => {
  //   const handleCursorMove = (cursors: Cursor[]) => {
  //     onEditorStateChange('collab', 'cursors', cursors);
  //   };

  //   const handleTextChange = (field: EditorField, value: string) => {
  //     onEditorStateChange('code', field, value);
  //   };

  //   socket.on('cursor-move', handleCursorMove);
  //   socket.on('text-change', handleTextChange);

  //   return () => {
  //     socket.off('cursor-move', handleCursorMove);
  //     socket.off('text-change', handleTextChange);
  //   };
  // }, [onEditorStateChange]);

  // return (
  //   <div className='flex flex-col h-screen text-white bg-black'>
  //     <Settings
  //       isSettingsOpen={isSettingsOpen}
  //       onSettingsClose={() => setIsSettingsOpen(false)}
  //     />

  //     <Header onSettingsOpen={() => setIsSettingsOpen(true)} />

  //     <Editor />
  //   </div>
  // );
  return <div className='flex flex-col h-screen text-white bg-black'></div>;
};

export { Edit };
