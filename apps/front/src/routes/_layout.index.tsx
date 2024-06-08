import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  beforeLoad: async ({ context }) => {
    if (!(await context.auth.getProfile())) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: Index,
});

function Index() {
  return (
    <div className="p-4 flex justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Home page
      </h1>
    </div>
  );
}
