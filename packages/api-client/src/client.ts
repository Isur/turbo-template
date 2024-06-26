import axios from "axios";
import { ApiError } from "./error";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

type ApiRequest = {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  params?: {
    [key: string]: string | number | boolean | Date;
  };
  data?: unknown;
};

export async function apiClient<TResponse>({
  url,
  method = "GET",
  params,
  data,
}: ApiRequest): Promise<TResponse> {
  try {
    const res = await api.request<TResponse>({
      url,
      method,
      params,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return res.data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw err;
    }
    if (err.response?.data.timestamp) {
      throw new ApiError(err.response.data);
    }

    throw err;
  }
}
