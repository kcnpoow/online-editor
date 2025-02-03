import { useState } from 'react';

import { Header } from './Header';
import { Editor } from '@widgets/editor';

export const Edit = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [output, setOutput] = useState('');

  const handleExecute = () => {
    const output = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    setOutput(output);
  };

  return (
    <div className='flex flex-col h-screen text-white bg-black'>
      <Header onExecute={handleExecute} />

      <Editor output={output} onHtmlChange={setHtml} onCssChange={setCss} onJsChange={setJs} />
    </div>
  );
};
