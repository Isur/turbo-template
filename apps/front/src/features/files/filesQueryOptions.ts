import { queryOptions } from "@tanstack/react-query";
import { FileApi } from "@repo/api-client";

export const getFileListQueryOptions = queryOptions({
  queryKey: ["files"],
  queryFn: FileApi.getFileList,
});

export const getFileQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["file", id],
    queryFn: () => FileApi.getFile(id),
  });
