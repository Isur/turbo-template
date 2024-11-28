import { FC } from "react";
import { UploadButton } from "./uploadButton";
import { UploadProgress } from "./progress";
import { UploadResult } from "./uploadResult";
import { Dropzone } from "./dropzone";
import { Files } from "./files";
import { FunctionUpload, UploadProviderFactoryType } from "../uploadContext";

export const FileUploader: FC<{
  ctx: UploadProviderFactoryType;
  func: FunctionUpload;
}> = ({ ctx, func }) => {
  return (
    <ctx.Provider funcUpload={func}>
      <div className="w-[800px]">
        <Dropzone context={ctx.Context} />
        <UploadButton context={ctx.Context} />
        <UploadProgress context={ctx.Context} />
        <Files context={ctx.Context} />
        <UploadResult context={ctx.Context} />
      </div>
    </ctx.Provider>
  );
};
