import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '../interfaces';
import * as AuthService from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = AuthService.getCurrentUser();

    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user,
        token,
        loading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await AuthService.login(email, password);
      
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    try {
      const data = await AuthService.register(name, email, password, role);
      
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 