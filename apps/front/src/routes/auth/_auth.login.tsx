import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/features/auth/authContext";

export const Route = createFileRoute("/auth/_auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginView,
});

const formSchema = z.object({
  login: z.string(),
  password: z.string(),
});

function LoginView() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const search = Route.useSearch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await auth.login(values.login, values.password);

    const navTo = search.redirect || "/";

    console.log(`Redirecting to ${navTo}`);

    router.navigate({
      to: navTo,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Login..." {...field} />
                </FormControl>
                <FormDescription>Enter your username or email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <Separator />
        <Link to="/auth/register">
          <Button variant="outline" className="w-full" type="button">
            Register
          </Button>
        </Link>
        <Link to="/auth/forget-password">
          <Button variant="outline" className="w-full" type="button">
            Forget Password
          </Button>
        </Link>
      </Form>
    </div>
  );
}
