export type UploadFileRequest = {
  file: File;
};
export type UploadFileResponse = File;

export type UploadMultipleFilesRequest = {
  files: Array<File>;
};

export type UploadMultipleFilesResponse = Array<File>;
