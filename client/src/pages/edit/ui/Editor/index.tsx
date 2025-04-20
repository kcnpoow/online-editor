import { useMemo, useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import cn from 'classnames';

import { Tab } from './Tab';
import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { TextEditor } from './TextEditor';
import { useEditor } from '@pages/edit/model/EditorContext';
import { EditorField } from '@pages/edit/model/types';

export const Editor = () => {
  const [isResultActive, setIsResultActive] = useState(true);
  const [currentEditor, setCurrentEditor] = useState<EditorField>('html');

  const { editorValues, setEditorValue } = useEditor();

  const htmlLang = useMemo(() => html(), []);
  const cssLang = useMemo(() => css(), []);
  const jsLang = useMemo(() => javascript(), []);

  return (
    <PanelGroup direction='vertical'>
      {/* Mobile version menu */}
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
            <TextEditor
              field='html'
              value={editorValues.html}
              language={htmlLang}
              onChange={(text) => setEditorValue('html', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'css' })}
            minSize={10}
          >
            <TextEditor
              field='css'
              value={editorValues.css}
              language={cssLang}
              onChange={(text) => setEditorValue('css', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'js' })}
            minSize={10}
          >
            <TextEditor
              field='js'
              value={editorValues.js}
              language={jsLang}
              onChange={(text) => setEditorValue('js', text)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className={cn('bg-white', { 'max-md:hidden': !isResultActive })}>
        <iframe
          width='100%'
          height='100%'
          sandbox='allow-scripts'
          title='output'
          srcDoc={editorValues.output}
        />
      </Panel>
    </PanelGroup>
  );
};
