import { useRef, useState } from 'react';
import { IoCopy, IoCheckmark } from 'react-icons/io5';

type Props = {
  children: string;
};

export const Clipper = ({ children }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(children);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);

    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        className='w-full p-2 pr-8 text-black bg-white rounded-md'
        type='text'
        readOnly
        value={children}
        onClick={handleClick}
      />

      <div className='absolute top-1/2 right-2 -translate-y-1/2 text-black pointer-events-none'>
        {isCopied ? <IoCheckmark /> : <IoCopy />}
      </div>
    </div>
  );
};
