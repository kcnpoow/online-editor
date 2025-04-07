import { createContext, ReactNode, useState } from 'react';

import { generateOutput } from '../lib/generateOutput';

export type EditorStateFields = 'html' | 'css' | 'js';
type EditorState = Record<EditorStateFields, string> & {
  output: string;
  autoUpdate: boolean;
  private: boolean;
  collabMode: boolean;
  collabId?: string;
  connectedUsers: string[];
};

export type EditContextValues = {
  editorState: EditorState;
  onEditorStateChange: <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => void;
  onExecute: () => void;
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
    autoUpdate: false,
    private: false,
    collabMode: false,
    collabId: undefined,
    connectedUsers: [],
  });

  const handleEditorStateChange = <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => {
    setEditorState((prevState) => {
      const newState = { ...prevState, [field]: value };

      if (editorState.autoUpdate) {
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

  return (
    <EditContext.Provider
      value={{
        editorState,
        onEditorStateChange: handleEditorStateChange,
        onExecute: handleExecute,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export type EditorTabs = 'html' | 'css' | 'js';
export type SettingsTabs = 'behavior' | 'privacy' | 'collab';
