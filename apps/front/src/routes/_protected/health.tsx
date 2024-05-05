import { createFileRoute } from "@tanstack/react-router";
import { Health, getHealthQueryOptions } from "@/features/health";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/_protected/health")({
  loader: ({ context }) => {
    return context.queryClient.fetchQuery(getHealthQueryOptions);
  },
  component: Health,
  pendingComponent: Spinner,
});
