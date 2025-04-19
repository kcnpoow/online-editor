import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type EditorContextValue = {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;

  css: string;
  setCss: Dispatch<SetStateAction<string>>;

  js: string;
  setJs: Dispatch<SetStateAction<string>>;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  return (
    <EditorContext.Provider value={{ html, setHtml, css, setCss, js, setJs }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context)
    throw new Error(
      'useEditorCollab must be used within a EditorCollabProvider'
    );

  return context;
};
