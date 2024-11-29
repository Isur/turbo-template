export type AppFile = {
  id: string;
  originalName: string;
  mimetype: string;
  path: string;
  size: number;
  date: Date;
};

export type UploadFileRequest = {
  file: File;
};
export type UploadFileResponse = AppFile;

export type UploadMultipleFilesRequest = {
  files: Array<File>;
};

export type UploadMultipleFilesResponse = Array<AppFile>;

export type GetFileListResponse = Array<AppFile>;
export type GetFileResponse = AppFile;
export type PatchFileResponse = AppFile;
export type PatchFileRequest = { name: string };
