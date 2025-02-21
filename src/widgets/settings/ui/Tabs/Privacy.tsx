import { FaLock } from 'react-icons/fa';

import { SettingsRow } from './SettingsRow';
import { Switch } from '@shared/ui/Switch';
import { Input } from '@shared/ui/Input';
import { useEdit } from '@shared/hooks/useEdit';

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

        {editorSettings.isPrivate && (
          <Input
            value='localhost:8000'
            readOnly
            className='text-black bg-white'
            icon={<FaLock />}
          />
        )}
      </SettingsRow>
    </section>
  );
};
