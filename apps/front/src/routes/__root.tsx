import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import App from "@/App";
import { IAuthContext } from "@/features/auth/authContext";

type RootContext = {
  queryClient: QueryClient;
  auth: IAuthContext;
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <div className="w-[100vw] h-[100vh]">
      <App>
        <Outlet />
      </App>
      <TanStackRouterDevtools />
    </div>
  ),
});
