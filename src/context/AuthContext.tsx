import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('soilgpt-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('soilgpt-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('soilgpt-user');
    }
  }, [user]);

  const login = (name: string) => {
    setUser({
      name,
      role: 'user',
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;