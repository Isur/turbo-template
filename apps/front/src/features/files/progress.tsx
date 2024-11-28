import { FC } from "react";
import { useUpload } from "./uploadContext";
import { Progress } from "@/components/ui/progress";

export const UploadProgress: FC = () => {
  const { progress, state } = useUpload();
  if (state !== "uploading") return;

  return <Progress value={progress} />;
};
