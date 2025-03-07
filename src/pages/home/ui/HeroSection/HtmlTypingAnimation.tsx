import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const HtmlTypingAnimation = () => {
  const [textColor, setTextColor] = useState('white');

  return (
    <code className='text-sm' style={{ color: textColor }}>
      <TypeAnimation
        sequence={[
          '<div',
          1000,
          () => setTextColor('#a88038'),
          '<div class',
          1000,
          () => setTextColor('#e1ca72'),
          '<div class=',
          1000,
          '<div class="rect"',
          1000,
          () => setTextColor('#74b087'),
          '<div class="rect"></div>',
          1000,
          () => setTextColor('#a88038'),
        ]}
      />
    </code>
  );
};
