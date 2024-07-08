import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

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