type Props = {
  imgUrl: string;
  isVisible: boolean;
};

export const ImageListCard = ({ imgUrl, isVisible }: Props) => {
  return (
    <li className={`absolute top-0 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <img className='max-w-full h-auto' src={imgUrl} alt='' />
    </li>
  );
};
