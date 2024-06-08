import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/features/auth/authContext";
import { ModeToggle } from "@/components/mode-toggle";
import { LangToggle } from "@/components/lang-toggle";

export const MainLayout = () => {
  const { t } = useTranslation("common");
  const auth = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await auth.logout();

    router.navigate({
      to: "/auth/login",
    });
  };

  return (
    <div>
      <nav className="flex items-center p-4 gap-4 outline">
        <ModeToggle />
        <LangToggle />
        <Link to="/">
          <Button variant="outline"> {t("mainLayout.home")} </Button>
        </Link>
        <Link to="/health">
          <Button variant="outline"> {t("mainLayout.health")} </Button>
        </Link>
        <Link to="/todos">
          <Button variant="outline"> {t("mainLayout.todos")} </Button>
        </Link>
        <Button variant="outline" onClick={logout}>
          {t("mainLayout.logout")}
        </Button>
      </nav>
      <Outlet />
    </div>
  );
};
