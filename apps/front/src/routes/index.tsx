import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthContext } from "@/features/auth/authContext";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/lang-toggle";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!(await context.auth.getProfile())) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: Index,
});

function Index() {
  const auth = useContext(AuthContext);
  const { t } = useTranslation("common");
  const router = useRouter();
  const logout = () => {
    auth.logout();

    router.navigate({
      to: "/auth/login",
    });
  };
  return (
    <div className="p-2">
      <h3>
        {t("welcome")} <ModeToggle /> <LangToggle />
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
        <Link to="/todos">
          <Button variant="outline"> Todos </Button>
        </Link>
      </h3>
    </div>
  );
}
