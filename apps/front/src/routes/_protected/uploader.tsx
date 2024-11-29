import { createFileRoute } from "@tanstack/react-router";
import { UploaderExample, getFileListQueryOptions } from "@/features/files";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/_protected/uploader")({
  loader: ({ context }) => {
    return context.queryClient.fetchQuery(getFileListQueryOptions);
  },
  component: UploaderExample,
  pendingComponent: Spinner,
});
