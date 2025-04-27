import { SelectionRange } from '@uiw/react-codemirror';
import * as Y from 'yjs';

export type EditorField = 'html' | 'css' | 'js';

export type Cursor = {
  user: string;
  field: EditorField;
  selection?: SelectionRange;
  color?: string;
};

export type Room = {
  creator: string;
  connectedUsers: string[];
  cursors: Record<string, Cursor>;
  doc: Y.Doc;
  colors: Record<string, string>;
};
