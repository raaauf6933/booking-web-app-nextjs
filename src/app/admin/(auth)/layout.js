import React from 'react';
import './../../globals.css';

export default function Layout({ children }) {
  return <main className="flex min-h-screen flex-col">{children}</main>;
}
