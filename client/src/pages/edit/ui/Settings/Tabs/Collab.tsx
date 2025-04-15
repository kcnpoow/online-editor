import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { generateRoomId } from '@pages/edit/lib/generateRoomId';
import { socket } from '@shared/config/socket';

export const Collab = () => {
  const { collabMode, setCollabMode } = useSettings();
  const { roomId, setRoomId } = useCollab();

  const handleCollabModeChange = () => {
    const newCollabMode = !collabMode;

    if (newCollabMode) {
      const roomId = generateRoomId();

      socket.emit('join-room', roomId);

      setCollabMode(newCollabMode);
      setRoomId(roomId);
    } else {
      socket.emit('leave-room', roomId);

      setCollabMode(newCollabMode);
      setRoomId('');
    }
  };

  const collaborationLink = `localhost:5173/edit?roomId=${roomId}`;

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

        {collabMode && <Clipper>{collaborationLink}</Clipper>}
      </SettingsRow>
    </section>
  );
};
