import { QueryClient } from "@tanstack/react-query";
import { AuthContextProps } from "./features/auth";

export type RootContext = {
  queryClient: QueryClient;
  auth: AuthContextProps;
};
