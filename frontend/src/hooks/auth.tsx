import React, { createContext, useCallback, useState, useContext } from 'react';
import API from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Agenda:token');
    const user = localStorage.getItem('@Agenda:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await API.post('sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@Agenda:token', token);
    localStorage.setItem('@Agenda:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Agenda:token');
    localStorage.removeItem('@Agenda:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usar dentro de um provider bro');
  }

  return context;
}
