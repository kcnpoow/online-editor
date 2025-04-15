import { SelectionRange } from '@uiw/react-codemirror';

export type EditorField = 'html' | 'css' | 'js';

export type Cursor = {
  user: string;
  field: EditorField;
  selection: SelectionRange;
  color?: string;
};

export type Room = {
  cursors: { [userId: string]: Cursor };
  users: string[];
};
