import { MouseEvent, ReactNode } from 'react';

type Props = {
  title: string;
  description: ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

export const ListCard = ({ title, description, isOpen, onClick }: Props) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    onClick();
  };

  return (
    <li className='cursor-pointer not-last:mb-2'>
      <details
        open={isOpen}
        className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'
        onClick={handleClick}
      >
        <summary className='text-[1.1rem] text-[#fff]'>{title}</summary>
        <p className='mt-2'>{description}</p>
      </details>
    </li>
  );
};
