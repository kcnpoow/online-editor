import { ReactNode } from 'react';

type Props = {
  title: string;
  hint?: string;
  children?: ReactNode;
};

export const SettingsRow = ({ title, hint, children }: Props) => {
  return (
    <article className='p-4 bg-linear-to-r from-[#26282F] to-[#131417] border-l-3 border-[#454856]'>
      <h3 className='mb-1'>{title}</h3>

      {hint && <p className='mb-3 text-[#C7C9D2] text-sm'>{hint}</p>}

      {children}
    </article>
  );
};
