import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Divider } from '@shared/ui/Divider';

export const Signin = () => {
  return (
    <form className='place-content-center h-full p-8 bg-secondary'>
      <h1 className='text-white text-3xl text-center font-bold'>Sign In</h1>

      <Input
        id='username'
        containerClassName='mb-10'
        icon={<FaUser />}
        type='text'
        label='Username'
        autoComplete='off'
      />

      <Input
        id='password'
        icon={<FaLock />}
        type='password'
        label='Password'
        autoComplete='off'
        containerClassName='mb-2'
      />

      <div className='flex justify-end'>
        <Link
          className='block ml-auto mb-6 text-white/75 hover:underline hover:text-white'
          to='#'
        >
          Forget password?
        </Link>
      </div>

      <Button className='block mx-auto' color='primary' variant='filled'>
        Login
      </Button>

      <div className='mt-4 text-center lg:hidden'>
        <span className='text-white/75'>Don't have an account? </span>
        <Link className='text-success hover:underline' to='/signup' replace>
          Sign Up
        </Link>
      </div>
    </form>
  );
};
