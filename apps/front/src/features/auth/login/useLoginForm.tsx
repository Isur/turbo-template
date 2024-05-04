import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "@tanstack/react-router";
import { AuthContext } from "../authContext";

export const loginFormSchema = z.object({
  login: z.string(),
  password: z.string(),
});

type LoginFormProps = {
  redirect?: string;
};

export const useLoginForm = ({ redirect }: LoginFormProps) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await auth.login(values.login, values.password);

    const navTo = redirect || "/";

    router.navigate({
      to: navTo,
    });
  };

  return { form, onSubmit };
};
