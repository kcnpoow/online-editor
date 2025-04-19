import * as am from '@automerge/automerge';

import { SettingsRow } from './SettingsRow';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { collabService } from '@pages/edit/api/CollabService';
import { generateRoomId } from '@pages/edit/lib/generateRoomId';
import { useEditor } from '@pages/edit/model/EditorContext';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';

export const Collab = () => {
  const { collabMode, setCollabMode } = useSettings();
  const { roomId, setRoomId, docRef } = useCollab();
  const { html, css, js } = useEditor();

  const handleCollabModeChange = () => {
    const newCollabMode = !collabMode;

    if (newCollabMode) {
      const roomId = generateRoomId();

      const doc = am.from({ html, css, js });
      collabService.create(roomId, doc);

      setCollabMode(newCollabMode);
      setRoomId(roomId);
      docRef.current = doc;
    } else {
      setCollabMode(newCollabMode);
      setRoomId('');
      docRef.current = null;
    }
  };

  return (
    <section>
      <SettingsRow
        title='Collaborative Work'
        hint='Enable real-time collaboration to work on the same code together.'
      >
        <Switch
          className='mb-2'
          checked={collabMode}
          onChange={handleCollabModeChange}
        />

        {collabMode && (
          <Clipper>{`localhost:5173/edit?roomId=${roomId}`}</Clipper>
        )}
      </SettingsRow>
    </section>
  );
};
