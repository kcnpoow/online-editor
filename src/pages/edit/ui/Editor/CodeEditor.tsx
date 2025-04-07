import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';
import cn from 'classnames';

import { useEdit } from '@pages/edit/lib/useEdit';
import { socket } from '@shared/config/socket';

type Props = {
  value: string;
  field: string;
  language: Extension;
  onChange: (value: string) => void;
};

export const CodeEditor = ({ field, language, value, onChange }: Props) => {
  const { editorState } = useEdit();

  const handleTextChange = (value: string) => {
    onChange(value);

    if (editorState.collabId) {
      socket.emit('text-change', {
        roomId: editorState.collabId,
        text: value,
        field,
      });
    }
  };

  return (
    <div className={cn('flex flex-col h-full [&_.cm-editor]:h-full')}>
      <div className='max-w-fit px-3 py-1 font-semibold bg-[#292C33] max-md:hidden'>
        {field.toUpperCase()}
      </div>

      <div className='flex-auto overflow-auto'>
        <ReactCodeMirror
          className='flex-auto h-full'
          theme='dark'
          extensions={[language]}
          value={value}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};
