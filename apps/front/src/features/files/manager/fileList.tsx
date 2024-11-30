import { FC } from "react";
import { useFiles } from "./useFiles";
import { FileDialog } from "./fileDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FileList: FC = () => {
  const { data: files } = useFiles();
  return (
    <ScrollArea className="h-[300px] w-full pl-8 pr-8">
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <FileDialog key={file.id} file={file} />
        ))}
      </div>
    </ScrollArea>
  );
};
