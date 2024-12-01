import { z } from "zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ context, search }) => {
    const auth = await context.auth.getProfile();
    const r = search.redirect?.startsWith(location.origin)
      ? search.redirect.slice(location.origin.length)
      : "/";
    if (auth) {
      throw redirect({
        to: r,
      });
    }
  },
  component: AuthLayout,
});
