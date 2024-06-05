import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import App from "@/App";
import { AuthContextProps } from "@/features/auth/authContext";

type RootContext = {
  queryClient: QueryClient;
  auth: AuthContextProps;
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <div className="w-[100vw] h-[100vh]">
      <App>
        <Outlet />
      </App>
    </div>
  ),
});
