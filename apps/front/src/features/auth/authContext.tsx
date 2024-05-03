import { createContext, FC, PropsWithChildren } from "react";

export type IAuthContext = {
  isLoggedIn: () => Promise<boolean>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: async () => false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = async () => localStorage.getItem("user") === "true";

  const login = async (login: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (login !== "admin" || password !== "admin") {
          reject();
        } else {
          localStorage.setItem("user", "true");
          resolve();
        }
      }, 3000);
    });
  };

  const logout = async () => {
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
