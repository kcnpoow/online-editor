import { Button } from '@shared/ui/Button';
import { ReactNode } from 'react';

type Props = {
  icon: string;
  title: string;
  description: ReactNode;
  buttonText: string;
};

export const FeatureCards = ({
  icon,
  title,
  description,
  buttonText,
}: Props) => {
  return (
    <div className='bg-[#2c303a] p-6 pb-8 m-8 rounded-[10px] relative '>
      <div className='mb-4 -mt-10 bg-[#131417] rounded-[10px] w-[75px] h-[75px]'>
        <img
          className='mb-0 mx-2.5 max-w-full h-auto text-center'
          src={icon}
        />
      </div>

      <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
        {title}
      </h2>

      <p className='text-[#c7c9d3] mb-[1em]'>{description}</p>

      <Button color='secondary'>{buttonText}</Button>
    </div>
  );
};
