import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/features/auth/authContext";
import { ModeToggle } from "@/components/mode-toggle";
import { LangToggle } from "@/components/lang-toggle";

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
      <ModeToggle /> <LangToggle />
      <Link to="/">
        <Button variant="outline"> Home </Button>
      </Link>
      <Link to="/todos">
        <Button variant="outline"> Todos </Button>
      </Link>
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
      <Outlet />
    </div>
  );
};
