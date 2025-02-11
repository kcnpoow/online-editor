import { PanelGroup, Panel } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';

import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from '@shared/ui/CodeEditor';
import { useEdit } from '@shared/hooks/useEdit';

export const Editor = () => {
  const { editorState, onEditorStateChange } = useEdit();

  return (
    <PanelGroup direction='vertical' className='[&_.cm-editor]:h-full'>
      <Panel minSize={30}>
        <PanelGroup direction='horizontal'>
          <Panel minSize={10}>
            <CodeEditor
              title='HTML'
              language={html()}
              value={editorState.html}
              onChange={(value: string) => onEditorStateChange('html', value)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={10}>
            <CodeEditor
              title='CSS'
              language={css()}
              value={editorState.css}
              onChange={(value: string) => onEditorStateChange('css', value)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={10}>
            <CodeEditor
              title='JS'
              language={javascript()}
              value={editorState.js}
              onChange={(value: string) => onEditorStateChange('js', value)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className='bg-white'>
        <iframe width='100%' height='100%' srcDoc={editorState.output} />
      </Panel>
    </PanelGroup>
  );
};
