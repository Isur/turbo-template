import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth, AuthProvider } from "./features/auth";
import "./i18n";
import "./index.css";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { TanStackRouterDevtools, TanstackQueryDevtools } from "./devtools";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingMs: 100,
  context: {
    queryClient: undefined!,
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const RouterApp = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  return <RouterProvider router={router} context={{ auth, queryClient }} />;
};

const RootApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterApp />
          <TanStackRouterDevtools router={router} initialIsOpen={false} />
          <TanstackQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RootApp />
    </StrictMode>
  );
}
