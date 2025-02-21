import { Button } from "@shared/ui/Button";

export const Signup = () => {
  return (
    <div className='h-full lg:grid lg:grid-cols-[3fr_2fr]'>
      <form className='place-content-center h-full p-8 bg-secondary'></form>

      <div className='place-items-center place-content-center p-8 bg-white max-lg:hidden'>
        <h3 className='mb-10 text-4xl text-center font-bold'>Welcome Back</h3>

        <p className='mb-10 text-black/75 text-center'>
          Already have an account? Sign in to continue building and sharing your
          code.
        </p>
      </div>
    </div>
  );
};
