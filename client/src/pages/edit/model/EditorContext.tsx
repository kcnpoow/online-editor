import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import * as automerge from 'automerge';

import { EditorField } from './types';
import { collabService } from '../api/CollabService';

type EditorContextValue = {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;

  css: string;
  setCss: Dispatch<SetStateAction<string>>;

  js: string;
  setJs: Dispatch<SetStateAction<string>>;

  handleDocumentChange: (
    roomId: string,
    field: EditorField,
    text: string
  ) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

let htmlDoc = automerge.init();
let cssDoc = automerge.init();
let jsDoc = automerge.init();

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  const handleDocumentChange = (
    roomId: string,
    field: EditorField,
    text: string
  ) => {
    let oldDoc: automerge.Doc<any>;
    let newDoc: automerge.Doc<any>;

    if (field === 'html') {
      oldDoc = htmlDoc;
      newDoc = automerge.change(oldDoc, 'edit html', (doc) => {
        doc.content = text;
      });
      htmlDoc = newDoc;
    } else if (field === 'css') {
      oldDoc = cssDoc;
      newDoc = automerge.change(oldDoc, 'edit css', (doc) => {
        doc.content = text;
      });
      cssDoc = newDoc;
    } else if (field === 'js') {
      oldDoc = jsDoc;
      newDoc = automerge.change(oldDoc, 'edit js', (doc) => {
        doc.content = text;
      });
      jsDoc = newDoc;
    } else {
      return;
    }

    const changes = automerge.getChanges(oldDoc, newDoc);
    collabService.update(roomId, field, changes);
  };

  useEffect(() => {
    collabService.onUpdate(({ field, doc }) => {
      if (field === 'html') {
        console.log(htmlDoc, doc);

        htmlDoc = automerge.merge(html, doc);
      }
    });
  }, []);

  return (
    <EditorContext.Provider
      value={{ html, setHtml, css, setCss, js, setJs, handleDocumentChange }}
    >
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
