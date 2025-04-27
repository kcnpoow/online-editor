import { FaPen } from 'react-icons/fa';

import { useSettings } from '@pages/edit/model/SettingsContext';
import { Button } from '@shared/ui/Button';
import { useEditor } from '../model/EditorContext';

type Props = {
  onSettingsOpen: () => void;
};

export const Header = ({ onSettingsOpen }: Props) => {
  const { settingsValues } = useSettings();
  const { editorValues, setEditorValue, handleExecute, handleSave } =
    useEditor();

  return (
    <header className='flex items-center gap-x-2 p-2 border-b-1 border-tertiary'>
      <div className='relative mr-auto'>
        <input
          className='w-full text-xl pl-7 font-semibold'
          value={editorValues.projectName}
          onChange={(e) => setEditorValue('projectName', e.target.value)}
          onBlur={() =>
            setEditorValue(
              'projectName',
              editorValues.projectName ? editorValues.projectName : 'Untitled'
            )
          }
        />
        <FaPen className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none' />
      </div>

      {!settingsValues.autoUpdate && (
        <Button color='primary' onClick={handleExecute}>
          Run
        </Button>
      )}

      {!settingsValues.autoSave && (
        <Button color='tertiary' onClick={handleSave}>
          Save
        </Button>
      )}

      <Button color='tertiary' onClick={onSettingsOpen}>
        Settings
      </Button>
    </header>
  );
};
