type Props = {
  connectedUsers: string[];
};

export const ConnectedUsers = ({ connectedUsers }: Props) => {
  return (
    <ul className='flex'>
      {connectedUsers.map((user) => (
        <li className='not-first:-ml-4' key={user}>
          {/* Avatar */}
          <div
            className='w-8 h-8 bg-red-100 rounded-lg border-2 border-black'
            title={user}
          />
        </li>
      ))}
    </ul>
  );
};
