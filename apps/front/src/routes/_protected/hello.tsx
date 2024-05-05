import { createFileRoute } from "@tanstack/react-router";
import { Hello, getHelloOptions } from "@/features/hello";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/_protected/hello")({
  loader: async ({ context }) => {
    return context.queryClient.fetchQuery(getHelloOptions);
  },
  component: Component,
  pendingComponent: Pending,
});

function Component() {
  return <Hello />;
}

function Pending() {
  return <Spinner />;
}
