import { NotificationContextProvider } from '../main/context/notification/context';
import { AuthContextProvider } from './context/auth/context';

const Layout = ({ children }) => {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </NotificationContextProvider>
  );
};

export default Layout;
