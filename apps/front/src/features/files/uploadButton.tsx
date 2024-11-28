import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useUpload } from "./uploadContext";
import { Button } from "@/components/ui/button";

export const UploadButton: FC = () => {
  const { state, files, startUploading } = useUpload();
  const { t } = useTranslation("upload");

  if (!files.length) return;
  if (state !== "wait") return;

  return <Button onClick={startUploading}> {t("uploadAll")} </Button>;
};
