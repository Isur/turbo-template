import { createFileRoute, redirect } from "@tanstack/react-router";
import { MainLayout } from "@/features/layouts/mainLayout";

export const Route = createFileRoute("/_protected")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    const auth = await context.auth.getProfile();
    if (auth === null) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
