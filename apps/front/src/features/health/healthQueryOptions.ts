import { queryOptions } from "@tanstack/react-query";

type Health = {
  status: "ok" | "error";
  info: Record<string, { status: "up" }>;
  error: Record<string, { status: "error"; message: string }>;
  details: Record<string, { status: "up" | "error"; message?: string }>;
};

export const getHealthQueryOptions = queryOptions({
  queryKey: ["health"],
  queryFn: async (): Promise<Health> => {
    const response = await fetch("/api/health");
    return await response.json();
  },
});
