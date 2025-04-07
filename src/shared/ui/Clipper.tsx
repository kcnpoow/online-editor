type Props = {
  text: string;
};

export const Clipper = ({ text }: Props) => {
  const formattedText = `localhost:5173/edit?collabId=${text}`;

  const handleClick = () => {
    navigator.clipboard.writeText(formattedText);

    alert('clipped');
  };

  return (
    <input
      className='w-full'
      type='text'
      readOnly
      value={formattedText}
      onClick={handleClick}
    />
  );
};
