import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, register, adminLoginAPI } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // eslint-disable-line react-refresh/only-export-components

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await loginAPI(email, password);
    const { token: newToken, user: newUser } = result;
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return result;
  };

  const adminLogin = async (username, password) => {
    const result = await adminLoginAPI(username, password);
    const { token: newToken } = result;
    const adminUser = { role: 'admin', name: 'Administrator' };
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(adminUser));
    setToken(newToken);
    setUser(adminUser);
    return result;
  };

  const signup = async (name, email, password, phone) => {
    // Backend signup (POST /api/auth/signup) returns { success, message, user }
    // but does NOT return a token — user must log in separately after registering.
    const result = await register(name, email, password, phone);
    return result;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        signup,
        adminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
