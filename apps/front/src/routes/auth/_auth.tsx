import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createFileRoute("/auth/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
      <Link to="/">Home</Link>
      <ModeToggle />
      <div className="p-16">
        <Outlet />
      </div>
    </div>
  );
}
