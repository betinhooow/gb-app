import React, { createContext, useContext, useCallback } from 'react';
import ToastContainer from '../components/Toast';

interface ToastContextData {
  showToast(): void;
  hideToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const showToast = useCallback(() => {
    console.log('add');
  }, []);

  const hideToast = useCallback(() => {
    console.log('remove');
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Toast deve ser usado com provider bro');
  }

  return context;
}
