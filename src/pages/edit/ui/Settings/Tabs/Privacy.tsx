import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';
import { useEdit } from '@pages/edit/lib/useEdit';

export const Privacy = () => {
  const { editorState, onEditorStateChange } = useEdit();

  return (
    <section>
      <SettingsRow
        title='Direct Link Access'
        hint='If this option is enabled, users can access the content only through a direct link, ensuring it remains hidden from others without the URL.'
      >
        <Switch
          checked={editorState.private}
          onChange={() => onEditorStateChange('private', !editorState.private)}
        />
      </SettingsRow>
    </section>
  );
};
