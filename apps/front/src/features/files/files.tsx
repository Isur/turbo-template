import { FC } from "react";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FileUpload } from "./file";
import { useUpload } from "./uploadContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Files: FC = () => {
  const { files, state, removeFile } = useUpload();
  const { t } = useTranslation("upload");

  const uploading = state === "uploading";

  return (
    <ScrollArea className="h-[300px] border flex gap-4">
      {!uploading &&
        files.map((file, index) => (
          <FileUpload
            key={index}
            id={index}
            removeFile={removeFile}
            file={file}
          />
        ))}

      {uploading && (
        <div className="flex justify-center items-center gap-4 p-4">
          <Upload /> {t("uploading")}
        </div>
      )}
    </ScrollArea>
  );
};
