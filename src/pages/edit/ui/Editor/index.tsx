import { PanelGroup, Panel } from 'react-resizable-panels';
import { html as htmlLang } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { javascript as javascriptLang } from '@codemirror/lang-javascript';

import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import './style.css';

type Props = {
  html: string;
  css: string;
  js: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
  output: string;
};

export const Editor = ({
  html,
  css,
  js,
  onHtmlChange,
  onCssChange,
  onJsChange,
  output,
}: Props) => {
  return (
    <PanelGroup direction='vertical'>
      <Panel minSize={30}>
        <PanelGroup direction='horizontal'>
          <Panel minSize={10}>
            <CodeEditor
              title='HTML'
              language={htmlLang()}
              value={html}
              onChange={onHtmlChange}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={10}>
            <CodeEditor
              title='CSS'
              language={cssLang()}
              value={css}
              onChange={onCssChange}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={10}>
            <CodeEditor
              title='JS'
              language={javascriptLang()}
              value={js}
              onChange={onJsChange}
            />
          </Panel>
        </PanelGroup>
      </Panel>

      <CustomPanelResizeHandle direction='horizontal' />

      <Panel className='bg-white'>
        <iframe width='100%' height='100%' srcDoc={output} />
      </Panel>
    </PanelGroup>
  );
};
