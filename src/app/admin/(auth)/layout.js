import React from 'react';
import './../../globals.css';
import AuthProvider from '../context/AuthProvider';

export default function Layout({ children }) {
  return (
    <main className="flex min-h-screen flex-col">
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}
