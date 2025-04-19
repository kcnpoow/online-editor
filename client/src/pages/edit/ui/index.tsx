import { useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router';
import * as am from '@automerge/automerge';

import { Header } from './Header';
import { Settings } from './Settings';
import { Editor } from './Editor';
import { SettingsProvider, useSettings } from '../model/SettingsContext';
import { EditorProvider, useEditor } from '../model/EditorContext';
import { CollabProvider, useCollab } from '../model/CollabContext';
import { collabService } from '../api/CollabService';
import { useDebounce } from '@shared/hooks/useDebounce';

const Edit = memo(() => {
  const [searchParams] = useSearchParams();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { html, css, js } = useEditor();
  const { setRoomId, docRef, roomId } = useCollab();
  const { autoUpdate, setCollabMode, collabMode } = useSettings();

  const handleExecute = () => {};

  const handleExecuteDebounced = useDebounce(handleExecute, 1000);

  useEffect(() => {
    collabService.onUpdate((doc) => {
      console.log(doc);
    });
  }, []);

  // If collab is enabled send changes to server
  useEffect(() => {
    if (!collabMode || !roomId || !docRef.current) {
      return;
    }

    const newDoc = am.change(docRef.current!, (draft) => {
      draft.html = html;
      draft.css = css;
      draft.js = js;
    });

    const changes = am.getChanges(docRef.current, newDoc);
    collabService.update(roomId, changes);

    docRef.current = newDoc;
  }, [html, css, js]);

  // Join room via roomId from link
  useEffect(() => {
    const roomId = searchParams.get('roomId');

    if (roomId) {
      collabService.join(roomId);

      setCollabMode(true);
      setRoomId(roomId);
    }
  }, [searchParams, setCollabMode, setRoomId]);

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
