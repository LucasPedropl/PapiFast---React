import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User, UserRole, Filial } from '../types';

interface AuthContextType {
  user: User | null;
  filial: Filial | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchFilial: (filialId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Data
const MOCK_FILIAIS: Filial[] = [
  { id: 1, nome: 'Matriz São Paulo', cnpj: '00.000.000/0001-00', endereco: 'Av Paulista 1000' },
  { id: 2, nome: 'Filial Rio', cnpj: '00.000.000/0002-00', endereco: 'Av Atlantica 500' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [filial, setFilial] = useState<Filial | null>(null);

  const login = useCallback((role: UserRole) => {
    // Simulate login based on role
    const mockUser: User = {
      id: 123,
      nome: role === UserRole.ADMIN ? 'Administrador Papi' : 'Cliente Feliz',
      email: 'user@papifast.com',
      role: role,
      filialId: role === UserRole.ADMIN ? 1 : undefined
    };
    
    setUser(mockUser);
    if (mockUser.filialId) {
      setFilial(MOCK_FILIAIS.find(f => f.id === mockUser.filialId) || null);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setFilial(null);
  }, []);

  const switchFilial = useCallback((filialId: number) => {
    const found = MOCK_FILIAIS.find(f => f.id === filialId);
    if (found) setFilial(found);
  }, []);

  return (
    <AuthContext.Provider value={{ user, filial, isAuthenticated: !!user, login, logout, switchFilial }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
