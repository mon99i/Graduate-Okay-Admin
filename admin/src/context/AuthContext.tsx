import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  loginId: string;
  login: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginId, setLoginId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedLoginId = localStorage.getItem('loginId');
    if(token && storedLoginId){
      setIsLoggedIn(true);
      setLoginId(storedLoginId);
    }
  }, []);

  const login = (id: string) => {
    localStorage.setItem('accessToken', 'mock-access-token');
    localStorage.setItem('loginId', id);
    setLoginId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loginId');
    setLoginId("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext Error');
  }
  return context;
};
