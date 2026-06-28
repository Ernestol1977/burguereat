import { useState } from "react";
import { apiRequest } from "../api";
import { AuthContext } from "./auth.context";

const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveSession = (session) => {
    localStorage.setItem("token", session.token);
    localStorage.setItem("user", JSON.stringify(session.user));
    setToken(session.token);
    setUser(session.user);
  };

  const login = async (credentials) => {
    const session = await apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
      token: null,
    });
    saveSession(session);
    return session.user;
  };

  const register = async (data) => {
    const session = await apiRequest("/auth/register", {
      method: "POST",
      body: data,
      token: null,
    });
    saveSession(session);
    return session.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user && token),
  };

  return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>;
};
