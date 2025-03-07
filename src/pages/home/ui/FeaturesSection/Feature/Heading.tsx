type Props = {
  children: string;
};

export const Heading = ({ children }: Props) => {
  return <h2 className='text-3xl font-bold mb-4'>{children}</h2>;
};
