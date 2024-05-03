import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import App from "@/App";

export const Route = createRootRoute({
  component: () => (
    <div className="w-[100vw] h-[100vh]">
      <App>
        <Outlet />
      </App>
      <TanStackRouterDevtools />
    </div>
  ),
});
