import { FC } from "react";
import { FileApi, FileApiType } from "@repo/api-client";
import { useTranslation } from "react-i18next";
import { UploadProviderFactory } from "./uploadContext";
import { FileUploader } from "./uploader/fileUploader";

const ctx = UploadProviderFactory<FileApiType.UploadMultipleFilesResponse>();

export const UploaderExample: FC = () => {
  const { t } = useTranslation("upload");
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("uploader")}
      </h1>
      <FileUploader ctx={ctx} func={FileApi.uploadFiles} />
    </div>
  );
};
