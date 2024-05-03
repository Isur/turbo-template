import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>
        Welcome Home! <ModeToggle />
        <Link to="/auth/login">Auth</Link>
      </h3>
    </div>
  );
}
