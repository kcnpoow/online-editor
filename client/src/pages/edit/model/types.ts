import { SelectionRange } from '@uiw/react-codemirror';

export enum SettingsTab {
  Behavior,
  Privacy,
  Collab,
}

export type EditorField = 'html' | 'css' | 'js';

export type Cursor = {
  user: string;
  field: EditorField;
  selection?: SelectionRange;
  color?: string;
};
