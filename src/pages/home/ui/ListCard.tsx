import { MouseEvent, ReactNode } from 'react';

type Props = {
  title: string;
  description: ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

export const ListCard = ({ title, description, isOpen, onClick }: Props) => {
  const handleToggle = (e: MouseEvent<HTMLDetailsElement>) => {
    // Prevent default behavior and run the custom `onClick` logic
    e.preventDefault();
    onClick();
  };

  return (
    <li className='lg:my-2'>
      <details
        open={isOpen}
        className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'
        onClick={handleToggle} // Attach onClick here to the details element
      >
        <summary className='text-[1.1rem] text-[#fff] cursor-pointer'>
          {title}
        </summary>
        <p className='mt-2'>{description}</p>
      </details>
    </li>
  );
};
