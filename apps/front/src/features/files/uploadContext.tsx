import { ApiTypes } from "@repo/api-client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  FC,
  useState,
} from "react";

type UploadContext = {
  state: ApiTypes.FileUploadState;
  progress: number;
  files: Array<File>;
  onFilesChange: (acceptedFiles: Array<File>) => void;
  onUpdateState: (progress: number, state: ApiTypes.FileUploadState) => void;
  startUploading: () => void;
  removeFile: (fileId: number) => void;
  result: unknown;
};

export const UploadContext = createContext<UploadContext | undefined>(
  undefined
);

export const useUpload = () => {
  const context = useContext(UploadContext);

  if (!context) {
    throw new Error("useContext must be used within an uploadProvider");
  }

  return context;
};

type UploadProvider = {
  funcUpload: (
    data: { files: Array<File> },
    onProgress: (progress: number, state: ApiTypes.FileUploadState) => void
  ) => Promise<Array<File>>;
};

export const UploadProvider: FC<PropsWithChildren<UploadProvider>> = ({
  children,
  funcUpload,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploadState, setUploadState] =
    useState<ApiTypes.FileUploadState>("wait");
  const [files, setFiles] = useState<Array<File>>([]);
  const [result, setResult] = useState<unknown>(null);

  const startUploading = async () => {
    setUploadState("uploading");
    const r = await funcUpload({ files }, onUpdateState);
    setResult(r);
    setUploadState("done");
    setFiles([]);
  };

  const onUpdateState = (progress: number, state: ApiTypes.FileUploadState) => {
    setProgress(progress);
    setUploadState(state);
  };

  const onFilesChange = (acceptedFiles: Array<File>) => {
    setUploadState("wait");
    setResult(null);
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (fileId: number) => {
    const newFiles = files.filter((_, index) => index !== fileId);
    setFiles(newFiles);
  };

  return (
    <UploadContext.Provider
      value={{
        progress,
        state: uploadState,
        files,
        onFilesChange,
        onUpdateState,
        startUploading,
        removeFile,
        result,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
