import { ApiTypes } from "@repo/api-client";
import { Context, createContext, PropsWithChildren, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Kek<T = any> = T;

type UploadContext<T = Kek> = {
  state: ApiTypes.FileUploadState;
  progress: number;
  files: Array<File>;
  onFilesChange: (acceptedFiles: Array<File>) => void;
  startUploading: () => void;
  removeFile: (fileId: number) => void;
  result: T | undefined;
};

export type UploadContextType<T = Kek> = Context<UploadContext<T>>;

export type FunctionUpload<T = Kek> = (
  data: { files: Array<File> },
  onProgress: (progress: number, state: ApiTypes.FileUploadState) => void
) => Promise<T>;

type UploadProvider<T> = {
  funcUpload: FunctionUpload<T>;
};

export type UploadProviderFactoryType<T = Kek> = ReturnType<
  typeof UploadProviderFactory<T>
>;

export function UploadProviderFactory<T>() {
  const Context = createContext<UploadContext<T>>({
    startUploading: () => null,
    onFilesChange: () => null,
    state: "wait",
    progress: 0,
    removeFile: () => null,
    files: [],
    result: undefined,
  });

  const Provider = ({
    children,
    funcUpload,
  }: PropsWithChildren<UploadProvider<T>>) => {
    const [progress, setProgress] = useState<number>(0);
    const [uploadState, setUploadState] =
      useState<ApiTypes.FileUploadState>("wait");
    const [files, setFiles] = useState<Array<File>>([]);
    const [result, setResult] = useState<T>();

    const startUploading = async () => {
      setUploadState("uploading");
      const r = await funcUpload({ files }, onUpdateState);
      setResult(r);
      setUploadState("done");
      setFiles([]);
    };

    const onUpdateState = (
      progress: number,
      state: ApiTypes.FileUploadState
    ) => {
      setProgress(progress);
      setUploadState(state);
    };

    const onFilesChange = (acceptedFiles: Array<File>) => {
      setUploadState("wait");
      setResult(undefined);
      setFiles([...files, ...acceptedFiles]);
    };

    const removeFile = (fileId: number) => {
      const newFiles = files.filter((_, index) => index !== fileId);
      setFiles(newFiles);
    };

    return (
      <Context.Provider
        value={{
          progress,
          state: uploadState,
          files,
          onFilesChange,
          startUploading,
          removeFile,
          result,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
}
