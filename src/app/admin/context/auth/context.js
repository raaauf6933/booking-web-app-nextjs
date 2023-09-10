'use client';
import React, { useContext } from 'react';
import { getToken, removeTokens, setToken, isAuthenticated } from './utils';
import axios from 'axios';
import { AUTH_ADMIN, REQUEST_RESET_PASSWORD, RESET_PASSWORD } from './api';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useNotification } from '../../../main/context/notification/context';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
  const navigate = useRouter().push;
  const router = useRouter();
  const {notif} = useNotification();
  const [loading,setLoading] = React.useState(false);

  const login = async (formData) => {
    try {
      setLoading(true)
      let result = await axios.request({
        method: 'POST',
        data: formData,
        url: '/auth/admin',
      });

      setToken(result.data.token);

      if (isAuthenticated()) {
        navigate('/admin/bookings');
      }
      
    } catch (e) {
      if (e?.response?.data?.message) {
        notif['error']({
          message: e.response.data.message,
        });
      } else {
        notif['error']({
          message: 'Internal Server Error',
        });
      }
    } finally{
      setLoading(false)
    }
  };

  const logout = () => {
    removeTokens();
    router.refresh();
    navigate("/admin/login")
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
      value={{ login, logout, getUser, requestResetPassword, resetPassword , loading}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const { login, logout, getUser, requestResetPassword, resetPassword , loading} =
    useContext(AuthContext);

  return {
    login,
    logout,
    requestResetPassword,
    resetPassword,
    loading,
    isAuthenticated: isAuthenticated(),
    user: getUser(),
    getUser,
  };
};

export default AuthContext;
