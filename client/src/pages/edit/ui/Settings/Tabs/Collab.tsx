import { SettingsRow } from './SettingsRow';
import { useEdit } from '@pages/edit/lib/useEdit';
import { Switch } from '@shared/ui/Switch';
import { Clipper } from '@shared/ui/Clipper';

export const Collab = () => {
  const { editorState, onEditorStateChange } = useEdit();

  return (
    <section>
      <SettingsRow title='Collaborative Work' hint='Collab with your friends.'>
        <Switch
          checked={editorState.collabMode}
          onChange={() =>
            onEditorStateChange('collabMode', !editorState.collabMode)
          }
        />

        {editorState.collabMode && editorState.collabId && (
          <div>
            <Clipper text={editorState.collabId} />
          </div>
        )}
      </SettingsRow>
    </section>
  );
};
