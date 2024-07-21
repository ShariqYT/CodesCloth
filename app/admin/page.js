import React from 'react';
import ECommerce from '@/components/Dashboard/E-commerce';

// Metadata settings to prevent indexing by search engines
export const metadata = {
  title: 'Admin - Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
    noarchive: true,
  }
};

const AdminDashboard = () => {
  return (
    <div>
        <ECommerce />
    </div>
  );
};

export default AdminDashboard;
