import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Swtich';
import { Input } from '@shared/ui/Input';
import { useEdit } from '@pages/edit/lib/useEdit';

export const Privacy = () => {
  const { editorSettings, onEditorSettingsChange } = useEdit();

  return (
    <section>
      <SettingsRow
        title='Direct Link Access'
        hint='If this option is enabled, users can access the content only through a direct link, ensuring it remains hidden from others without the URL.'
      >
        <Switch
          checked={editorSettings.isPrivate}
          onChange={() =>
            onEditorSettingsChange('isPrivate', !editorSettings.isPrivate)
          }
        />

        {editorSettings.isPrivate && <Input value='localhost:8000' readOnly />}
      </SettingsRow>
    </section>
  );
};
