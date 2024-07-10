import React from 'react';
import ECommerce from '@/components/Dashboard/E-commerce';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Admin - Dashboard | CodesCloth',
}

const AdminDashboard = () => {
  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
        <ECommerce />
    </div>
  );
};

export default AdminDashboard;