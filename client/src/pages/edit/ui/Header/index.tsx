import { useSettings } from '@pages/edit/model/SettingsContext';
import { Button } from '@shared/ui/Button';

type Props = {
  onSettingsOpen: () => void;
  onExecute: () => void;
};

export const Header = ({ onSettingsOpen, onExecute }: Props) => {
  const { autoUpdate } = useSettings();

  return (
    <header className='flex items-center gap-x-2 p-2 border-b-1 border-tertiary'>
      <span className='mr-auto text-xl font-semibold'>Untitled</span>

      {!autoUpdate && (
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
