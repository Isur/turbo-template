import axios, { GenericAbortSignal, AxiosError, AxiosResponse } from "axios";
import { ApiError } from "./error";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

const fileApi = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/auth/")
    ) {
      window.location.href = "/auth/login";
    }

    throw error;
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

type FileApiRequest = ApiRequest & {
  files?: Array<{
    field: string;
    file: File;
  }>;
  fileArray?: {
    field: string;
    files: Array<File>;
  };
  onUploadProgress?: (progress: number) => void;
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

export async function fileApiClient<TResponse>({
  url,
  method = "GET",
  params,
  data,
  signal,
  files,
  fileArray,
  onUploadProgress,
}: FileApiRequest): Promise<TResponse> {
  try {
    const formData = new FormData();
    if (files) {
      for (const file of files) {
        formData.append(file.field, file.file);
      }
    }

    if (fileArray) {
      for (const file of fileArray.files) {
        formData.append(`${fileArray.field}`, file);
      }
    }

    if (data) {
      const dataKeys = Object.keys(data);
      for (const key of dataKeys) {
        formData.append(key, data[key]);
      }
    }

    const res = await fileApi.request<TResponse>({
      url,
      method,
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      signal,
      onUploadProgress: (event) => {
        if (!onUploadProgress) return;

        const progress = event.progress;

        if (event.loaded === event.total) {
          onUploadProgress(100);
          return;
        }

        if (!progress) {
          onUploadProgress(0);
        } else {
          onUploadProgress(Math.ceil(progress * 100));
        }
      },
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
