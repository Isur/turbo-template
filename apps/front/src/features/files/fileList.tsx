import { FC, useEffect, useState } from "react";
import { Download, File, Trash2, Upload } from "lucide-react";
import { FileApi, type FileApiType } from "@repo/api-client";
import { useDeleteFile, useFiles, useUpdateFile } from "./useFiles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Name = {
  name: string;
  ext: string;
};

export const FileDialog: FC<{ file: FileApiType.AppFile }> = ({ file }) => {
  const [name, setName] = useState<Name>();
  const { updateFile } = useUpdateFile(file.id);
  const { deleteFile } = useDeleteFile(file.id);

  useEffect(() => {
    changeName(file.originalName);
  }, [file]);

  function changeName(n: string) {
    const arr = n.split(".");
    const ext = arr.length === 1 ? "" : arr.pop()!;
    const newName: Name = { ext, name: arr.join(".") };
    setName(newName);
  }

  const fullName = name ? name.name + "." + name.ext : file.originalName;

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row">
        <File /> {fullName}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">{fullName}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Input
                  value={name?.name}
                  onChange={(event) =>
                    changeName(event.target.value + "." + name?.ext)
                  }
                />
                <Button
                  variant="secondary"
                  onClick={() => updateFile.mutate(fullName)}
                >
                  <Upload />
                </Button>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  onClick={() => deleteFile.mutate()}
                >
                  <Trash2 />
                </Button>
                <Button onClick={() => FileApi.downloadFile(file.id)}>
                  <Download />
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
