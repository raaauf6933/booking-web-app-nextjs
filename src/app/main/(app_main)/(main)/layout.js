'use client';
import './../../../globals.css';
import dynamic from 'next/dynamic'
import { Barlow_Condensed } from 'next/font/google';
import MainFooter from '../../components/MainFooter';
const Navbar = dynamic(() => import('../../components/Navbar'), { ssr: false })
import { BookingProvider } from '../../context/booking/bookingContext';

const inter = {
  style: null,
};

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
