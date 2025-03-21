import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';


export const HtmlAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code className='text-[13px] leading-[1.3]' style={{ color: textColor }}>
      <TypeAnimation
        sequence={[
          '<div',
          1000,
          '<div class',
          1000,
          '<div class=',
          1000,
          '<div class="rect"',
          1000,
          '<div class="rect"></div> ',
          1000,
        ]}
        repeat={0}
      />
    </code>
  );
};

export const CssAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code className='text-[13px] leading-[1.3]' style={{ color: textColor }}>
      <TypeAnimation
        sequence={[
          '.rect {',
          1000,
          'background: linear-gradient(',
          1000,
          '-119deg,',
          1000,
          '$gray 0%,',
          1000,
          '$dark-gray 100%',
          1000,
          '); }',
          1000,
        ]}
        repeat={0}
      />
    </code>
  );
};


export const JsAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code className='text-[13px] leading-[1.3]' style={{ color: textColor }}>
      <TypeAnimation
        sequence={[
          'var colors = [',
          1000,
          '"#74B087",',
          1000,
          '"#DE7300",',
          1000,
          '"#74B087"',
          1000,
          '];',
          1000,
          '\n\nfunction animate() {};',
          1000,
        ]}
        repeat={0}
      />
    </code>
  );
};



