'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

interface AuthContextType {
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    if (savedToken) {
      setToken(savedToken);
      setEmail(savedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    const { token, email: userEmail } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('email', userEmail);
    setToken(token);
    setEmail(userEmail);
    router.push('/dashboard');
  };

  const register = async (email: string, password: string) => {
    const res = await authApi.register(email, password);
    const { token, email: userEmail } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('email', userEmail);
    setToken(token);
    setEmail(userEmail);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail(null);
    router.push('/login');
  };

  return <AuthContext.Provider value={{ token, email, login, register, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
