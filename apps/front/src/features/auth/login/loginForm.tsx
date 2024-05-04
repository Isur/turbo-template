import { FC } from "react";
import { Link } from "@tanstack/react-router";
import { useLoginForm } from "./useLoginForm";
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
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  redirect?: string;
};

export const LoginForm: FC<LoginFormProps> = ({ redirect }) => {
  const { form, onSubmit } = useLoginForm({ redirect });

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
};
