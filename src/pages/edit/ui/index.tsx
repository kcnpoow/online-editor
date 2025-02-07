import { useState, useCallback } from 'react';

import { Header } from './Header';
import { Settings } from './Settings';
import { Editor } from './Editor';
import { generateOutput } from '../lib';

export const Edit = () => {
  const [editorState, setEditorState] = useState({
    html: '',
    css: '',
    js: '',
    output: '',
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const handleChange = (field: string, value: string) => {
    setEditorState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleExecute = useCallback(() => {
    const output = generateOutput(
      editorState.html,
      editorState.css,
      editorState.js
    );

    setEditorState((prevState) => ({ ...prevState, output }));
  }, [editorState.html, editorState.css, editorState.js]);

  return (
    <div className='flex flex-col h-screen text-white bg-black'>
      <Settings
        isSettingsOpen={isSettingsOpen}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />

      <Header
        onExecute={handleExecute}
        onSettingsOpen={() => setIsSettingsOpen(true)}
      />

      <Editor
        html={editorState.html}
        css={editorState.css}
        js={editorState.js}
        onHtmlChange={(value) => handleChange('html', value)}
        onCssChange={(value) => handleChange('css', value)}
        onJsChange={(value) => handleChange('js', value)}
        output={editorState.output}
      />
    </div>
  );
};
