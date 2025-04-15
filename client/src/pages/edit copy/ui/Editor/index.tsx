import { useState } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import cn from 'classnames';

import { Tab } from './Tab';
import { EditorField } from '@pages/edit/model/types';
import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import { useEdit } from '@pages/edit/lib/useEdit';

export const Editor = () => {
  const { editorState, onEditorStateChange } = useEdit();
  // Mobile version states
  const [isResultActive, setIsResultActive] = useState(true);
  const [currentEditor, setCurrentEditor] = useState<EditorField>('html');

  return (
    <PanelGroup direction='vertical'>
      <ul className='flex gap-x-0.5 px-2 pt-2 md:hidden'>
        <Tab
          onClick={() => setCurrentEditor('html')}
          isActive={currentEditor === 'html'}
        >
          HTML
        </Tab>
        <Tab
          onClick={() => setCurrentEditor('css')}
          isActive={currentEditor === 'css'}
        >
          CSS
        </Tab>
        <Tab
          onClick={() => setCurrentEditor('js')}
          isActive={currentEditor === 'js'}
        >
          JS
        </Tab>
        <Tab
          onClick={() => setIsResultActive((prevState) => !prevState)}
          isActive={isResultActive}
        >
          Result
        </Tab>
      </ul>

      <Panel minSize={30}>
        <PanelGroup direction='horizontal'>
          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'html' })}
            minSize={10}
          >
            <CodeEditor
              key={currentEditor}
              field='html'
              language={html()}
              value={editorState.code.html}
              onChange={(text) => onEditorStateChange('code', 'html', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'css' })}
            minSize={10}
          >
            <CodeEditor
              key={currentEditor}
              field='css'
              language={css()}
              value={editorState.code.css}
              onChange={(text) => onEditorStateChange('code', 'css', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'js' })}
            minSize={10}
          >
            <CodeEditor
              key={currentEditor}
              field='js'
              language={javascript()}
              value={editorState.code.js}
              onChange={(text) => onEditorStateChange('code', 'js', text)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className={cn('bg-white', { 'max-md:hidden': !isResultActive })}>
        <iframe
          width='100%'
          height='100%'
          srcDoc={editorState.code.output}
          sandbox='allow-scripts'
          title='output'
        />
      </Panel>
    </PanelGroup>
  );
};
