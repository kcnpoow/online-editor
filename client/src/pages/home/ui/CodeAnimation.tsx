import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const HtmlAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code style={{ color: textColor }}>
      <TypeAnimation sequence={[]} repeat={0} />
    </code>
  );
};

export const CssAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code style={{ color: textColor }}>
      <TypeAnimation sequence={[]} repeat={0} />
    </code>
  );
};

export const JsAnimation = () => {
  const [textColor] = useState('white');

  return (
    <code style={{ color: textColor }}>
      <TypeAnimation sequence={[]} repeat={0} />
    </code>
  );
};
