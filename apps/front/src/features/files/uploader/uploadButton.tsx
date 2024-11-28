import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UploadContextType } from "../uploadContext";
import { Button } from "@/components/ui/button";

export const UploadButton: FC<{ context: UploadContextType }> = ({
  context,
}) => {
  const { state, files, startUploading } = useContext(context);
  const { t } = useTranslation("upload");

  if (!files.length) return;
  if (state !== "wait") return;

  return <Button onClick={startUploading}> {t("uploadAll")} </Button>;
};
