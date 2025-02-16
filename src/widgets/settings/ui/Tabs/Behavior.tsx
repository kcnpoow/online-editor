import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/switch';

import { useEdit } from '@shared/hooks/useEdit';

export const Behavior = () => {
  const { editorSettings, onEditorSettingsChange } = useEdit();

  return (
    <section>
      <SettingsRow
        title='Auto-Updating Preview'
        hint='If enabled, the preview panel updates automatically as you code. If
        disabled, use the "Run" button to update.'
      >
        <div className='flex items-center gap-x-3'>
          <Switch
            checked={editorSettings.autoUpdate}
            onChange={() =>
              onEditorSettingsChange('autoUpdate', !editorSettings.autoUpdate)
            }
          />

          {editorSettings.autoUpdate ? 'On' : 'Off'}
        </div>
      </SettingsRow>
    </section>
  );
};
