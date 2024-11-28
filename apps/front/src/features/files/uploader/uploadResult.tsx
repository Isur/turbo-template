import { FC, useContext } from "react";
import { UploadContextType } from "../uploadContext";

export const UploadResult: FC<{ context: UploadContextType }> = ({
  context,
}) => {
  const { result, state } = useContext(context);

  if (state !== "done" && !result) return;

  return (
    <div>
      <pre> {JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
