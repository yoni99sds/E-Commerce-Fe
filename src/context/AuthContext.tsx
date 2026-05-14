import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { loginUser, registerUser } from "../api/authApi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<User | null>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | null>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ✅ RESTORE SESSION ON REFRESH
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");
    const token =
      localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsed =
          JSON.parse(storedUser);

        setUser({
          ...parsed,
          token,
        });
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const data = await loginUser(
        email,
        password
      );

      const userData: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      };

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      toast.success(
        "Login successful"
      );

      return userData;
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Login failed"
      );
      return null;
    }
  };

  // REGISTER
  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await registerUser(
        name,
        email,
        password
      );

      const userData: User = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      };

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      toast.success(
        "Account created"
      );

      return userData;
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Register failed"
      );
      return null;
    }
  };

  // LOGOUT
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);

  toast.success("Logged out");

  // 👇 force redirect to home
  window.location.href = "/";
};
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin:
          user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuth must be used within AuthProvider"
    );

  return context;
};