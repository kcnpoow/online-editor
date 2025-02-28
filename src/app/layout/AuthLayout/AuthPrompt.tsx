import { Link } from 'react-router';

import { Button } from '@shared/ui/Button';

type Props = {
  heading: string;
  description: string;
  linkText: string;
  to: string;
};

export const AuthPrompt = ({ heading, description, linkText, to }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center h-full p-8'>
      <h3 className='mb-8 text-4xl text-center font-bold'>{heading}</h3>

      <p className='mb-6 text-black/75 text-center'>{description}</p>

      <Button
        className='inline-block'
        color='tertiary'
        variant='outlined'
        as={Link}
        to={to}
        replace
      >
        {linkText}
      </Button>

      <div className='relative flex justify-center items-center w-3/4 my-8 text-black/50'>
        <hr className='w-full' />
        <span className='absolute px-4 -mt-1 bg-white'>or</span>
      </div>

      <Link className='text-black/75 hover:text-black hover:underline' to='/'>
        Continue as guest
      </Link>
    </div>
  );
};
