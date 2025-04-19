import { SelectionRange } from '@uiw/react-codemirror';

export type EditorField = 'html' | 'css' | 'js';
export type SettingsTab = 'behavior' | 'privacy' | 'collab';
export type Cursor = {
  user: string;
  field: EditorField;
  selection: SelectionRange;
  color?: string;
};
export type AutomergeDoc = {
  html: string;
  css: string;
  js: string;
};
