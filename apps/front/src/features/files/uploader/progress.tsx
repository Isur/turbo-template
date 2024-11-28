import { FC, useContext } from "react";
import { UploadContextType } from "../uploadContext";
import { Progress } from "@/components/ui/progress";

export const UploadProgress: FC<{ context: UploadContextType }> = ({
  context,
}) => {
  const { progress, state } = useContext(context);
  if (state !== "uploading") return;

  return <Progress value={progress} />;
};
