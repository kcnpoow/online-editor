import { useState } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import cn from 'classnames';

import { Tab } from './Tab';
import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import { useEditor } from '@pages/edit/model/EditorContext';
import { EditorField } from '@pages/edit/model/types';

type Props = { output: string };

export const Editor = ({ output }: Props) => {
  const {
    htmlCode,
    cssCode,
    jsCode,
    setHtmlCode,
    setCssCode,
    setJsCode,
  } = useEditor();

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
              field='html'
              language={html()}
              value={htmlCode}
              onChange={(text) => setHtmlCode(text)}
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
              value={cssCode}
              onChange={(text) => setCssCode(text)}
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
              value={jsCode}
              onChange={(text) => setJsCode(text)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className={cn('bg-white', { 'max-md:hidden': !isResultActive })}>
        <iframe
          width='100%'
          height='100%'
          srcDoc={output}
          sandbox='allow-scripts'
          title='output'
        />
      </Panel>
    </PanelGroup>
  );
};
