import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';

export const Signin = () => {
  return (
    <div className='h-full lg:grid lg:grid-cols-[2fr_3fr]'>
      <div className='place-items-center place-content-center p-8 bg-white max-lg:hidden'>
        <h3 className='mb-10 text-4xl text-center font-bold'>Welcome Back</h3>

        <p className='mb-10 text-black/75 text-center'>
          Already have an account? Sign in to continue building and sharing your
          code.
        </p>

        <Button className='inline-block' color='primary' as={Link} to='/signup'>
          Sign Up
        </Button>
      </div>

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
          containerClassName='mb-6'
          icon={<FaLock />}
          type='password'
          label='Password'
          autoComplete='off'
        />

        <Button className='block mx-auto' color='primary'>
          Login
        </Button>
      </form>
    </div>
  );
};
