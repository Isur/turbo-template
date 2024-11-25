export type LoginResponse = {
  access_token: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type LogoutResponse = {
  message: string;
};

export type ProfileResponse = {
  id: number;
  name: string;
};
