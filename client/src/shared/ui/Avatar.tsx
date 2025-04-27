import cn from 'classnames';

type Props = {
  username: string;
  className?: string;
};

export const Avatar = ({ username, className }: Props) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center w-12 h-12 text-black font-bold bg-red-100 rounded-full'
      )}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  );
};
