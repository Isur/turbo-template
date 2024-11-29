import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FileApi } from "@repo/api-client";
import {
  getFileListQueryOptions,
  getFileQueryOptions,
} from "./filesQueryOptions";

export const useFiles = () => {
  const files = useSuspenseQuery(getFileListQueryOptions);
  return files;
};

export const useFile = (id: string) => {
  const file = useQuery(getFileQueryOptions(id));
  return file;
};

export const useUpdateFile = (id: string) => {
  const client = useQueryClient();

  const updateFile = useMutation({
    mutationFn: (name: string) => FileApi.patchFile(id, { name }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["files"] });
    },
  });

  return { updateFile };
};

export const useDeleteFile = (id: string) => {
  const client = useQueryClient();
  const deleteFile = useMutation({
    mutationFn: () => FileApi.deleteFile(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["files"] });
    },
  });

  return { deleteFile };
};
