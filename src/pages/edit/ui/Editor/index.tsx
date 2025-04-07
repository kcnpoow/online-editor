import { useState } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import cn from 'classnames';

import { Tab } from './Tab';
import { EditorTabs } from '@pages/edit/model';
import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import { useEdit } from '@pages/edit/lib/useEdit';

export const Editor = () => {
  const [currentEditor, setCurrentEditor] = useState<EditorTabs>('html');
  const [isResultActive, setIsResultActive] = useState(true);
  const { editorState, onEditorStateChange } = useEdit();

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
              field='html'
              language={html()}
              value={editorState.html}
              onChange={(value: string) => onEditorStateChange('html', value)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'css' })}
            minSize={10}
          >
            <CodeEditor
              field='css'
              language={css()}
              value={editorState.css}
              onChange={(value: string) => onEditorStateChange('css', value)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'js' })}
            minSize={10}
          >
            <CodeEditor
              field='js'
              language={javascript()}
              value={editorState.js}
              onChange={(value: string) => onEditorStateChange('js', value)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className={cn('bg-white', { 'max-md:hidden': !isResultActive })}>
        <iframe width='100%' height='100%' srcDoc={editorState.output} />
      </Panel>
    </PanelGroup>
  );
};
