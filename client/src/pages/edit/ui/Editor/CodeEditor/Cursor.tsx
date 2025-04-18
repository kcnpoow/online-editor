import { EditorView } from '@codemirror/view';

import { Cursor as CursorType } from '@pages/edit/model/types';

type Props = {
  cursor: CursorType;
  editorView: EditorView;
};

export const Cursor = ({ cursor, editorView }: Props) => {
  const coords = editorView.coordsAtPos(cursor.selection.head);

  return (
    <div
      className='absolute z-10 opacity-90 pointer-events-none'
      style={{
        left: `${coords?.left}px`,
        top: `${coords?.top}px`,
      }}
    >
      <span className='block w-0.5 h-4 bg-pink-500 z-10' />

      <span className='absolute -top-6 px-2 bg-pink-500 whitespace-nowrap'>
        {cursor.user}
      </span>
    </div>
  );
};
