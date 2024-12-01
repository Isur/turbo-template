import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UploadContextType } from "../uploadContext";
import { Button } from "@/components/ui/button";

export const UploadButton: FC<{ context: UploadContextType }> = ({
  context,
}) => {
  const { state, files, startUploading, freeSpace } = useContext(context);
  const { t } = useTranslation("upload");

  if (!files.length) return;
  if (state !== "wait") return;

  const size = files.reduce((acc, curr) => acc + curr.size, 0);

  if (size > freeSpace / 2)
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-4">
        To much, cannot upload!
      </h1>
    );

  return <Button onClick={startUploading}> {t("uploadAll")} </Button>;
};
