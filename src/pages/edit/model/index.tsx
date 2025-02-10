import { createContext, ReactNode, useState } from 'react';

import { generateOutput } from '../lib';

type EditorStateFields = 'html' | 'css' | 'js';
type EditorState = Record<EditorStateFields, string> & { output: string };

type EditorSettings = {
  autoUpdate: boolean;
};

export type EditContextValues = {
  editorState: EditorState;
  editorSettings: EditorSettings;
  onEditorStateChange: (field: EditorStateFields, value: string) => void;
  onExecute: () => void;
  onEditorSettingsChange: <K extends keyof EditorSettings>(
    field: K,
    value: EditorSettings[K]
  ) => void;
};

type Props = { children: ReactNode };

export const EditContext = createContext<EditContextValues>(
  {} as EditContextValues
);

export const EditProvider = ({ children }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>({
    html: '',
    css: '',
    js: '',
    output: '',
  });

  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    autoUpdate: true,
  });

  const handleEditorStateChange = (field: EditorStateFields, value: string) => {
    setEditorState((prevState) => {
      const newState = { ...prevState, [field]: value };

      if (editorSettings.autoUpdate) {
        newState.output = generateOutput(
          newState.html,
          newState.css,
          newState.js
        );
      }

      return newState;
    });
  };

  const handleExecute = () => {
    setEditorState((prevState) => ({
      ...prevState,
      output: generateOutput(prevState.html, prevState.css, prevState.js),
    }));
  };

  const handleEditorSettingsChange = <K extends keyof EditorSettings>(
    field: K,
    value: EditorSettings[K]
  ) => {
    setEditorSettings((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <EditContext.Provider
      value={{
        editorState,
        editorSettings,
        onEditorStateChange: handleEditorStateChange,
        onExecute: handleExecute,
        onEditorSettingsChange: handleEditorSettingsChange,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
