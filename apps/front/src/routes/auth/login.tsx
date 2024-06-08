import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LoginForm } from "@/features/auth";

export const Route = createFileRoute("/auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginView,
});

function LoginView() {
  const search = Route.useSearch();
  return <LoginForm redirect={search.redirect} />;
}
