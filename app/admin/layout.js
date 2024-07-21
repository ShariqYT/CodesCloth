import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MobileNav from '@/components/MobileNav';

export const metadata = {
  title: 'Admin',
}

const AdminLayout =  ({ children }) => {
  return (
    <>
        <DefaultLayout>
          {children}
        </DefaultLayout>
        <MobileNav />
    </>
  );
};

export default AdminLayout;