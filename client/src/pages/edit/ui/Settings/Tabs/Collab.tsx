import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { collabService } from '@pages/edit/api/CollabService';
import { generateRoomId } from '@pages/edit/lib/generateRoomId';

export const Collab = () => {
  const { collabMode, setCollabMode } = useSettings();
  const { roomId, setRoomId } = useCollab();

  const handleCollabModeChange = () => {
    const newCollabMode = !collabMode;

    if (newCollabMode) {
      const roomId = generateRoomId();

      collabService.join(roomId);

      setCollabMode(newCollabMode);
      setRoomId(roomId);
    } else {
      setCollabMode(newCollabMode);
      setRoomId('');
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
