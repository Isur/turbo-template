import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/features/auth";

export const Route = createFileRoute("/auth/register")({
  component: RegisterView,
});

function RegisterView() {
  return <RegisterForm />;
}
