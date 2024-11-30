import { useSuspenseQuery } from "@tanstack/react-query";
import { getFileListQueryOptions } from "../filesQueryOptions";

export const useFiles = () => {
  const files = useSuspenseQuery(getFileListQueryOptions);
  return files;
};
