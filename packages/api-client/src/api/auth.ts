import { apiClient } from "../client";

export type LoginResponse = {
  access_token: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const data = await apiClient<LoginResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });
  return data;
}

export async function logout(): Promise<void> {
  await apiClient<void>({ url: "/auth/logout", method: "DELETE" });
}

export type ProfileResponse = {
  id: number;
  name: string;
};

export async function getProfile() {
  const data = await apiClient<ProfileResponse>({ url: "/auth/profile" });
  return data;
}
