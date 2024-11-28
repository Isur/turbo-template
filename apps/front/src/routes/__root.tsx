import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { RootContext } from "@/route.context";

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <div className="w-[100vw] h-[100vh] h-max-[100vh] w-max-[100vw]">
      <Outlet />
    </div>
  ),
});
