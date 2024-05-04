import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/authLayout";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    if (await context.auth.isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayout,
});
