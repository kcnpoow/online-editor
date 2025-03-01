import { Button } from '@shared/ui/Button';
import { useEdit } from '@shared/hooks/useEdit';

type Props = {
  onSettingsOpen: () => void;
};

export const Header = ({ onSettingsOpen }: Props) => {
  const { onExecute, editorSettings } = useEdit();

  return (
    <header className='flex items-center justify-between p-2 border-b-2 border-tertiary'>
      <span className='text-xl font-semibold'>Untitled</span>

      <div className='flex gap-x-2'>
        {!editorSettings.autoUpdate && (
          <Button color='tertiary' onClick={onExecute} adaptive>
            Run
          </Button>
        )}

        <Button color='tertiary' onClick={onSettingsOpen} adaptive>
          Settings
        </Button>
      </div>
    </header>
  );
};
