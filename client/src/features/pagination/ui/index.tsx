import { Button } from '@shared/ui/Button';

type Props = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, last, onPageChange }: Props) => {
  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!last && page < totalPages - 1) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className='flex items-center gap-x-4'>
      <Button color='tertiary' onClick={handlePrevious} disabled={page === 0}>
        Previous
      </Button>

      <span className='font-semibold'>
        {page + 1} of {totalPages}
      </span>

      <Button color='tertiary' onClick={handleNext} disabled={last}>
        Next
      </Button>
    </div>
  );
};
