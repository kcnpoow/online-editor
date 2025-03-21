import { FormEvent } from 'react';
import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useState } from 'react';
import { authApi } from '@shared/api/AuthApi';

const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await authApi.signup(
        formData.username,
        formData.email,
        formData.password
      );
    } finally {
    }
  };

  return (
    <form
      className='place-content-center h-full p-8 bg-secondary'
      onSubmit={handleSubmit}
    >
      <h1 className='text-white text-3xl text-center font-bold'>Sign Up</h1>

      <Input
        containerClassName='mb-4'
        id='username'
        icon={<FaUser />}
        type='text'
        label='Username'
        autoComplete='off'
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
      />

      <Input
        containerClassName='mb-4'
        id='email'
        icon={<MdMail />}
        type='email'
        label='Email'
        autoComplete='off'
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />

      <div className='mb-6 md:flex md:justify-between md:gap-x-8'>
        <Input
          id='password'
          icon={<FaLock />}
          type='password'
          label='Password'
          autoComplete='off'
          containerClassName='w-full max-md:mb-4'
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <Input
          id='confirm-password'
          icon={<FaLock />}
          type='password'
          label='Confirm Password'
          autoComplete='off'
          containerClassName='w-full'
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
