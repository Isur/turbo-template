import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/features/mainLayout";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});
