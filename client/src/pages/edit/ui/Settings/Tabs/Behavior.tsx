import { useSettings } from '@pages/edit/model/SettingsContext';
import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';

export const Behavior = () => {
  const { autoUpdate, setAutoUpdate } = useSettings();

  return (
    <section>
      <SettingsRow
        title='Auto-Updating Preview'
        hint='If enabled, the preview panel updates automatically as you code. If
        disabled, use the "Run" button to update.'
      >
        <Switch
          checked={autoUpdate}
          onChange={() => setAutoUpdate(!autoUpdate)}
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
