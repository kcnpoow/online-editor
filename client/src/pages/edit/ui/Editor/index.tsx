import { useMemo, useState } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { html as htmlExt } from '@codemirror/lang-html';
import { css as cssExt } from '@codemirror/lang-css';
import { javascript as jsExt } from '@codemirror/lang-javascript';
import cn from 'classnames';
import { Tab } from './Tab';
import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import { useCollab } from '@pages/edit/model/CollabContext';
import { EditorField } from '@pages/edit/model/types';
import { useEditor } from '@pages/edit/model/EditorContext';

export const Editor = () => {
  const { html, css, js, handleDocumentChange } = useEditor();
  const { roomId, setCursors } = useCollab();

  // Mobile version states
  const [isResultActive, setIsResultActive] = useState(true);
  const [currentEditor, setCurrentEditor] = useState<EditorField>('html');

  const htmlLang = useMemo(() => htmlExt(), []);
  const cssLang = useMemo(() => cssExt(), []);
  const jsLang = useMemo(() => jsExt(), []);

  const handlePanelResize = () => {
    setCursors([]); // reset cursors on resize
  };

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
            onResize={handlePanelResize}
          >
            <CodeEditor
              field='html'
              language={htmlLang}
              value={html}
              onChange={(text) => handleDocumentChange(roomId, 'html', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'css' })}
            minSize={10}
            onResize={handlePanelResize}
          >
            <CodeEditor
              field='css'
              language={cssLang}
              value={css}
              onChange={(text) => handleDocumentChange(roomId, 'css', text)}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel
            className={cn({ 'max-md:hidden': currentEditor !== 'js' })}
            minSize={10}
            onResize={handlePanelResize}
          >
            <CodeEditor
              field='js'
              language={jsLang}
              value={js}
              onChange={(text) => handleDocumentChange(roomId, 'js', text)}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel
        className={cn('bg-white', { 'max-md:hidden': !isResultActive })}
        onResize={handlePanelResize}
      >
        <iframe
          width='100%'
          height='100%'
          sandbox='allow-scripts'
          title='output'
          srcDoc={''}
        />
      </Panel>
    </PanelGroup>
  );
};
