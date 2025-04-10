import cn from 'classnames';

type Props = {
  imgUrl: string;
  isVisible: boolean;
};

export const ImageListCard = ({ imgUrl, isVisible }: Props) => {
  return (
    <li className={cn({ hidden: !isVisible })}>
      <img src={imgUrl} alt='Feature Preview' />
    </li>
  );
};
