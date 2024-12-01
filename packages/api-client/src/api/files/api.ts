import { apiClient, fileApiClient } from "../../client";
import {
  GetAvailableSpaceResponse,
  GetFileListResponse,
  GetFileResponse,
  PatchFileRequest,
  PatchFileResponse,
  UploadFileRequest,
  UploadFileResponse,
  UploadMultipleFilesRequest,
  UploadMultipleFilesResponse,
} from "./types";

export async function uploadFile(
  data: UploadFileRequest,
  onUploadProgress: (progress: number) => void
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
  onUploadProgress: (progress: number) => void
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

export async function getFileList(): Promise<GetFileListResponse> {
  const response = await apiClient<GetFileListResponse>({
    method: "GET",
    url: "/files",
  });

  return response;
}

export async function getFile(id: string): Promise<GetFileResponse> {
  const response = await apiClient<GetFileResponse>({
    method: "GET",
    url: "/files/" + id,
  });

  return response;
}

export async function patchFile(
  id: string,
  body: PatchFileRequest
): Promise<PatchFileResponse> {
  const response = await apiClient<PatchFileResponse>({
    method: "PATCH",
    url: "/files/" + id,
    data: body,
  });

  return response;
}

export async function downloadFile(id: string) {
  const url = `/api/files/${id}/download`;
  const link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

export async function deleteFile(id: string) {
  await apiClient({
    method: "DELETE",
    url: "/files/" + id,
  });
}

export async function getAvailableSpace(): Promise<GetAvailableSpaceResponse> {
  const response = await apiClient<GetAvailableSpaceResponse>({
    url: "/files/stats",
  });

  return response;
}
