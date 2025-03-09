import { useState } from 'react';
import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { authApi } from '@shared/api/AuthApi';

const initialFormData = {
  username: '',
  password: '',
};

const initialErrors = {
  username: '',
  password: '',
  error: '',
};

export const Signin = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await authApi.signin(formData.username, formData.password);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        ['username']: 'asd',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='place-content-center h-full p-8 bg-secondary'
    >
      <h1 className='text-white text-3xl text-center font-bold'>Sign In</h1>

      <Input
        id='username'
        containerClassName='mb-10'
        icon={<FaUser />}
        type='text'
        label='Username'
        autoComplete='off'
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
        error={errors.username}
      />

      <Input
        id='password'
        icon={<FaLock />}
        type='password'
        label='Password'
        autoComplete='off'
        containerClassName='mb-2'
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
      />

      <div className='flex justify-end'>
        <Link
          className='block ml-auto mb-6 text-white/75 hover:underline hover:text-white'
          to='#'
        >
          Forgot password?
        </Link>
      </div>

      <Button
        className='block mx-auto'
        color='primary'
        variant='filled'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
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
