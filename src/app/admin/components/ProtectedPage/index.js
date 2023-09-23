import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/auth/context';
import { Spin } from 'antd';

const ProtectedPage = ({ children, requiredPermission }) => {
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const oneSecond = 1000;
    const timeout = setTimeout(() => setShowLoading(true), oneSecond);

    return clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/admin/login');
    }
  }, [user, loading]);

  const renderPage = () => {
    // if (!user) return;
    // if (loading) return;
    // if (requiredPermission && !permissions[user.role]?.[requiredPermission]) {
    //   router.push('/404');
    //   return;
    // }
    return children;
  };

  return (
    <>
      {renderPage()}
      {/* {loading && showLoading &&  <Spin />} */}
    </>
  );
};

export default ProtectedPage;
