import { Link } from 'react-router';

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <Link to='/' className={className}>
      Code Live
    </Link>
  );
};
