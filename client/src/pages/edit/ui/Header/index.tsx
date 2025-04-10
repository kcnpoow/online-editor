import { ConnectedUsers } from './ConnectedUser';
import { useEdit } from '@pages/edit/lib/useEdit';
import { Button } from '@shared/ui/Button';

type Props = {
  onSettingsOpen: () => void;
};

export const Header = ({ onSettingsOpen }: Props) => {
  const { onExecute, editorState } = useEdit();

  return (
    <header className='flex items-center gap-x-2 p-2 border-b-1 border-tertiary'>
      <span className='mr-auto text-xl font-semibold'>Untitled</span>

      {editorState.collabMode && (
        <ConnectedUsers connectedUsers={editorState.connectedUsers} />
      )}

      {!editorState.autoUpdate && (
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
