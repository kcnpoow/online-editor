import { Button } from '@shared/ui/Button';
import { useState } from 'react';

import { CodeContainer } from './CodeContainer.tsx';
import { HtmlAnimation } from './HtmlAnimation.tsx';

export const Home = () => {
  return (
    <div
      className='pt-4 m-0 p-0 container mx-auto'
      style={{ gridArea: 'main', boxSizing: 'border-box' }}
    >
      <section className='py-12 relative'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8 relative px-8'>
          <div
            className='rounded-[10px] relative z-10 w-full min-h-[410px]'
            style={{ gridArea: '1 / 2' }}
          >
            <div className='relative min-w-[455px]'>
              <div className='w-[90%] right-0 absolute h-[410px] bg-gradient-to-r from-[#4c4f5a] to-[#202125] rounded-[10px]'></div>

              <CodeContainer title='HTML' className='right-[20px] top-[-20px]'>
                <HtmlAnimation />
              </CodeContainer>

              <CodeContainer title='CSS' className='right-[-30px] top-[130px]'>
              </CodeContainer>

              <CodeContainer title='JS' className='right-[40px] top-[280px]'>
              </CodeContainer>
            </div>
          </div>

          <div className='relative z-[1]'>
            <div className='flex gap-8'>
              {/* logo */}
              <h1 className='text-[3rem] leading-[1.1] mb-[10px] font-bold'>
                Code smarter.Code faster.CodeLive
              </h1>
            </div>
            <p className='text-[1.2rem] mb-[2rem] text-[#c7c9d3]'>
              CodeLive is an online compiler for instant testing of{' '}
              <strong className='font-bold text-[#ffffff]'>
                HTML, CSS and JavaScript
              </strong>
            </p>
            <Button className='bg-[#47cf73]' color='secondary'>
              Sign Up
            </Button>
          </div>
        </div>
      </section>

      <section className='relative py-12'>
        <div className='grid grid-cols-2 gap-8 w-full mx-auto relative px-8'>
          <div className='bg-[#2c303a] p-6 pb-8 m-8 rounded-[10px] relative z-[1]'>
            <div className='mb-[1.5rem] mt-[-60px] bg-[#131417] rounded-[10px] w-[75px] h-[75px]'>
              <img
                className='mt-0 mx-[10px] mb-[12px] max-w-full h-auto'
                src='https://cpwebassets.codepen.io/assets/packs/icon-build-0f21c66ed03bfb36c597636d27ca621e.svg'
                alt='Icon of conveyer belt with boxes on it.'
              />
            </div>
            <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
              Build &amp; Test
            </h2>
            <p className='text-[#c7c9d3] mb-[1em]'>
              Get work done quicker by building out{' '}
              <strong>entire projects</strong> or isolating code to{' '}
              <strong>test features and animations</strong>. Want to keep it all
              under wraps?{' '}
              <a className='text-[#76daff]' href='#'>
                <strong>
                  Upgrade to a{' '}
                  <span className='m-0 mx-[2px] bg-[#ffdd40] text-zinc-950 uppercase text-[0.8rem] p-[0.125rem_0.375rem_0] rounded-[2px] '>
                    PRO
                  </span>{' '}
                  account{' '}
                </strong>
              </a>
              to keep your work private.
            </p>
            <Button color='secondary'>Try the Editor</Button>
          </div>

          <div className='bg-[#2c303a] p-6 pb-8 m-8 rounded-[10px] relative z-[1]'>
            <div className='mb-[1.5rem] mt-[-60px] bg-[#131417] rounded-[10px] w-[75px] h-[75px]'>
              <img
                className='mt-0 mx-[10px] mb-[12px] max-w-full h-auto'
                src='https://cpwebassets.codepen.io/assets/packs/icon-share-910c683bbac21bf41fcf9aab64ebc957.svg'
                alt='Icon of conveyer belt with boxes on it.'
              />
            </div>
            <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
              Share Your Work
            </h2>
            <p className='text-[#c7c9d3] mb-[1em]'>
              Become a part of the{' '}
              <strong>most active front-end community</strong> in the world by
              sharing work. Presenting at a conference? Show your code directly
              in the browser with{' '}
              <a href='#'>
                <strong className='text-[#76daff]'>Presentation Mode</strong>
              </a>
              .
            </p>
            <Button color='secondary'>Explore</Button>
          </div>
        </div>
      </section>

      <div>
        <section className='pt-12 mb-[-3rem]'>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] items-start justify-items-center gap-12 w-full mx-auto relative px-8'>
            <div>
              <h2 className='text-[1.8rem] leading-[1.2] font-normal mb-[10px]'>
                Find inspiration from 1.8 million+ front-end designers and
                developers.
              </h2>
              <p className='text-[#c7c9d3] m-0 mb-4'>
                Browse and share work from world-class designers and developers
                in the front-end community.
              </p>
            </div>

            <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
              <div
                className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
                style={{
                  clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
                }}
              ></div>

              <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
                <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
                  <div>
                    <picture>
                      <img
                        className='block absolute top-0 left-0 w-full h-full object-cover'
                        src='https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012'
                      ></img>
                    </picture>
                  </div>
                  <a
                    href='#'
                    className='absolute inset-0 border-0 !important z-[1]'
                  ></a>
                  {/* <a href=''>Крч тут BUTTON</a> */}
                </div>
              </div>

              <div>
                <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
                  <a href='#' className='block mr-3 relative z-10'>
                    <img
                      className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
                      src='https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=80&amp;version=1722105126&amp;width=80'
                    ></img>
                  </a>
                  <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
                    <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
                      <a href='#'>Catch Me If You Can</a>
                    </h2>
                    <address className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
                      <a href=''>Mirasov Nurzhan</a>
                    </address>
                  </div>
                </header>
                {/* не доделал */}
                {/* <footer className='-mb-2mt-2 flex items-center text-xs'>
                  <button
                    className='bg-[#444857] text-amber-300'
                  >
                    <button
                    className='
                    appearance-none inline-flex items-center justify-center relative 
                    text-base font-normal cursor-pointer text-ellipsis whitespace-nowrap 
                    text-center no-underline shadow-none leading-[1.2] 
                    bg-[#444857] 
                    px-[7px] py-[3px] m-0 mr-[4px]
                    border border-transparent rounded-[2px]'
                  ></button>
                    <svg
                      className='mr-0.5 w-3 h-3 inline-block'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z'></path>
                    </svg>
                    <span>12</span>
                  </button>
                </footer> */}
              </div>
            </article>

            <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
              <div
                className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
                style={{
                  clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
                }}
              ></div>

              <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
                <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
                  <div>
                    <picture>
                      <img
                        className='block absolute top-0 left-0 w-full h-full object-cover'
                        src='https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012'
                      ></img>
                    </picture>
                  </div>
                  <a
                    href='#'
                    className='absolute inset-0 border-0 !important z-[1]'
                  ></a>
                  {/* <a href=''>Крч тут BUTTON</a> */}
                </div>
              </div>

              <div>
                <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
                  <a href='#' className='block mr-3 relative z-10'>
                    <img
                      className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
                      src='https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=80&amp;version=1722105126&amp;width=80'
                    ></img>
                  </a>
                  <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
                    <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
                      <a href='#'>Catch Me If You Can</a>
                    </h2>
                    <address className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
                      <a href=''>Mirasov Nurzhan</a>
                    </address>
                  </div>
                </header>
              </div>
            </article>

            <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
              <div
                className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
                style={{
                  clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
                }}
              ></div>

              <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
                <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
                  <div>
                    <picture>
                      <img
                        className='block absolute top-0 left-0 w-full h-full object-cover'
                        src='https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012'
                      ></img>
                    </picture>
                  </div>
                  <a
                    href='#'
                    className='absolute inset-0 border-0 !important z-[1]'
                  ></a>
                  {/* <a href=''>Крч тут BUTTON</a> */}
                </div>
              </div>

              <div>
                <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
                  <a href='#' className='block mr-3 relative z-10'>
                    <img
                      className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
                      src='https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=80&amp;version=1722105126&amp;width=80'
                    ></img>
                  </a>
                  <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
                    <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
                      <a href='#'>Catch Me If You Can</a>
                    </h2>
                    <address className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
                      <a href=''>Mirasov Nurzhan</a>
                    </address>
                  </div>
                </header>
              </div>
            </article>

            <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
              <div
                className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
                style={{
                  clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
                }}
              ></div>

              <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
                <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
                  <div>
                    <picture>
                      <img
                        className='block absolute top-0 left-0 w-full h-full object-cover'
                        src='https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012'
                      ></img>
                    </picture>
                  </div>
                  <a
                    href='#'
                    className='absolute inset-0 border-0 !important z-[1]'
                  ></a>
                  {/* <a href=''>Крч тут BUTTON</a> */}
                </div>
              </div>

              <div>
                <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
                  <a href='#' className='block mr-3 relative z-10'>
                    <img
                      className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
                      src='https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=80&amp;version=1722105126&amp;width=80'
                    ></img>
                  </a>
                  <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
                    <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
                      <a href='#'>Catch Me If You Can</a>
                    </h2>
                    <address className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
                      <a href=''>Mirasov Nurzhan</a>
                    </address>
                  </div>
                </header>
              </div>
            </article>

            <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
              <div
                className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
                style={{
                  clipPath: 'inset(2rem 0 2rem 2rem round 10px)',
                }}
              ></div>

              <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
                <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
                  <div>
                    <picture>
                      <img
                        className='block absolute top-0 left-0 w-full h-full object-cover'
                        src='https://assets.codepen.io/416221/internal/screenshots/pens/ZYEQwLB.custom.png?version=1740017012'
                      ></img>
                    </picture>
                  </div>
                  <a
                    href='#'
                    className='absolute inset-0 border-0 !important z-[1]'
                  ></a>
                  {/* <a href=''>Крч тут BUTTON</a> */}
                </div>
              </div>

              <div>
                <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
                  <a href='#' className='block mr-3 relative z-10'>
                    <img
                      className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
                      src='https://assets.codepen.io/416221/internal/avatars/users/default.png?fit=crop&amp;format=auto&amp;height=80&amp;version=1722105126&amp;width=80'
                    ></img>
                  </a>
                  <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
                    <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
                      <a href='#'>Catch Me If You Can</a>
                    </h2>
                    <address className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
                      <a href=''>Mirasov Nurzhan</a>
                    </address>
                  </div>
                </header>
              </div>
            </article>
          </div>
        </section>

        <nav className='mt-20 mb-12 flex justify-center items-center my-[2rem] mb-[1rem]'>
          <Button color='secondary'>Next&gt;</Button>
        </nav>
      </div>

      <section className='bg-[#191a1f] relative overflow-hidden py-12 mt-12'>
        <div className='text-center mb-12'>
          <h2 className='text-[1.8rem] leading-[1.2] mb-[10px] font-normal'>
            A front-end environment made for testing and sharing
          </h2>
          <a href='' className='text-[#76daff] m-[0.5rem_0.875rem]'>
            Explore
          </a>
        </div>

        <div className='grid grid-cols-[33%_66%] gap-8 w-full mx-auto relative px-8'>
          <ul>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Support For the Way You Code
                </summary>
                <p className='mt-2'>
                  The CodePen Editor is highly customizable. There is{' '}
                  <strong>autocomplete and Emmet</strong> for speed and
                  accuracy. Plus you can set up smart defaults for starting new
                  work.
                </p>
              </details>
            </li>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Keep Your Pens Private
                </summary>
                <p className='mt-2'>
                  Nobody can see your private stuff until{' '}
                  <em>you want them to</em>, because they are at secret{' '}
                  <strong>
                    unguessable, non-searchable, non-indexable URLs
                  </strong>
                  .
                </p>
              </details>
            </li>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Embed Pens
                </summary>
                <p className='mt-2'>
                  Completely customize the look of code demos on your own site.
                  Change the look of your site? Just change the theme and all
                  your Embedded Pens change too.
                </p>
              </details>
            </li>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Asset Hosting
                </summary>
                <p className='mt-2'>
                  Need to use an image in a Pen? No more awkwardly finding
                  alternate hosting for it, you can drag-and-drop it right onto
                  CodePen and we'll host it for you. And not just images!{' '}
                  <strong>CSS, JSON files, SVGs, media files</strong>, whatever!
                </p>
              </details>
            </li>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Build Entire Projects
                </summary>
                <p className='mt-2'>
                  Projects is the most powerful feature of CodePen. It's a{' '}
                  <strong>full blown IDE right in the browser</strong>, with
                  automatic preprocessing, drag and drop uploading, live
                  previews, website deployment, and much more.
                </p>
              </details>
            </li>
            <li className='my-2'>
              <details className='text-[#c7c9d3] p-3 px-4 rounded-md transition-all duration-300 ease-in-out bg-[#131417]'>
                <summary className='text-[1.1rem] text-[#fff]'>
                  Collab Mode
                </summary>
                <p className='mt-2'>
                  <strong>Live collaboration on code.</strong> Multiple people
                  can type and edit code in a Pen at the same time, all while
                  still seeing the live preview.
                </p>
              </details>
            </li>
          </ul>

          <div className='-mb-12 relative'>
            <ul>
              <li className='absolute top-0'>
                <img
                  className='max-w-full h-auto'
                  src='https://cpwebassets.codepen.io/assets/packs/editor-support-9cc33b6268c0a6c897033028084e1851.png'
                  alt=''
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
