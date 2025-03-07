import { Link } from 'react-router';

import { CodeContainer } from './CodeContainer';
import { HtmlTypingAnimation } from './HtmlTypingAnimation';
import { Button } from '@shared/ui/Button';

export const HeroSection = () => {
  return (
    <section className='py-12 lg:flex lg:flex-row-reverse'>
      <div className='relative min-h-80 bg-gradient-to-r from-[#4c4f5a] to-[#202125] rounded-xl lg:min-w-[30rem] lg:min-h-[27rem]'>
        <CodeContainer
          className='max-lg:top-6 max-lg:-left-4 lg:-top-4 lg:right-6'
          title='HTML'
        >
          <HtmlTypingAnimation />
        </CodeContainer>

        <CodeContainer
          className='max-lg:-right-4 top-1/2 -translate-y-1/2 lg:-right-4'
          title='CSS'
        ></CodeContainer>

        <CodeContainer
          className='max-lg:bottom-6 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-10 lg:-bottom-4'
          title='JS'
        ></CodeContainer>
      </div>

      <div className='flex flex-col justify-center max-lg:mt-8 max-lg:text-center lg:pr-14'>
        <h1 className='mb-4 text-4xl font-extrabold'>
          Code smarter. Code faster. CodeLive
        </h1>

        <p className='mb-8 text-white/75 text-lg'>
          CodeLive is an online compiler for instant testing of{' '}
          <strong className='font-bold text-white'>
            HTML, CSS and JavaScript
          </strong>
        </p>

        <Button
          className='max-lg:ml-auto mr-auto'
          color='primary'
          as={Link}
          to='/signup'
        >
          Sign Up For Free
        </Button>
      </div>
    </section>
  );
};
