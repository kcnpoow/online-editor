import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

import { Input } from '@shared/ui/Input';

export const Signin = () => {
  return (
    <div className='h-screen grid md:grid-cols-2'>
      <div className='max-md:hidden'>1</div>
      <div className='px-4 bg-white'>
        <h1>Log In Account</h1>

        <form>
          <Input icon={<FaUser />} />

          <Input icon={<IoMdMail />} />
        </form>
      </div>
    </div>
  );
};
