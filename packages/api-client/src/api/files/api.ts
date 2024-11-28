import { FileUploadState } from "../../types";
import { fileApiClient } from "../../client";
import {
  UploadFileRequest,
  UploadFileResponse,
  UploadMultipleFilesRequest,
  UploadMultipleFilesResponse,
} from "./types";

export async function uploadFile(
  data: UploadFileRequest,
  onUploadProgress: (progress: number, state: FileUploadState) => void
): Promise<UploadFileResponse> {
  const response = await fileApiClient<UploadFileResponse>({
    method: "POST",
    url: "/files/upload",
    files: [
      {
        file: data.file,
        field: "file",
      },
    ],
    onUploadProgress,
  });

  return response;
}

export async function uploadFiles(
  data: UploadMultipleFilesRequest,
  onUploadProgress: (progress: number, state: FileUploadState) => void
): Promise<UploadMultipleFilesResponse> {
  const response = await fileApiClient<UploadMultipleFilesResponse>({
    method: "POST",
    url: "/files/upload-multiple",
    fileArray: {
      files: data.files,
      field: "files",
    },
    onUploadProgress,
  });

  return response;
}
