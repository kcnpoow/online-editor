import { useMemo, useRef, useState } from 'react';
import ReactCodeMirror, {
  EditorView,
  Extension,
  SelectionRange,
  Statistics,
} from '@uiw/react-codemirror';

import { EditorField } from '@pages/edit/model/types';
import { useCollab } from '@pages/edit/model/CollabContext';
import { socket } from '@shared/config/socket';
import { createCursorPlugin } from '@pages/edit/lib/createCursorPlugin';

type Props = {
  field: EditorField;
  value: string;
  language: Extension;
  onChange: (value: string) => void;
};

export const TextEditor = ({ field, value, language, onChange }: Props) => {
  const [isFocusing, setIsFocusing] = useState(false);

  const { collabValues, setCollabValue } = useCollab();

  const editorRef = useRef<EditorView | null>(null);
  const lastSelectionRef = useRef<SelectionRange | null>(null);

  const handleStatistics = (data: Statistics) => {
    const newSelection = data.selectionAsSingle;

    // TODO: Change socket.id to user id
    if (isFocusing && newSelection !== lastSelectionRef.current && socket.id) {
      setCollabValue('userCursor', {
        user: socket.id,
        field,
        selection: newSelection,
      });

      lastSelectionRef.current = newSelection;
    }
  };

  const cursorPlugin = useMemo(
    () =>
      createCursorPlugin(
        collabValues.cursors.filter((c) => socket.id !== c.user),
        field
      ),
    [collabValues.cursors]
  );

  const handleCreateEditor = (view: EditorView) => {
    editorRef.current = view;
  };

  const handleBlur = () => {
    if (socket.id) {
      setCollabValue('userCursor', {
        user: socket.id,
        field,
      });
    }

    setIsFocusing(false);
  };

  const extensions = useMemo(
    () => [language, cursorPlugin],
    [language, cursorPlugin]
  );

  return (
    <div className='flex flex-col h-full'>
      <span className='max-w-fit px-3 py-1 font-semibold uppercase bg-[#292C33] max-md:hidden border-t-2 border-[#3d3f47]'>
        {field}
      </span>

      <div className='flex-1 overflow-auto'>
        <ReactCodeMirror
          className='h-full [&_.cm-editor]:h-full [&_.cm-scroller]:pt-4'
          theme='dark'
          extensions={extensions}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocusing(true)}
          onBlur={handleBlur}
          onCreateEditor={handleCreateEditor}
          onStatistics={handleStatistics}
        />
      </div>
    </div>
  );
};
