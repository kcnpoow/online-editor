import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { FaSearch } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('search') || '';
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value.trim()) {
      navigate(`/explore/?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <form className='h-full' onSubmit={handleSubmit}>
      <Input
        className='h-full font-semibold text-lg py-0'
        containerClassName='w-full h-full max-w-80'
        placeholder='Search Draft...'
        icon={<FaSearch />}
        type='search'
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};
