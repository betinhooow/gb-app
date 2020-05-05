import React, { createContext, useCallback } from 'react';
import API from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await API.post('sessions', {
      email,
      password,
    });
    console.log(response);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'beto', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
