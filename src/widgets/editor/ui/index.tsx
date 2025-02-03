import { PanelGroup, Panel } from 'react-resizable-panels';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';

import { CustomPanelResizeHandle } from './CustomPanelResizeHandle';
import { CodeEditor } from './CodeEditor';
import { Output } from './Output';
import './style.css';

type Props = {
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
  output: string;
};

export const Editor = ({
  output,
  onHtmlChange,
  onCssChange,
  onJsChange,
}: Props) => {
  return (
    <PanelGroup direction='vertical'>
      <Panel minSize={30}>
        <PanelGroup direction='horizontal'>
          <Panel minSize={5}>
            <CodeEditor
              header='HTML'
              language={html()}
              onChange={onHtmlChange}
            />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={5}>
            <CodeEditor header='CSS' language={css()} onChange={onCssChange} />
          </Panel>

          <CustomPanelResizeHandle direction='vertical' />

          <Panel minSize={5}>
            <CodeEditor
              header='JS'
              language={javascript()}
              onChange={onJsChange}
            />
          </Panel>
        </PanelGroup>
      </Panel>

    <CustomPanelResizeHandle direction='horizontal' />

      <Panel className='bg-white'>
        <Output code={output} />
      </Panel>
    </PanelGroup>
  );
};
