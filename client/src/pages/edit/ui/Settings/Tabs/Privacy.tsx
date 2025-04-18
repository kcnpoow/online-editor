import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';
import { useSettings } from '@pages/edit/model/SettingsContext';

export const Privacy = () => {
  const { privateMode } = useSettings();

  return (
    <section>
      <SettingsRow
        title='Direct Link Access'
        hint='If this option is enabled, users can access the content only through a direct link, ensuring it remains hidden from others without the URL.'
      >
        <Switch checked={privateMode} />
      </SettingsRow>
    </section>
  );
};
