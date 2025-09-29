"use client";

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/dashboard/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-hind">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar with hamburger menu for mobile */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center gap-2">
            <img
              src="/logo.webp"
              alt="AgriSmart Logo"
              className="h-8 w-8 text-primary"
            />
            <h1 className="text-xl font-bold text-primary">
              AgriSmart hello world
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 focus:outline-none *:lg:hidden"
          >
            <FiMenu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
