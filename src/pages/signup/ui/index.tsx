import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';

export const Signup = () => {
  return (
    <form className='place-content-center h-full p-8 bg-secondary'>
      <h1 className='text-white text-3xl text-center font-bold'>Sign Up</h1>

      <Input
        containerClassName='mb-10'
        id='username'
        icon={<FaUser />}
        type='text'
        label='Username'
        autoComplete='off'
      />

      <Input
        containerClassName='mb-10 md:mb-4'
        id='email'
        icon={<MdMail />}
        type='email'
        label='Email'
        autoComplete='off'
      />

      <div className='mb-6 md:flex md:justify-between md:gap-x-8'>
        <Input
          id='password'
          icon={<FaLock />}
          type='password'
          label='Password'
          autoComplete='off'
          containerClassName='max-md:mb-10'
        />

        <Input
          id='confirm-password'
          icon={<FaLock />}
          type='password'
          label='Confirm Password'
          autoComplete='off'
        />
      </div>

      <Button className='block mx-auto' color='primary' variant='filled'>
        Register
      </Button>

      <div className='mt-4 text-center lg:hidden'>
        <span className='text-white/75'>Already have an account? </span>
        <Link className='text-success hover:underline' to='/signin' replace>
          Sign In
        </Link>
      </div>
    </form>
  );
};
