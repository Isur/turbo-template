import { createFileRoute, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_layout/")({
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
  const { t } = useTranslation("common");
  return (
    <div className="p-4 flex justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("mainPage")}
      </h1>
    </div>
  );
}
