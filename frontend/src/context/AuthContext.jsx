import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const Navigate = useNavigate();
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    Navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
      } else {
        setToken(token);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
