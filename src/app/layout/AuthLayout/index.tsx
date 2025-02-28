import { useLocation, Outlet } from 'react-router';
import cn from 'classnames';

import { AuthPrompt } from './AuthPrompt';

export const AuthLayout = () => {
  const location = useLocation();

  const isSignin = location.pathname === '/signin';
  const isSignup = location.pathname === '/signup';

  return (
    <div className='flex items-center justify-center h-screen bg-tertiary'>
      <div className='flex w-full h-full lg:max-w-[60rem] lg:max-h-[40rem] lg:rounded-2xl lg:overflow-hidden'>
        <div
          className={cn(
            'flex-shrink min-w-0 bg-secondary lg:transition-all lg:duration-300',
            {
              'flex-2 opacity-100': isSignup,
              'flex-0 opacity-0': !isSignup,
            }
          )}
        >
          {isSignup && <Outlet />}
        </div>

        <div className='flex-1 bg-white max-lg:hidden'>
          {isSignin && (
            <AuthPrompt
              heading='New Account'
              description=' New here? Sign up to start building and sharing your code with the world!'
              linkText='Sign Up'
              to='/signup'
            />
          )}

          {isSignup && (
            <AuthPrompt
              heading='Welcome Back'
              description='Already have an account? Sign in to continue building and sharing your code.'
              linkText='Sign In'
              to='/signin'
            />
          )}
        </div>

        <div
          className={cn(
            'flex-shrink min-w-0 bg-secondary lg:transition-all lg:duration-300',
            {
              'flex-2 opacity-100': isSignin,
              'flex-0 opacity-0': !isSignin,
            }
          )}
        >
          {isSignin && <Outlet />}
        </div>
      </div>
    </div>
  );
};
