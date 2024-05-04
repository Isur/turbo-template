import { createFileRoute } from "@tanstack/react-router";
import { ForgetPasswordForm } from "@/features/auth/forgetPassword";

export const Route = createFileRoute("/auth/forget-password")({
  component: LoginView,
});

function LoginView() {
  return <ForgetPasswordForm />;
}
