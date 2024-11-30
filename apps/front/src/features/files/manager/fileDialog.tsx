import { FC } from "react";
import { FileApiType } from "@repo/api-client";
import { File } from "lucide-react";
import { UpdateFileForm } from "./file.form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const FileDialog: FC<{ file: FileApiType.AppFile }> = ({ file }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-row">
        <File /> {file.originalName}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">{file.originalName}</DialogTitle>
          <DialogDescription asChild>
            <UpdateFileForm
              defaults={{ name: file.originalName }}
              fileId={file.id}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
