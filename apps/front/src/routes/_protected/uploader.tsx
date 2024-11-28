import { createFileRoute } from "@tanstack/react-router";
import { Uploader } from "@/features/files";

export const Route = createFileRoute("/_protected/uploader")({
  component: Uploader,
});
