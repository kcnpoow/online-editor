
type Props = {
  imgUrl: string;
};

export const ImageListCard = ({ imgUrl}: Props) => {
  return (
    <li className='absolute top-0'>
      <img
        className='max-w-full h-auto'
        src={imgUrl}
        alt=''
      />
    </li>
  );
};
