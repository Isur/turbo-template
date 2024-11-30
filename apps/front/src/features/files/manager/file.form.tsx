import { FC } from "react";
import { Download, Trash2, Send } from "lucide-react";
import { useFileManager } from "./useFileManager";
import { type FileUpdateSchema, useFileForm } from "./form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export const UpdateFileForm: FC<{
  defaults: FileUpdateSchema;
  fileId: string;
}> = ({ defaults, fileId }) => {
  const { form } = useFileForm({ defaults });
  const { updateFile, deleteFile, downloadFile } = useFileManager(fileId);

  function onSubmit(data: FileUpdateSchema) {
    updateFile.mutate(data.name);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the file. Do not change the .extension.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button type="submit">
            <Send />
            Submit
          </Button>
          <Button variant="destructive" onClick={() => deleteFile.mutate()}>
            <Trash2 /> Delete
          </Button>
          <Button variant="default" onClick={() => downloadFile()}>
            <Download /> Download
          </Button>
        </div>
      </form>
    </Form>
  );
};
