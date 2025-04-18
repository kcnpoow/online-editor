import { SelectionRange } from '@uiw/react-codemirror';
import { FreezeObject } from 'automerge';

export type EditorField = 'html' | 'css' | 'js';

export type Cursor = {
  user: string;
  color: string;
  field: EditorField;
  selection: SelectionRange;
};

export type Room = {
  users: string[];
  cursors: Cursor[];
  editors: Record<EditorField, FreezeObject<unknown>>;
};
