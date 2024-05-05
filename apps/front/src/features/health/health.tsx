import { useHealth } from "./useHealth";

export const Health = () => {
  const { health } = useHealth();

  return (
    <div>
      <h1>Health</h1>
      <pre>{JSON.stringify(health.data, null, 2)}</pre>
    </div>
  );
};
