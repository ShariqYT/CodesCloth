"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "../Header";
import { usePathname } from 'next/navigation';

export default function DefaultLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin/admin-signin');

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className={(!isAdminRoute) ? 'flex' : ''}>
        {/* <!-- ===== Sidebar Start ===== --> */}
        {!isAdminRoute && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className={(!isAdminRoute) ? `relative flex flex-1 flex-col lg:ml-72` : ''}>
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}

