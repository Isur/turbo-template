import { createFileRoute, redirect } from "@tanstack/react-router";
import { MainLayout } from "@/features/layouts/mainLayout";

export const Route = createFileRoute("/_protected")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    if (!(await context.auth.isLoggedIn())) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
});
