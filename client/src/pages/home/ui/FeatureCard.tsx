import { ReactNode } from 'react';
import { Link } from 'react-router';

import { Button } from '@shared/ui/Button';

type Props = {
  icon: string;
  title: string;
  description: ReactNode;
  linkText: string;
  linkTo: string;
};

export const FeatureCard = ({
  icon,
  title,
  description,
  linkText,
  linkTo
}: Props) => {
  return (
    <div className='bg-[#2c303a] p-6 pb-8 rounded-lg relative '>
      <div className='mb-4 -mt-10 bg-[#131417] w-[75px] h-[75px]'>
        <img
          className=' mb-0 mx-2.5 max-w-full h-auto text-center'
          src={icon}
        />
      </div>
      <h2 className='text-3xl mb-2.5 font-normal'>{title}</h2>
      <p className='text-[#c7c9d3] mb-4'>{description}</p>

      <Button color='secondary' as={Link} to={linkTo}>{linkText}</Button>
    </div>
  );
};
