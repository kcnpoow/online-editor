import { FaPen } from 'react-icons/fa';

import { useSettings } from '@pages/edit/model/SettingsContext';
import { Button } from '@shared/ui/Button';

type Props = {
  onExecute: () => void;
  onSettingsOpen: () => void;
};

export const Header = ({ onExecute, onSettingsOpen }: Props) => {
  const { settingsValues, setSettingsValue } = useSettings();

  return (
    <header className='flex items-center gap-x-2 p-2 border-b-1 border-tertiary'>
      <div className='relative mr-auto'>
        <input
          className='w-full text-xl pl-7 font-semibold'
          value={settingsValues.draftName}
          onChange={(e) => setSettingsValue('draftName', e.target.value)}
          onBlur={() =>
            setSettingsValue(
              'draftName',
              settingsValues.draftName ? settingsValues.draftName : 'Untitled'
            )
          }
        />
        <FaPen className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none' />
      </div>

      {!settingsValues.autoUpdate && (
        <Button color='tertiary' onClick={onExecute}>
          Run
        </Button>
      )}

      <Button color='tertiary' onClick={onSettingsOpen}>
        Settings
      </Button>
    </header>
  );
};
