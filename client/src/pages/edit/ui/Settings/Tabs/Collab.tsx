import { SettingsArticle } from './SettingsArticle';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { generateRoomId } from '@pages/edit/lib/generateRoomId';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';
import { socket } from '@shared/config/socket';
import { useEditor } from '@pages/edit/model/EditorContext';

export const Collab = () => {
  const { settingsValues, setSettingsValue } = useSettings();
  const { collabValues, setCollabValue } = useCollab();
  const { editorValues } = useEditor();

  const handleCollabModeChange = () => {
    const newCollabMode = !settingsValues.collabMode;

    if (newCollabMode) {
      const roomId = generateRoomId();

      const { html, css, js } = editorValues;
      socket.emit('create-room', roomId, html, css, js);
    } else {
      socket.emit('leave-room');

      setCollabValue('roomId', null);
    }

    setSettingsValue('collabMode', newCollabMode);
  };

  return (
    <section>
      <SettingsArticle
        title='Collaborative Work'
        hint='Enable real-time collaboration to work on the same code together.'
      >
        <Switch
          checked={settingsValues.collabMode}
          onChange={handleCollabModeChange}
        />

        {settingsValues.collabMode && collabValues.roomId && (
          <Clipper className='mt-2'>{`localhost:5173/edit?roomId=${collabValues.roomId}`}</Clipper>
        )}
      </SettingsArticle>
    </section>
  );
};
