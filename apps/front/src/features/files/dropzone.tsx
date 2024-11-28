import { UploadIcon } from "lucide-react";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useUpload } from "./uploadContext";

export const Dropzone: FC = () => {
  const { onFilesChange, state } = useUpload();
  const { t } = useTranslation("upload");

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: onFilesChange,
  });

  const isDisabled = state === "uploading";
  return (
    <div
      className="flex items-center justify-center w-full"
      {...getRootProps()}
    >
      <input {...getInputProps()} disabled={isDisabled} />
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <UploadIcon />
        <span className="font-semibold"> {t("clickToUpload")} </span>
        <p className="text-xs text-grey-500"> PNG, JPG </p>
      </div>
    </div>
  );
};
