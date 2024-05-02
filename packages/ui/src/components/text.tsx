import { FC } from "react";

export interface TextProps {
  text: string;
}

const Text: FC<TextProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default Text;
