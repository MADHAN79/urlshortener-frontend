import { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, login, logout, register, forgotPassword, resetPassword, activateAccount } = useAuth();
  
  return (
    <AuthContext.Provider value={{ user, login, logout, register, forgotPassword, resetPassword, activateAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
