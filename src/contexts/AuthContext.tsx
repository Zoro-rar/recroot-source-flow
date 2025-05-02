
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api-client';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  subscription?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Set a default mock user to bypass authentication
  const [user, setUser] = useState<User | null>({
    id: '65fa3d7d36e2673e4631706d',
    name: 'Test User',
    email: 'test@example.com',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Bypass authentication checks
  const login = async (email: string, password: string) => {
    // Authentication bypassed - using mock user
    toast({
      title: 'Authentication bypassed',
      description: 'Using test user account.',
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Authentication bypassed - using mock user
    toast({
      title: 'Authentication bypassed',
      description: 'Using test user account.',
    });
  };

  const logout = () => {
    // No need to log out - we're using a mock user
    toast({
      title: 'Authentication bypassed',
      description: 'Using test user account.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: true, // Always authenticated
      }}
    >
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
