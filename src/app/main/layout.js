'use client';
import './../globals.css';
import { Barlow_Condensed } from 'next/font/google';
import MainFooter from './components/MainFooter';
import Navbar from './components/Navbar';

const inter = Barlow_Condensed({ weight: '600', subsets: ['latin'] });

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
