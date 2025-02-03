type Props = {
  code: string;
};

export const Output = ({ code }: Props) => {
  return <iframe width='100%' height='100%' srcDoc={code} />;
};
