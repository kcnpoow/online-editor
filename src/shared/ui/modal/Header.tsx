import cn from 'classnames';

type Props = {
  className?: string;
  title?: string;
};

export const ModalHeader = ({ className, title }: Props) => {
  return (
    <header className={cn('mx-4 py-3 border-b-2 border-secondary', className)}>
      <span className='relative inline-block font-semibold after:content-[""]  after:absolute after:-bottom-3.5 after:left-0 after:h-0.5 after:w-full after:bg-success'>
        {title}
      </span>
    </header>
  );
};
