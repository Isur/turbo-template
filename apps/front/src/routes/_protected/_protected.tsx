import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/features/auth/authContext";

export const Route = createFileRoute("/_protected/_protected")({
  component: Protected,
  beforeLoad: async ({ context }) => {
    console.log({ context });
    if (!(await context.auth.isLoggedIn())) {
      console.log({ location });
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});

function Protected() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    auth.logout();

    router.navigate({
      to: "/auth/login",
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/todos">Todos</Link>
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
      <Outlet />
    </div>
  );
}
