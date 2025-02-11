import { html } from '@codemirror/lang-html';

import { CodeEditor } from '@shared/ui/CodeEditor';
import { useEdit } from '@shared/hooks/useEdit';

export const htmlEditor = () => {
  const { editorState, onEditorStateChange } = useEdit();

  return (
    <CodeEditor
      title='HTML'
      language={html()}
      value={editorState.html}
      onChange={(value: string) => onEditorStateChange('html', value)}
    />
  );
};
