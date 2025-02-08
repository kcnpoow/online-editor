import { Button } from '@shared/ui/Button';

type Props = {
  onExecute: () => void;
  onSettingsOpen: () => void;
};

export const Header = ({ onExecute, onSettingsOpen }: Props) => {
  return (
    <header className='flex items-center justify-between p-2 border-b-2 border-tertiary'>
      <span className='text-xl font-semibold'>Untitled</span>

      <div className='flex gap-x-2'>
        <Button variant='secondary' onClick={onSettingsOpen}>
          Settings
        </Button>

        <Button variant='primary' onClick={onExecute}>
          Run
        </Button>
      </div>
    </header>
  );
};
