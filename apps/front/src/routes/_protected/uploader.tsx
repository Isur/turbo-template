import { createFileRoute } from "@tanstack/react-router";
import { UploaderExample } from "@/features/files";

export const Route = createFileRoute("/_protected/uploader")({
  component: UploaderExample,
});
