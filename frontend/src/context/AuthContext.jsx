import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchSession, logoutRequest } from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchSession()
      .then((data) => {
        if (!isMounted) return;
        if (data.authenticated) {
          setToken(data.token || "");
          setUser(data.user || null);
        }
      })
      .catch(() => null);
    return () => {
      isMounted = false;
    };
  }, []);

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
  };

  const updateProfile = (data) => {
    setUser(data);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // ignore logout errors, still clear local state
    }
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      updateProfile,
      isAuthenticated: Boolean(token)
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
