import { apiClient } from "../client";

type GetHelloResponse = string;

export async function getHello(): Promise<GetHelloResponse> {
  const response = await apiClient<GetHelloResponse>({
    url: "",
  });

  return response;
}
