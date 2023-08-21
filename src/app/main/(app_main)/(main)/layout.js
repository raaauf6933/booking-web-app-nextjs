'use client';
import './../../../globals.css';
import { Barlow_Condensed } from 'next/font/google';
import MainFooter from '../../components/MainFooter';
import Navbar from '../../components/Navbar';
import { BookingProvider } from '../../context/booking/bookingContext';

const inter = {
  style: null,
};
// Barlow_Condensed({ weight: '600', subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <>
        <Navbar />
        {children}
        <div className={inter.className}>
          <MainFooter />
        </div>
    </>
  );
}
