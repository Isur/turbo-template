import { useHello } from "./useHello";

export const Hello = () => {
  const { hello } = useHello();

  return <div> {hello.data} </div>;
};
