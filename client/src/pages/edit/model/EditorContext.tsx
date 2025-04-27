import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Draft, draftApi } from '@entities/draft';
import { useAuth } from '@shared/hooks/useAuth';
import { generateOutput } from '@shared/lib/generateOutput';

type EditorState = {
  draftInfo: Draft | null;
  projectName: string;
  privateFlag: boolean;
  html: string;
  css: string;
  js: string;
  output: string;
  screenshot: string;
};

type EditorContextValue = {
  editorValues: EditorState;
  setEditorValue: <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => void;
  handleExecute: () => void;
  handleSave: (overrideValues?: Partial<EditorState>) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [editorValues, setEditorValues] = useState<EditorState>({
    draftInfo: null,
    projectName: 'Untitled',
    privateFlag: false,
    html: '',
    css: '',
    js: '',
    output: '',
    screenshot: '',
  });

  const navigate = useNavigate();

  const setEditorValue = <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => {
    setEditorValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleExecute = () => {
    const output = generateOutput(
      editorValues.html,
      editorValues.css,
      editorValues.js
    );

    setEditorValue('output', output);
  };

  const handleSave = async (overrideValues?: Partial<EditorState>) => {
    if (!user) {
      return navigate('/signin');
    }

    const currentValues = {
      ...editorValues,
      ...overrideValues,
    };

    const { draftInfo, projectName, privateFlag, html, css, js } =
      currentValues;

    const draft = {
      user,
      projectName,
      privateFlag,
      html,
      css,
      js,
    };

    let result: Draft;
    if (draftInfo && draftInfo.id) {
      result = await draftApi.updateDraft(draftInfo.id, draft);
    } else {
      result = await draftApi.createDraft(draft);
    }

    console.log(result);

    setEditorValue('draftInfo', result);
  };

  return (
    <EditorContext.Provider
      value={{ editorValues, setEditorValue, handleExecute, handleSave }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }

  return context;
};
