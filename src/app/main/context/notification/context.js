'use client';
import { notification } from 'antd';
import React, { useContext } from 'react';

const NotificationContext = React.createContext({});

export function NotificationContextProvider({ children }) {
  const [api, contextText] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ api }}>
      {contextText}
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const { api } = useContext(NotificationContext);

  return {
    notif: api,
  };
};

export default NotificationContext;
