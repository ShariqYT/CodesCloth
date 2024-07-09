import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export const metadata = {
  title: 'Admin | CodesCloth',
}

const AdminLayout =  ({ children }) => {
  return (
    <>
        <DefaultLayout>
          {children}
        </DefaultLayout>
    </>
  );
};

export default AdminLayout;