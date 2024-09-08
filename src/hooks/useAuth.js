import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  // Register function
  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { firstName, lastName, email, password });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Forgot Password function
  const forgotPasswordFn = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Forgot Password failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  // Reset Password function
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, { token, newPassword });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Reset Password failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  // Activate Account function
  const activateAccount = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/activate/${token}`);
      setUser(response.data.user);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Account Activation failed:', error.response.data.message);
      return { success: false, message: error.response.data.message };
    }
  };

  return { user, login, logout, register, forgotPassword: forgotPasswordFn, resetPassword, activateAccount };
};
