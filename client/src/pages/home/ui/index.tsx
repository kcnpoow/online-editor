import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { CodeContainer } from './CodeContainer.tsx';
import { FeatureCard } from './FeatureCard.tsx';
import { HtmlAnimation, JsAnimation, CssAnimation } from './CodeAnimation.tsx';
import { ImageListCard } from './ImageListCard.tsx';
import { ListCard } from './ListCard.tsx';
import { Button } from '@shared/ui/Button';
import { useAuth } from '@shared/hooks/useAuth.tsx';
import { DraftSortValues, PagedResponse } from '@shared/types/types.ts';
import { Draft, draftApi, DraftCard } from '@entities/draft/index.ts';

const titles = ['Support For the Way You Code', 'Keep Your Drafts Private'];

const descriptions = [
  <>
    The CodePen Editor is highly customizable. There is{' '}
    <strong>autocomplete and Emmet</strong> for speed and accuracy. Plus you can
    set up smart defaults for starting new work.
  </>,
  <>
    Nobody can see your private stuff until <em>you want them to</em>, because
    they are at secret{' '}
    <strong>unguessable, non-searchable, non-indexable URLs</strong>.
  </>,
];

const images = [
  'https://cpwebassets.codepen.io/assets/packs/editor-support-9cc33b6268c0a6c897033028084e1851.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-privacy-e542bc22ce324502eb727577083eeb61.png',
];

export const Home = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { user } = useAuth();

  const [response, setResponse] = useState<PagedResponse<Draft>>();

  const handleClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  useEffect(() => {
    (async () => {
      const result = await draftApi.searchDrafts(
        '',
        0,
        10,
        DraftSortValues.CreatedDate
      );

      setResponse(result);
    })();
  }, []);

  return (
    <div className='py-15'>
      <section className='container relative mb-20'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8  w-full mx-auto relative'>
          <div className='lg:col-start-2 lg:row-start-1 max-lg:min-h-96 rounded-[10px] relative w-full min-h-[410px]'>
            <div className='w-full lg:right-0 h-full max-lg:top-0 absolute bg-gradient-to-r from-[#4c4f5a] to-[#202125] rounded-xl'></div>
            <CodeContainer
              title='HTML'
              titleColor='#E27445'
              className='max-lg:left-1/10 lg:right-5 -top-5'
            >
              <HtmlAnimation />
            </CodeContainer>

            <CodeContainer
              title='CSS'
              titleColor='#5CAAD9'
              className='max-lg:right-1/10 lg:-right-3 top-1/2 -translate-y-1/2'
            >
              <CssAnimation />
            </CodeContainer>

            <CodeContainer
              title='JS'
              titleColor='#EBC351'
              className='max-lg:left-1/10 lg:right-2 -bottom-5'
            >
              <JsAnimation />
            </CodeContainer>
          </div>

          <div className='max-lg:mt-16  max-lg:text-center'>
            <div className='flex gap-4'>
              {/* logo */}
              <h1 className='mb-2.5 text-5xl font-bold'>
                Code smarter. Code faster. CodeLive
              </h1>
            </div>

            <p className='mb-8 text-2xl text-[#c7c9d3]'>
              CodeLive is an online compiler for instant testing of{' '}
              <strong className='text-white'>HTML, CSS and JavaScript</strong>
            </p>

            {user ? (
              <Button as={Link} to='/edit'>
                Open Editor
              </Button>
            ) : (
              <Button as={Link} to='/signup'>
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className='container mb-20'>
        <div className='grid gap-y-14 gap-x-8 w-full mx-auto lg:grid-cols-2'>
          <FeatureCard
            icon='https://cpwebassets.codepen.io/assets/packs/icon-build-0f21c66ed03bfb36c597636d27ca621e.svg'
            title='Build & Test'
            description={
              <>
                Get work done quicker by building out{' '}
                <strong>entire projects</strong> or isolating code to{' '}
                <strong>test features and animations</strong>.
              </>
            }
            linkText='Try the Editor'
            linkTo='/edit'
          />

          <FeatureCard
            icon='https://cpwebassets.codepen.io/assets/packs/icon-share-910c683bbac21bf41fcf9aab64ebc957.svg'
            title='Share Your Work'
            description={
              <>
                Become a part of the{' '}
                <strong>most active front-end community</strong> in the world by
                sharing work.
              </>
            }
            linkText='Explore'
            linkTo='/explore'
          />
        </div>
      </section>

      <section className='container mb-12'>
        <div className='mb-6 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid items-start justify-items-center gap-4 grid-template-columns: repeat(auto-fill,minmax(320px,1fr)); w-full mx-auto relative'>
          <div className='max-md:min-h-full max-md:flex max-md:items-center'>
            <div>
              <h2 className='text-[1.8rem] leading-[1.2] font-normal mb-[10px]'>
                Find inspiration from front-end designers and developers.
              </h2>
              <p className='text-[#c7c9d3] m-0 mb-4'>
                Browse and share work from world-class designers and developers
                in the front-end community.
              </p>
            </div>
          </div>

          {response?.content.map((draft) => (
            <DraftCard draft={draft} />
          ))}
        </div>

        <div className='flex justify-center'>
          <Button as={Link} to='/explore' color='secondary' variant='outlined'>
            More...
          </Button>
        </div>
      </section>

      <section className='relative overflow-hidden py-10 bg-[#191a1f]'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
              A front-end environment made for testing and sharing
            </h2>

            <Link className='text-[#76daff]' to='/explore'>
              Explore
            </Link>
          </div>

          <div className='grid mx-auto lg:grid-cols-[33%_66%]'>
            <ul className='lg:mr-8'>
              {titles.map((title, index) => (
                <ListCard
                  key={index}
                  title={title}
                  description={descriptions[index]}
                  isOpen={openIndex === index}
                  onClick={() => handleClick(index)}
                />
              ))}
            </ul>

            <ul className='max-lg:mt-2'>
              {images.map((imgUrl, index) => (
                <ImageListCard
                  key={index}
                  imgUrl={imgUrl}
                  isVisible={openIndex === index}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
