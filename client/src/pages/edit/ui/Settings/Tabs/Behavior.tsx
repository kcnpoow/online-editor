import { useSettings } from '@pages/edit/model/SettingsContext';
import { SettingsArticle } from './SettingsArticle';
import { Switch } from '@shared/ui/Switch';

export const Behavior = () => {
  const { settingsValues, setSettingsValue } = useSettings();

  return (
    <section>
      <SettingsArticle
        title='Auto-Updating Preview'
        hint='If enabled, the preview panel updates automatically as you code. If
        disabled, use the "Run" button to update.'
      >
        <Switch
          checked={settingsValues.autoUpdate}
          onChange={() =>
            setSettingsValue('autoUpdate', !settingsValues.autoUpdate)
          }
        />
      </SettingsArticle>

      <SettingsArticle
        title='Auto Save'
        hint='If enabled, your changes will be automatically saved as you work. If disabled, you will need to manually save your progress.'
      >
        <Switch onChange={() => null} />
      </SettingsArticle>
    </section>
  );
};
