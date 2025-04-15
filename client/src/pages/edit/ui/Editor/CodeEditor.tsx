import { useMemo, useRef, useCallback } from 'react';
import ReactCodeMirror, {
  Extension,
  EditorView,
  Statistics,
  SelectionRange,
} from '@uiw/react-codemirror';
import cn from 'classnames';

import { EditorField } from '@pages/edit/model/types';
import { useSettings } from '@pages/edit/model/SettingsContext';
import { useCollab } from '@pages/edit/model/CollabContext';
import { remoteCursorExtension } from '@pages/edit/lib/remoteCursorExtension';
import { socket } from '@shared/config/socket';

type Props = {
  value: string;
  field: EditorField;
  language: Extension;
  onChange: (text: string) => void;
};

export const CodeEditor = ({ field, language, value, onChange }: Props) => {
  const { collabMode } = useSettings();
  const { roomId, cursors } = useCollab();
  const isFocusedRef = useRef(false);

  const filteredCursors = useMemo(
    () => cursors.filter((c) => c.field === field),
    [cursors, field]
  );

  const lastSelection = useRef<SelectionRange | null>(null);

  const extensions = useMemo(
    () => [
      language,
      EditorView.lineWrapping,
      remoteCursorExtension(filteredCursors),
    ],
    [filteredCursors, language, isFocusedRef.current]
  );

  const handleStatistics = useCallback(
    (data: Statistics) => {
      const newSelection = data.selectionAsSingle;

      const hasSelectionChanged =
        !lastSelection.current ||
        newSelection?.anchor !== lastSelection.current.anchor ||
        newSelection?.head !== lastSelection.current.head;

      if (
        isFocusedRef.current &&
        collabMode &&
        roomId &&
        newSelection &&
        hasSelectionChanged
      ) {
        socket.emit('cursor-move', roomId, {
          user: socket.id,
          selection: newSelection,
          field,
          color: 'blue',
        });

        lastSelection.current = newSelection;
      }
    },
    [collabMode, roomId, field]
  );

  return (
    <div className={cn('flex flex-col h-full [&_.cm-editor]:h-full')}>
      <div className='max-w-fit px-3 py-1 font-semibold bg-[#292C33] max-md:hidden'>
        {field.toUpperCase()}
      </div>

      <ReactCodeMirror
        className='flex-auto h-full'
        theme='dark'
        extensions={extensions}
        value={value}
        onFocus={() => {
          isFocusedRef.current = true;
        }}
        onBlur={() => {
          isFocusedRef.current = false;
        }}
        onChange={onChange}
        onStatistics={handleStatistics}
      />
    </div>
  );
};
