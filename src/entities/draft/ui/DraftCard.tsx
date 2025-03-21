import { Link } from 'react-router';

type Props = {
  to: string;
};

export const DraftCard = ({ to }: Props) => {
  return (
    <figure className='group relative p-4 pb-2'>
      <Link to={to}>
        <div className='absolute top-8 left-8 right-0 bottom-0 bg-[#1E1F25] rounded-lg transition-all ease-in-out group-hover:top-0 group-hover:left-0'></div>

        <div className='relative z-10'>
          <img src='https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png' />
          <div className='flex items-center'>
            {/* Avatar */}
            <div className='w-10 h-10 mr-2 bg-red-100 rounded-lg'></div>
            <div>
              <p className='font-extrabold'>Project Title</p>
              <p className='text-[#b7bbc8]'>Author Name</p>
            </div>
          </div>
        </div>
      </Link>
    </figure>
  );
};
