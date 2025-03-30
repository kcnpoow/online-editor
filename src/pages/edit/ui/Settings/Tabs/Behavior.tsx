import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Swtich';

import { useEdit } from '@pages/edit/lib/useEdit';

export const Behavior = () => {
  const { editorSettings, onEditorSettingsChange } = useEdit();

  return (
    <section>
      <SettingsRow
        title='Auto-Updating Preview'
        hint='If enabled, the preview panel updates automatically as you code. If
        disabled, use the "Run" button to update.'
      >
        <Switch
          checked={editorSettings.autoUpdate}
          onChange={() =>
            onEditorSettingsChange('autoUpdate', !editorSettings.autoUpdate)
          }
        />
      </SettingsRow>
    </section>
  );
};
