import { authApi } from "@repo/api-client";
import {
  PropsWithChildren,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

export interface AuthContextProps {
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getProfile: () => Promise<{ id: number; name: string } | null>;
  profile: { id: number; name: string } | null;
}

export const AuthContext = createContext<AuthContextProps>({
  login: async () => {},
  logout: async () => {},
  getProfile: async () => ({ id: 0, name: "" }),
  profile: { id: 0, name: "" },
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<{ id: number; name: string } | null>(
    null
  );

  useEffect(() => {
    getProfile();
  }, []);

  const login = async (login: string, password: string) => {
    await authApi.login({ login, password });
    const profile = await authApi.getProfile();
    setProfile(profile);
  };

  const logout = async () => {
    setProfile(null);
    await authApi.logout();
  };

  const getProfile = async () => {
    if (profile) {
      return profile;
    } else {
      try {
        const prof = await authApi.getProfile();
        setProfile(prof);
        return prof;
      } catch {
        return null;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, getProfile, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
