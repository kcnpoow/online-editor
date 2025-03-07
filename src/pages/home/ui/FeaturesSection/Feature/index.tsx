import { ReactNode } from 'react';

import { Icon } from './Icon';
import { Heading } from './Heading';
import { Description } from './Description';

type Props = {
  children?: ReactNode;
};

const Feature = ({ children }: Props) => {
  return <article className='p-6 bg-[#2c303a] rounded-xl'>{children}</article>;
};

Feature.Icon = Icon;
Feature.Heading = Heading;
Feature.Description = Description;

export { Feature };
