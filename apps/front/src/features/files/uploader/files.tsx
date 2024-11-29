import { FC, useContext } from "react";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UploadContextType } from "../uploadContext";
import { FileUpload } from "./file";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Files: FC<{ context: UploadContextType }> = ({ context }) => {
  const { files, state, removeFile } = useContext(context);
  const { t } = useTranslation("upload");

  const uploading = state === "uploading" || state === "processing";

  if (uploading) {
    return (
      <div className="h-[300px] justify-center items-center border flex gap-4">
        <div className="flex justify-center items-center gap-4 p-4">
          <Upload /> {t(state)} {t("wait")}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] border flex gap-4">
      {files.map((file, index) => (
        <FileUpload
          key={index}
          id={index}
          removeFile={removeFile}
          file={file}
        />
      ))}
    </ScrollArea>
  );
};
