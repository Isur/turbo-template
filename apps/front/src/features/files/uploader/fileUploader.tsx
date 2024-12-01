import { FC } from "react";
import { FunctionUpload, UploadProviderFactoryType } from "../uploadContext";
import { UploadButton } from "./uploadButton";
import { UploadProgress } from "./progress";
import { UploadResult } from "./uploadResult";
import { Dropzone } from "./dropzone";
import { Files } from "./files";
import { FreeSpace } from "./freeSpace";

export const FileUploader: FC<{
  ctx: UploadProviderFactoryType;
  func: FunctionUpload;
  queryKey: Array<string>;
}> = ({ ctx, func, queryKey }) => {
  return (
    <ctx.Provider funcUpload={func} queryKey={queryKey}>
      <div className="w-[800px]">
        <FreeSpace context={ctx.Context} />
        <Dropzone context={ctx.Context} />
        <UploadButton context={ctx.Context} />
        <UploadProgress context={ctx.Context} />
        <Files context={ctx.Context} />
        <UploadResult context={ctx.Context} />
      </div>
    </ctx.Provider>
  );
};
