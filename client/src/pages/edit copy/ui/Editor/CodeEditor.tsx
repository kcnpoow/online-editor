import { useState, useMemo, useRef } from 'react';
import ReactCodeMirror, {
  Extension,
  Statistics,
  EditorView,
  SelectionRange,
} from '@uiw/react-codemirror';
import cn from 'classnames';

import { remoteCursorExtension } from '@pages/edit/lib/remoteCursorExtension';
import { useEdit } from '@pages/edit/lib/useEdit';
import { socket } from '@shared/config/socket';
import { useDebounce } from '@shared/hooks/useDebounce';

type Props = {
  value: string;
  field: string;
  language: Extension;
  onChange: (text: string) => void;
};

export const CodeEditor = ({ field, language, value, onChange }: Props) => {
  const { editorState } = useEdit();
  const [isFocused, setIsFocused] = useState(false);

  const filteredCursors = useMemo(
    () => editorState.collab.cursors.filter((c) => c.field === field),
    [editorState.collab.cursors, field]
  );

  const extensions = useMemo(
    () => [
      language,
      EditorView.lineWrapping,
      remoteCursorExtension(filteredCursors),
    ],
    [filteredCursors]
  );

  const lastSelection = useRef<SelectionRange | null>(null);

  const handleStatistics = (data: Statistics) => {
    console.log(data);
    const newSelection = data.selectionAsSingle;

    if (
      editorState.settings.collabMode &&
      editorState.collab.roomId &&
      newSelection !== lastSelection.current
    ) {
      lastSelection.current = newSelection;

      socket.emit('cursor-move', editorState.collab.roomId, {
        user: socket.id,
        selection: data.selectionAsSingle,
        field,
        color: 'blue',
      });
    }
  };

  const emitChange = useDebounce((text: string) => {
    socket.emit('text-change', editorState.collab.roomId, field, text);
  }, 300);

  const handleChange = (text: string) => {
    if (
      isFocused &&
      editorState.settings.collabMode &&
      editorState.collab.roomId
    ) {
      emitChange(text);
    } else {
      onChange(text);
    }
  };

  return (
    <div className={cn('flex flex-col h-full [&_.cm-editor]:h-full')}>
      <div className='max-w-fit px-3 py-1 font-semibold bg-[#292C33] max-md:hidden'>
        {field.toUpperCase()}
      </div>

      <div className='flex-auto overflow-auto'>
        <ReactCodeMirror
          key={field}
          className='flex-auto h-full'
          theme='dark'
          extensions={extensions}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onStatistics={handleStatistics}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
