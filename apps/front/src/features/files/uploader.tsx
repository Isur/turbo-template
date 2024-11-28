import { FC } from "react";
import { FileApi } from "@repo/api-client";
import { useTranslation } from "react-i18next";
import { Dropzone } from "./dropzone";
import { UploadProgress } from "./progress";
import { Files } from "./files";
import { UploadProvider } from "./uploadContext";
import { UploadButton } from "./uploadButton";
import { UploadResult } from "./uploadResult";

export const Uploader: FC = () => {
  const { t } = useTranslation("upload");
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("uploader")}
      </h1>
      <UploadProvider funcUpload={FileApi.uploadFiles}>
        <div className="w-[800px]">
          <Dropzone />
          <UploadButton />
          <UploadProgress />
          <Files />
          <UploadResult />
        </div>
      </UploadProvider>
    </div>
  );
};
