import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/_auth")({
  beforeLoad: async ({ context }) => {
    if (await context.auth.isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="w-[100%] h-[100%] m-0 p-0 flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <Button variant="outline">
          <Link to="/">Home</Link>
        </Button>
        <ModeToggle />
      </div>
      <div className="p-16">
        <Outlet />
      </div>
    </div>
  );
}
