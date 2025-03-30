import { ReactNode } from 'react';
import ReactCodeMirror, { Extension } from '@uiw/react-codemirror';
import cn from 'classnames';

type Props = {
  title: ReactNode;
  language: Extension;
  onChange: (value: string) => void;
  value: string;
};

export const CodeEditor = ({ title, language, value, onChange }: Props) => {
  return (
    <div className={cn('flex flex-col h-full [&_.cm-editor]:h-full')}>
      <div className='max-w-fit px-3 py-1 font-semibold bg-[#292C33] max-md:hidden'>
        {title}
      </div>

      <div className='flex-auto overflow-auto'>
        <ReactCodeMirror
          className='flex-auto h-full'
          theme='dark'
          extensions={[language]}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
