import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import ReactCodeMirror, { EditorView } from '@uiw/react-codemirror';
import { html as htmlLang } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { javascript as jsLang } from '@codemirror/lang-javascript';
import { FaHeart, FaEdit } from 'react-icons/fa';
import cn from 'classnames';

import { Editor } from '../model/types';
import { Draft } from '@entities/draft';
import { EditorTab } from '@shared/ui/EditorTab';
import { generateOutput } from '@shared/lib/generateOutput';
import { EditorField } from '@shared/types/types';
import { Button } from '@shared/ui/Button';
import { useAuth } from '@shared/hooks/useAuth';
import { Avatar } from '@shared/ui/Avatar';

type Props = {
  draft: Draft;
};

export const DraftEmbed = ({ draft }: Props) => {
  const [currentTab, setCurrentTab] = useState<EditorField | null>('html');
  const [isResultActive, setIsResultActive] = useState(true);

  const { user } = useAuth();

  const editors: Editor[] = useMemo(
    (): Editor[] => [
      {
        field: 'html',
        value: draft.html,
        extension: htmlLang(),
      },
      { field: 'css', value: draft.css, extension: cssLang() },
      { field: 'js', value: draft.js, extension: jsLang() },
    ],
    []
  );
  const profileLink = `/users/${draft.user.id}`;

  const output = generateOutput(draft.html, draft.css, draft.js);

  const handleTabClick = (field: EditorField) => {
    if (currentTab === field) {
      setCurrentTab(null);
    } else {
      setCurrentTab(field);
    }
  };

  return (
    <div>
      <div className='flex items-center p-4 bg-[#2C303A] rounded-t-lg'>
        <div className='mr-auto'>
          <p className='text-2xl font-bold'>{draft.projectName}</p>

          <Link className='text-white/75 hover:underline' to={profileLink}>
            {draft.user.username}
          </Link>
        </div>

        {user?.id !== draft.user.id && (
          <Button
            className='mr-4'
            color='tertiary'
            as={Link}
            to={`/edit?draftId=${draft.id}`}
          >
            <FaHeart />
          </Button>
        )}

        <Button color='tertiary' as={Link} to={`/edit?draftId=${draft.id}`}>
          <FaEdit />
        </Button>
      </div>

      <ul className='flex gap-x-1 p-1 pt-3 bg-secondary'>
        <EditorTab
          active={currentTab === 'html'}
          onClick={() => handleTabClick('html')}
        >
          HTML
        </EditorTab>
        <EditorTab
          active={currentTab === 'css'}
          onClick={() => handleTabClick('css')}
        >
          CSS
        </EditorTab>
        <EditorTab
          active={currentTab === 'js'}
          onClick={() => handleTabClick('js')}
        >
          JS
        </EditorTab>
        <EditorTab
          className='ml-auto'
          active={isResultActive}
          onClick={() => setIsResultActive((prev) => !prev)}
        >
          Result
        </EditorTab>
      </ul>

      <div className='flex h-100 bg-tertiary'>
        {currentTab && (
          <div className='flex-1 '>
            {editors.map((editor) => (
              <ReactCodeMirror
                key={editor.field}
                className={cn('h-full [&_.cm-editor]:h-full', {
                  hidden: editor.field !== currentTab,
                })}
                theme='dark'
                extensions={[EditorView.lineWrapping, editor.extension]}
                value={editor.value}
                editable={false}
              />
            ))}
          </div>
        )}

        <div className={cn('flex-1', { hidden: !isResultActive })}>
          <iframe
            width='100%'
            height='100%'
            title='output'
            sandbox='allow-scripts'
            srcDoc={output}
            className='bg-white'
          />
        </div>

        {/* If all tabs are disabled */}
        {!isResultActive && !currentTab && (
          <div className='flex flex-1 flex-col items-center justify-center'>
            <Avatar
              className='!w-30 !h-30 mb-4 text-3xl'
              username={draft.user.username}
            />

            <p className='text-center'>
              Check more on
              <br />
              <Link className='underline' to={profileLink}>
                user
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
