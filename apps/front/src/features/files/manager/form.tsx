import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const FileUpdateSchema = z.object({
  name: z.string().min(6),
});

export type FileUpdateSchema = z.infer<typeof FileUpdateSchema>;

export const useFileForm = ({ defaults }: { defaults: FileUpdateSchema }) => {
  const form = useForm<FileUpdateSchema>({
    resolver: zodResolver(FileUpdateSchema),
    defaultValues: defaults,
  });

  return { form };
};
