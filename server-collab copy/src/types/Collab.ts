import { SelectionRange } from '@uiw/react-codemirror';

export type EditorField = 'html' | 'css' | 'js';

export type Editor = {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
};

export type Cursor = {
  user: string;
  field: EditorField;
  selection: SelectionRange;
  color?: string;
};

export type Room = {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  cursors: { [userId: string]: Cursor };
  users: string[];
};
