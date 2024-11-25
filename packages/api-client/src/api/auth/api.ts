import { apiClient } from "../../client";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
} from "./types";

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const data = await apiClient<LoginResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });

  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const data = await apiClient<LogoutResponse>({
    url: "/auth/logout",
    method: "DELETE",
  });
  return data;
}

export async function getProfile() {
  const data = await apiClient<ProfileResponse>({ url: "/auth/profile" });
  return data;
}
