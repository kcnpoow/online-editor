import { SelectionRange } from '@uiw/react-codemirror';
import { Doc } from '@automerge/automerge';

export type EditorField = 'html' | 'css' | 'js';

export type Cursor = {
  user: string;
  color: string;
  field: EditorField;
  selection: SelectionRange;
};

export type AutomergeDoc = {
  html: string;
  css: string;
  js: string;
};

export type Room = {
  users: string[];
  cursors: Cursor[];
  doc: Doc<AutomergeDoc>;
};
