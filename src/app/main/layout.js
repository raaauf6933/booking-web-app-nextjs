'use client';
import MainDatePicker from '@components/MainDatePicker';
import './../globals.css';
import MainHeader from '@components/MainHeader';
import { Barlow_Condensed } from 'next/font/google';
import classNames from 'classnames';
import MainFooter from '@components/MainFooter';

const inter = Barlow_Condensed({ weight: '100', subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <>
      <MainHeader />
      <MainDatePicker />
      <main
        className={classNames('flex flex-col px-64 py-10 ', inter.className)}
      >
        {children}
      </main>
      <div className={inter.className}>
        <MainFooter />{' '}
      </div>
    </>
  );
}
