import { createContext, ReactNode, useCallback, useState } from 'react';

import { Cursor } from './types';
import { generateOutput } from '../lib/generateOutput';

type CodeState = {
  html: string;
  css: string;
  js: string;
  output: string;
};

type SettingsState = {
  autoUpdate: boolean;
  private: boolean;
  collabMode: boolean;
};

type CollabState = {
  roomId?: string;
  connectedUsers: string[];
  cursors: Cursor[];
};

type EditorState = {
  code: CodeState;
  settings: SettingsState;
  collab: CollabState;
};

export type EditContextValues = {
  editorState: EditorState;
  onEditorStateChange: <
    K1 extends keyof EditorState,
    K2 extends keyof EditorState[K1]
  >(
    section: K1,
    field: K2,
    value: EditorState[K1][K2]
  ) => void;
  onExecute: () => void;
};

type Props = { children: ReactNode };

export const EditContext = createContext<EditContextValues>(
  {} as EditContextValues
);

export const EditProvider = ({ children }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>({
    code: { html: '', css: '', js: '', output: '' },
    settings: { autoUpdate: false, private: false, collabMode: false },
    collab: {
      roomId: undefined,
      connectedUsers: [],
      cursors: [],
    },
  });

  const handleEditorStateChange = useCallback(
    <K1 extends keyof EditorState, K2 extends keyof EditorState[K1]>(
      section: K1,
      field: K2,
      value:
        | EditorState[K1][K2]
        | ((prev: EditorState[K1][K2]) => EditorState[K1][K2])
    ) => {
      setEditorState((prevState) => {
        const updatedValue =
          typeof value === 'function'
            ? (value as Function)(prevState[section][field])
            : value;

        const newSection = { ...prevState[section], [field]: updatedValue };
        const newState = { ...prevState, [section]: newSection };

        if (section === 'code' && prevState.settings.autoUpdate) {
          newState.code.output = generateOutput(
            newState.code.html,
            newState.code.css,
            newState.code.js
          );
        }

        return newState;
      });
    },
    []
  );

  const handleExecute = () => {
    const output = generateOutput(
      editorState.code.html,
      editorState.code.css,
      editorState.code.js
    );

    handleEditorStateChange('code', 'output', output);
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
