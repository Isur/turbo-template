import { FC, useContext } from "react";
import { UploadContextType } from "../uploadContext";

const info = ["B", "KB", "MB", "GB", "tB"];

function sizeToText(size: number) {
  let x = size;
  const space: Array<number> = [];
  do {
    space.push(x);
    x /= 1024;
  } while (x > 1);
  const last = space.length - 1;
  return `${space[last]?.toFixed(2)} ${info[last]}`;
}

export const FreeSpace: FC<{ context: UploadContextType }> = ({ context }) => {
  const { freeSpace, files } = useContext(context);
  const sizeU = files.reduce((acc, cur) => {
    return acc + cur.size;
  }, 0);

  const free = sizeToText(freeSpace);
  const uploaded = sizeToText(sizeU) || 0;
  return (
    <div>
      <p>Free: {free}</p>
      <p>Uploaded: {uploaded}</p>
    </div>
  );
};
