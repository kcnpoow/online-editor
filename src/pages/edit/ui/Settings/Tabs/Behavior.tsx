import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';

import { useEdit } from '@pages/edit/lib/useEdit';

export const Behavior = () => {
  const { editorState, onEditorStateChange } = useEdit();

  return (
    <section>
      <SettingsRow
        title='Auto-Updating Preview'
        hint='If enabled, the preview panel updates automatically as you code. If
        disabled, use the "Run" button to update.'
      >
        <Switch
          checked={editorState.autoUpdate}
          onChange={() =>
            onEditorStateChange('autoUpdate', !editorState.autoUpdate)
          }
        />
      </SettingsRow>

      <SettingsRow
        title='Auto Save'
        hint='If enabled, your changes will be automatically saved as you work. If disabled, you will need to manually save your progress.'
      >
        <Switch onChange={() => null} />
      </SettingsRow>
    </section>
  );
};
