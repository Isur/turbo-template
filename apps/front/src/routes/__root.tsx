import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { RootContext } from "@/route.context";

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <div className="w-[100vw] h-[100vh]">
      <Outlet />
    </div>
  ),
});
