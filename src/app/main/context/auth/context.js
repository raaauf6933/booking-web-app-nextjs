'use client';
import React, { useContext } from 'react';
import { getToken, removeTokens, setToken, isAuthenticated } from './utils';
import axios from 'axios';
import { AUTH_ADMIN, REQUEST_RESET_PASSWORD, RESET_PASSWORD } from './api';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
  const navigate = useRouter().push;

  const login = async (formData) => {
    try {
      let result = await axios.request({
        method: 'POST',
        data: formData,
        url: '/auth/client_login',
      });

      setToken(result.data.token);

      if (isAuthenticated()) {
        navigate('/main');
      }
    } catch (error) {
      return error?.data?.status;
    }
  };

  const logout = () => {
    removeTokens();
    navigate('/main');
  };

  const requestResetPassword = async (formData) => {
    try {
      const result = await axios.request({
        method: 'POST',
        data: formData,
        url: REQUEST_RESET_PASSWORD,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const resetPassword = async (formData) => {
    try {
      const result = await ApiAxios(
        {
          method: 'POST',
          data: formData,
          url: RESET_PASSWORD,
        },
        appStateDispatch,
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const getUser = () => {
    return isAuthenticated() ? jwtDecode(getToken()) : null;
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, getUser, requestResetPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useClientAuth = () => {
  const { login, logout, getUser, requestResetPassword, resetPassword } =
    useContext(AuthContext);

  return {
    login,
    logout,
    requestResetPassword,
    resetPassword,
    isAuthenticated: isAuthenticated(),
    user: getUser(),
  };
};

export default AuthContext;
