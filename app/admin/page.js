import React from 'react';
import ECommerce from '@/components/Dashboard/E-commerce';
import { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
        <ECommerce />
    </>
  );
};

export default AdminDashboard;