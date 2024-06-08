import { z } from "zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ context, search }) => {
    const auth = await context.auth.getProfile();
    if (auth) {
      throw redirect({
        to: search.redirect || "/",
      });
    }
  },
  component: AuthLayout,
});
