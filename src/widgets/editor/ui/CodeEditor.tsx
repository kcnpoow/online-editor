import { ReactNode } from 'react';
import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';

type Props = {
  header: ReactNode;
  language: Extension;
  onChange: (value: string) => void;
};

export const CodeEditor = ({ header, language, onChange }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='max-w-fit px-3 py-1 font-semibold bg-[#292C33]'>
        {header}
      </div>

      <div className='flex-auto overflow-auto'>
        <ReactCodeMirror
          className='flex-auto h-full'
          theme='dark'
          extensions={[language]}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
