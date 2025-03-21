type Props = {
  title: string;
  author: string;
  imageUrl: string;
  profileUrl: string;
};

export const ArticleCard = ({ title, author, imageUrl, profileUrl }: Props) => {
  return (
    <article className='grid grid-rows-[minmax(56.25%,auto)_auto] grid-cols-[minmax(0,100%)] relative w-full h-full z-10'>
      <div
        className='absolute inset-0 -m-4 rounded-[10px] overflow-hidden bg-gray-900 text-white transition-[clip-path] duration-300 ease-in-out delay-100'
        style={{
          borderRadius: '10px',
        }}
      ></div>

      <div className='grid-area-[preview] relative opacity-[.99] rounded-[6px] overflow-hidden grid items-stretch'>
        <div className='h-full rounded-[6px] pt-[56.25%] bg-[#444857] text-[var(#717790] bg-cover relative'>
          <div>
            <picture>
              <img
                className='block absolute top-0 left-0 w-full h-full object-cover'
                src={imageUrl}
                alt='Article preview'
              />
            </picture>
          </div>
          <a
            href='#'
            className='absolute inset-0 border-0 !important z-[1]'
          ></a>
        </div>
      </div>

      <div>
        <header className='flex items-center mt-4 relative col-span-full row-start-[header]'>
          <a href='#' className='block mr-3 relative z-10'>
            <img
              className='block w-10 h-10 bg-[#444857] overflow-hidden text-[10px] leading-none font-mono rounded-md'
              src={profileUrl}
              alt='Author profile'
            />
          </a>
          <div className='w-[95%] overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-4'>
            <h2 className='font-black text-[17px] mb-1 block text-[#fff]'>
              <a href='#'>{title}</a>
            </h2>
            <p className='text-[#b7bbc8] text-[14px] leading-[1.2]'>
              <a href='#'>{author}</a>
            </p>
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
  );
};
