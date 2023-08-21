'use client';
import './../../globals.css';
import { BookingProvider } from '../context/booking/bookingContext';
import { AuthContextProvider } from '../context/auth/context';

const inter = {
  style: null,
};
// Barlow_Condensed({ weight: '600', subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <BookingProvider>{children}</BookingProvider>
      </AuthContextProvider>
    </>
  );
}
