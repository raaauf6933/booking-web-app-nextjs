'use client';
import { useEffect } from 'react';
import { useClientAuth } from '../../../context/auth/context';
import './../../../../globals.css';
import { useRouter } from 'next/navigation';

const inter = {
  style: null,
};
// Barlow_Condensed({ weight: '600', subsets: ['latin'] });

export default function Layout({ children }) {
  const { isAuthenticated } = useClientAuth();
  const navigate = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate.push('/main/login');
    }
  }, []);

  return <>{children}</>;
}
