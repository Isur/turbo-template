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
};

export async function apiClient<TResponse>({
  url,
  method = "GET",
  params,
}: ApiRequest): Promise<TResponse> {
  try {
    const res = await api.request<TResponse>({
      url,
      method,
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw err;
    }
    if (
      err.response?.data.error &&
      err.response?.data.code &&
      err.response?.data.status
    ) {
      const { status, error, code } = err.response.data;
      throw new ApiError(error, code, status);
    }

    throw err;
  }
}
