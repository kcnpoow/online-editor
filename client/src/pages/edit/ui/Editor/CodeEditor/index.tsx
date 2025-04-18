import { useRef, useState } from 'react';
import ReactCodeMirror, {
  EditorView,
  Extension,
  SelectionRange,
  Statistics,
} from '@uiw/react-codemirror';

import { Cursor } from './Cursor';
import { socket } from '@shared/config/socket';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { EditorField } from '@pages/edit/model/types';
import { useDebounce } from '@shared/hooks/useDebounce';

type Props = {
  value: string;
  field: EditorField;
  language: Extension;
  onChange: (text: string) => void;
};

export const CodeEditor = ({ field, language, value, onChange }: Props) => {
  const { collabMode } = useSettings();
  const { roomId, cursors } = useCollab();
  const [isFocused, setIsFocused] = useState(false);

  const editorRef = useRef<EditorView | null>(null);
  const lastSelection = useRef<SelectionRange | null>(null);

  const handleCursorMove = useDebounce((data: Statistics) => {
    const newSelection = data.selectionAsSingle;

    if (
      isFocused &&
      collabMode &&
      roomId &&
      lastSelection.current !== newSelection
    ) {
      socket.emit('cursor-move', roomId, {
        field,
        selection: newSelection,
        user: socket.id,
        color: 'blue',
      });

      lastSelection.current = newSelection;
    }
  }, 300);

  const handleCreateEditor = (view: EditorView) => {
    editorRef.current = view;
  };

  return (
    <div className='flex flex-col h-full [&_.cm-editor]:h-full'>
      <span className='max-w-fit px-3 py-1 font-semibold uppercase bg-[#292C33] max-md:hidden'>
        {field}
      </span>

      <ReactCodeMirror
        className='flex-auto h-full'
        theme='dark'
        extensions={[language, EditorView.lineWrapping]}
        value={value}
        onChange={onChange}
        onCreateEditor={handleCreateEditor}
        onStatistics={(data) => handleCursorMove(data)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Render cursors */}
      {cursors.map((cursor) =>
        editorRef.current && field === cursor.field ? (
          <Cursor
            key={cursor.user}
            cursor={cursor}
            editorView={editorRef.current}
          />
        ) : null
      )}
    </div>
  );
};
