import { useState } from 'react';
import { Link } from 'react-router';

import { CodeContainer } from './CodeContainer.tsx';
import { FeatureCards } from './FeatureCards.tsx';
import { HtmlAnimation, JsAnimation, CssAnimation } from './CodeAnimation.tsx';
import { ImageListCard } from './ImageListCard.tsx';
import { ListCard } from './ListCard.tsx';
import { DraftCard } from '@entities/draft/index.ts';
import { Button } from '@shared/ui/Button';

const PAGE_SIZE = 5;
const articles = [
  {
    title: 'Catch Me If You Can',
    author: 'Mirasov Nurzhan',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1722105126&width=80',
  },
  {
    title: 'Creative Design Trends',
    author: 'John Doe',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/XyZQwLB.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'Dark Mode UI',
    author: 'Jane Smith',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/AbC123.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'Minimalism in Web Design',
    author: 'Alice Brown',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/QwErTy.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'Figma to Code Workflow',
    author: 'Michael Lee',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/ZxCvBn.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'Interactive UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'фывпап UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'фыавыпаврпк UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'уцкуекнеглншд UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'Interactive UI лнгаоевркыпуаыяпкчрв',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'крвеоанлп UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
  {
    title: 'ыапврпаорпор UI Elements',
    author: 'David Kim',
    imageUrl:
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png',
    profileUrl:
      'https://assets.codepen.io/416221/internal/avatars/users/default.png',
  },
];

const titles = [
  'Support For the Way You Code',
  'Keep Your Pens Private',
  'Embed Pens',
  'Asset Hosting',
  'Build Entire Projects',
  'Collab Mode',
];

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
  <>
    Completely customize the look of code demos on your own site. Change the
    look of your site? Just change the theme and all your Embedded Pens change
    too.
  </>,
  <>
    Need to use an image in a Pen? No more awkwardly finding alternate hosting
    for it, you can drag-and-drop it right onto CodePen and we'll host it for
    you. And not just images!{' '}
    <strong>CSS, JSON files, SVGs, media files</strong>, whatever!
  </>,
  <>
    Projects is the most powerful feature of CodePen. It's a{' '}
    <strong>full blown IDE right in the browser</strong>, with automatic
    preprocessing, drag and drop uploading, live previews, website deployment,
    and much more.
  </>,
  <>
    <strong>Live collaboration on code.</strong> Multiple people can type and
    edit code in a Pen at the same time, all while still seeing the live
    preview.
  </>,
];

const images = [
  'https://cpwebassets.codepen.io/assets/packs/editor-support-9cc33b6268c0a6c897033028084e1851.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-privacy-e542bc22ce324502eb727577083eeb61.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-embed-eae2ee445ef0f63ee8fc7f175858e9d9.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-assets-6a081a7c8ff72da526846f3c8f8ae91c.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-projects-a0d6a9e16cf1c2c46219ef3d49370823.png',
  'https://cpwebassets.codepen.io/assets/packs/editor-collab-90815f9b83fcbdbd3ef7df4573ed9b57.png',
];

export const Home = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex((prevIndex) => {
      if (prevIndex === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);

  return (
    <div className='pt-4 border-box'>
      <section className='container mx-auto px-6 lg:py-12 relative py-6'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8  w-full mx-auto relative'>
          <div className='lg:col-start-2 lg:row-start-1 max-lg:min-h-96 rounded-[10px] relative w-full min-h-[410px]'>
            <div className='w-full lg:right-0 h-full max-lg:top-0 absolute bg-gradient-to-r from-[#4c4f5a] to-[#202125] rounded-xl'></div>
            <CodeContainer
              title='HTML'
              className='max-lg:left-2/10 lg:right-5 -top-5'
            >
              <HtmlAnimation />
            </CodeContainer>

            <CodeContainer
              title='CSS'
              className='max-lg:right-1/10 lg:-right-3 top-1/2 -translate-y-1/2'
            >
              <CssAnimation />
            </CodeContainer>

            <CodeContainer
              title='JS'
              className='max-lg:left-1/10 lg:right-2 -bottom-5'
            >
              <JsAnimation />
            </CodeContainer>
          </div>

          <div className='max-lg:mt-16  max-lg:text-center'>
            <div className='flex gap-4'>
              {/* logo */}
              <h1 className='text-5xl leading-[1.1] mb-2.5 font-bold'>
                Code smarter.Code faster.CodeLive
              </h1>
            </div>
            <p className='text-2xl mb-8 text-[#c7c9d3]'>
              CodeLive is an online compiler for instant testing of{' '}
              <strong className='font-bold text-[#ffffff]'>
                HTML, CSS and JavaScript
              </strong>
            </p>
            <Button className='bg-[#47cf73]' color='secondary' as={Link} to='/signup'>
              Sign Up
            </Button>
          </div>
        </div>
      </section>

      <section className='container mx-auto py-12 px-6'>
        <div className='grid gap-y-14 gap-x-8 w-full mx-auto lg:grid-cols-2'>
          <FeatureCards
            icnos='https://cpwebassets.codepen.io/assets/packs/icon-build-0f21c66ed03bfb36c597636d27ca621e.svg'
            title='Build &amp; Test'
            description={
              <>
                Get work done quicker by building out{' '}
                <strong>entire projects</strong> or isolating code to{' '}
                <strong>test features and animations</strong>.
              </>
            }
            buttonText='Try the Editor'
          />

          <FeatureCards
            icnos='https://cpwebassets.codepen.io/assets/packs/icon-share-910c683bbac21bf41fcf9aab64ebc957.svg'
            title='Share Your Work'
            description={
              <>
                Become a part of the{' '}
                <strong>most active front-end community</strong> in the world by
                sharing work.
              </>
            }
            buttonText='Explore'
          />
        </div>
      </section>

      <div className='container mx-auto px-6'>
        <section className='pt-12 -mb-12'>
          <div className='lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid items-start justify-items-center gap-12 grid-template-columns: repeat(auto-fill,minmax(320px,1fr)); w-full mx-auto relative'>
            <div className='max-md:min-h-full max-md:flex max-md:items-center'>
              <div>
                <h2 className='text-[1.8rem] leading-[1.2] font-normal mb-[10px]'>
                  Find inspiration from 1.8 million+ front-end designers and
                  developers.
                </h2>
                <p className='text-[#c7c9d3] m-0 mb-4'>
                  Browse and share work from world-class designers and
                  developers in the front-end community.
                </p>
              </div>
            </div>

            <DraftCard to='/' />
            <DraftCard to='/' />
            <DraftCard to='/' />
          </div>
        </section>

        <nav className='mt-20 mb-12 justify-self-center flex justify-center items-center gap-4'>
          {currentPage > 1 && (
            <Button
              color='secondary'
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              &lt; Prev
            </Button>
          )}
          {currentPage < totalPages && (
            <Button
              color='secondary'
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next &gt;
            </Button>
          )}
        </nav>
      </div>

      <section className='bg-[#191a1f] relative overflow-hidden py-12 mt-12 mb-20'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12'>
            <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
              A front-end environment made for testing and sharing
            </h2>
            <a href='' className='text-[#76daff] m-[0.5rem_0.875rem]'>
              Explore
            </a>
          </div>

          <div className='lg:grid lg:grid-cols-[33%_66%] lg:gap-8 w-full mx-auto relative'>
            <ul className='cursor-pointer'>
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

            <div className=''>
              <ul>
                {images.map((imgUrl, index) => (
                  <ImageListCard
                    imgUrl={imgUrl}
                    isVisible={openIndex === index}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
