import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/features/auth/authContext";

export const MainLayout = () => {
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
};
