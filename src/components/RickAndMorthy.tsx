import { useApi } from '../hooks/api';

export const RickAndMorthy = () => {
  const { pjs } = useApi();
  return (
    <div>
      {pjs.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
