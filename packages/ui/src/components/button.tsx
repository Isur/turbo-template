export type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps): JSX.Element {
  return <button className="ui-text-8xl ui-text-sky-500">{text}</button>;
}
