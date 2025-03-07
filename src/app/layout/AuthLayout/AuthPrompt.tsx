import { Link } from 'react-router';

import { Button } from '@shared/ui/Button';
import { Divider } from '@shared/ui/Divider';

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

      <Divider className='max-w-2/3 mt-5 mb-4 text-black/50'>or</Divider>
      
      <Link className='text-black/75 hover:text-black hover:underline' to='/'>
        Continue as guest
      </Link>
    </div>
  );
};
