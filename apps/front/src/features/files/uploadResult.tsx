import { FC } from "react";
import { useUpload } from "./uploadContext";

export const UploadResult: FC = () => {
  const { result, state } = useUpload();

  if (state !== "done" && !result) return;

  return (
    <div>
      <pre> {JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
