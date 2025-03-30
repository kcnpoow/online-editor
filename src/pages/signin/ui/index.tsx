import { useState } from 'react';
import { Link } from 'react-router';
import { FaLock, FaUser } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Alert } from '@shared/ui/Alert';
import { authApi } from '@shared/api/AuthApi';

const initialFormData = {
  username: '',
  password: '',
};

const initialErrors = {
  username: '',
  password: '',
  generalError: '',
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
      generalError: '',
      [field]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors(initialErrors);

    try {
      const result = await authApi.signin(formData.username, formData.password);

      console.log(result);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='place-content-center h-full py-4 px-30 bg-secondary'
    >
      <h1 className='text-white text-3xl text-center font-bold'>Sign In</h1>

      <Input
        id='username'
        icon={<FaUser />}
        type='text'
        label='Username'
        containerClassName='mb-4'
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

      <div className='flex justify-end mb-6'>
        <Link
          className='block ml-auto text-white/75 hover:underline hover:text-white'
          to='#'
        >
          Forgot password?
        </Link>
      </div>

      {errors.generalError && (
        <Alert className='my-6' variant='error'>
          {errors.generalError}
        </Alert>
      )}

      <Button
        className='block mx-auto'
        color='primary'
        variant='filled'
        type='submit'
        disabled={isSubmitting}
      >
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
