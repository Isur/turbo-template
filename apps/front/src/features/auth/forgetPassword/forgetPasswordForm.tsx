import { Link } from "@tanstack/react-router";
import { useForgetPasswordForm } from "./useForgetPasswordForm";
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

export const ForgetPasswordForm = () => {
  const { form, onSubmit } = useForgetPasswordForm();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormDescription>Enter your Email</FormDescription>
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
        <Link to="/auth/login">
          <Button variant="outline" className="w-full" type="button">
            Login
          </Button>
        </Link>
      </Form>
    </div>
  );
};
