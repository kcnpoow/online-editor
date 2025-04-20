import { createContext, useContext, useState, ReactNode } from 'react';

type EditorState = {
  html: string;
  css: string;
  js: string;
  output: string;
};

type EditorContextValue = {
  editorValues: EditorState;
  setEditorValue: <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [editorValues, setEditorValues] = useState<EditorState>({
    html: '',
    css: '',
    js: '',
    output: '',
  });

  const setEditorValue = <K extends keyof EditorState>(
    field: K,
    value: EditorState[K]
  ) => {
    setEditorValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <EditorContext.Provider value={{ editorValues, setEditorValue }}>
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
