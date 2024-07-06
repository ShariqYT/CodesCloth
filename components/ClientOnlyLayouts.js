"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const ClientOnlyLayout = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default ClientOnlyLayout;
