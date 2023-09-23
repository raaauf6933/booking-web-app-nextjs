'use client';
export const TOKEN_KEY = 'ADMIN_TOKEN';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
};

export const isAuthenticated = () => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(TOKEN_KEY);
  }
  return token !== null;
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};
