"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import DashboardNavbar from "../components/dashboard/navbar/DashboardNavbar";
import Loading from "../components/loading/Loading";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {  status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?callbackUrl=${pathname}`);
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return  <Loading/>;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-hind">


      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar  */}
        <header className="">
          <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
