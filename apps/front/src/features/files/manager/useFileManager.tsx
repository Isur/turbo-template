import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileApi } from "@repo/api-client";

export const useFileManager = (id: string) => {
  const client = useQueryClient();

  const updateFile = useMutation({
    mutationFn: (name: string) => FileApi.patchFile(id, { name }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const deleteFile = useMutation({
    mutationFn: () => FileApi.deleteFile(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const downloadFile = () => FileApi.downloadFile(id);

  return { updateFile, deleteFile, downloadFile };
};
