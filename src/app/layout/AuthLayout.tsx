import { useLocation, Link } from 'react-router';
import cn from 'classnames';

import { Signin } from '@pages/signin';
import { Button } from '@shared/ui/Button';

export const AuthLayout = () => {
  const location = useLocation();

  const isSignin = location.pathname === '/signin';
  const isSignup = location.pathname === '/signup';

  return (
    <div className='flex items-center justify-center h-screen bg-tertiary'>
      <div className='w-full h-full flex lg:max-w-[60rem] lg:max-h-[40rem] lg:rounded-2xl lg:overflow-hidden'>
        <div
          className={cn('h-full transition-all duration-300', {
            'flex-1 bg-white max-lg:hidden': isSignin,
            'flex-2 bg-secondary': isSignup,
          })}
        >
          {isSignin && (
            <div className='flex flex-col items-center justify-center h-full p-8'>
              <h3 className='mb-10 text-4xl text-center font-bold'>
                New Account
              </h3>

              <p className='mb-10 text-black/75 text-center'>
                New here? Sign up to start building and sharing your code with
                the world!
              </p>

              <Button
                className='inline-block'
                color='tertiary'
                variant='outlined'
                as={Link}
                to='/signup'
                replace
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <div
          className={cn('h-full transition-all duration-300', {
            'flex-2 bg-secondary': isSignin,
            'flex-1 bg-white max-lg:hidden': isSignup,
          })}
        >
          {isSignin && <Signin />}

          {isSignup && (
            <div className='flex flex-col items-center justify-center h-full p-8'>
              <h3 className='mb-10 text-4xl text-center font-bold'>
                Welcome Back
              </h3>

              <p className='mb-10 text-black/75 text-center'>
                Already have an account? Sign in to continue building and
                sharing your code.
              </p>

              <Button
                className='inline-block'
                color='tertiary'
                variant='outlined'
                as={Link}
                to='/signin'
                replace
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
