import { Extension } from '@uiw/react-codemirror';

import { EditorField } from '@shared/types/types';

export type Editor = {
  field: EditorField;
  value: string;
  extension: Extension;
};
