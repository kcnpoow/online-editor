import { SettingsRow } from './SettingsRow';
import { useEdit } from '@pages/edit/lib/useEdit';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';
import { generateCollabId } from '@pages/edit/test/generateCollabLink';
import { collabApi } from '@pages/edit/api/CollabApi';

export const Collab = () => {
  const { editorState, onEditorStateChange } = useEdit();
  const { settings, collab } = editorState;

  const handleToggleCollabMode = () => {
    const isEnabled = settings.collabMode;

    if (isEnabled) {
      // Leave the current room and disable collaboration
      if (collab.roomId) {
        collabApi.leaveRoom(collab.roomId);
      }

      onEditorStateChange('settings', 'collabMode', false);
      onEditorStateChange('collab', 'roomId', undefined);
    } else {
      // Generate a new room and enable collaboration
      const roomId = generateCollabId();
      collabApi.joinRoom(roomId);

      onEditorStateChange('settings', 'collabMode', true);
      onEditorStateChange('collab', 'roomId', roomId);
    }
  };

  const collaborationLink = `localhost:5173/edit?roomId=${collab.roomId}`;

  return (
    <section>
      <SettingsRow title='Collaborative Work' hint='Collab with your friends.'>
        <Switch
          checked={settings.collabMode}
          onChange={handleToggleCollabMode}
          className='mb-2'
        />

        {settings.collabMode && collab.roomId && (
          <Clipper>{collaborationLink}</Clipper>
        )}
      </SettingsRow>
    </section>
  );
};
