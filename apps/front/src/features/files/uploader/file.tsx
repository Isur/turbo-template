import { BanIcon } from "lucide-react";
import { FC } from "react";

export const FileUpload: FC<{
  file: File;
  id: number;
  removeFile: (id: number) => void;
}> = ({ file, id, removeFile }) => {
  return (
    <div className="flex flex-row items-center justify-between p-1 pr-4 border border-dashed">
      <div>{file.name}</div>
      <div>
        <BanIcon
          className="hover:cursor-pointer"
          onClick={() => removeFile(id)}
        />
      </div>
    </div>
  );
};
