import { useState } from 'react';
import { AuthContext } from './auth-context';

const readStoredUser = () => {
  const storedUser = localStorage.getItem('kirana_user');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('kirana_user');
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem('kirana_token'));

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('kirana_token', authToken);
    localStorage.setItem('kirana_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kirana_token');
    localStorage.removeItem('kirana_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}