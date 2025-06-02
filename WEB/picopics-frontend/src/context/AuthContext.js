import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aqui você pode adicionar uma chamada para validar o token ou obter dados do usuário
      setUser({ username: localStorage.getItem('username') });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/authenticate', null, {
        params: { username, password }
      });
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', username);
      setUser({ username });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);