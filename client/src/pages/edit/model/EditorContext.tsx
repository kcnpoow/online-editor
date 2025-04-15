import { createContext, useContext, useState, ReactNode } from 'react';

type EditorContextValue = {
  htmlCode: string;
  setHtmlCode: (value: string) => void;

  cssCode: string;
  setCssCode: (value: string) => void;

  jsCode: string;
  setJsCode: (value: string) => void;
};

const EditorContext = createContext<EditorContextValue>(
  {} as EditorContextValue
);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  return (
    <EditorContext.Provider
      value={{
        htmlCode,
        setHtmlCode,
        cssCode,
        setCssCode,
        jsCode,
        setJsCode,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
