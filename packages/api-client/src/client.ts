import axios, { GenericAbortSignal, AxiosError, AxiosResponse } from "axios";
import { ApiError } from "./error";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      error.response.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/login";
    }
  }
);

type ApiRequest = {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  params?: {
    [key: string]: string | number | boolean | Date;
  };
  data?: unknown;
  signal?: GenericAbortSignal;
};

export type RequestOptions = {
  signal?: GenericAbortSignal;
};

export async function apiClient<TResponse>({
  url,
  method = "GET",
  params,
  data,
  signal,
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
      signal,
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
