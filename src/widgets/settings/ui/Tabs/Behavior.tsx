import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';

import { useEdit } from '@shared/hooks/useEdit';

export const Behavior = () => {
  const { editorSettings, onEditorSettingsChange } = useEdit();

  return (
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
  );
};
