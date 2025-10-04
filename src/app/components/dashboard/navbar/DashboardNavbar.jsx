import React from "react";
import Image from "next/image";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaBell } from "react-icons/fa";

const DashboardNavbar = ({ onMenuClick, pageTitle = "ড্যাশবোর্ড" }) => {
  return (
    <header className="sticky top-0 z-20 bg-accent border-b border-gray-200 ">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
            {pageTitle}
          </h1>
        </div>

        {/* Right Side: Notifications & User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification Bell */}
          <button
            className="relative text-gray-500 p-2 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="View notifications"
          >
            <FaBell size={22} />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>

          {/* User Profile Dropdown */}
          <button className="flex items-center gap-3 rounded-full p-1 pr-3 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <div className="relative">
              <Image
                src="/logo.webp"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border border-green-100 object-cover"
              />
              {/* Active Status Indicator */}
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-primary ring-2 ring-white"></span>
            </div>
            <div className="hidden text-left md:block">
              <p className="font-semibold text-sm text-gray-800">আব্দুল করিম</p>
              <p className="text-xs text-gray-500">সিলেট, সিলেট</p>
            </div>

            <FiChevronDown
              className="hidden text-gray-500 md:block"
              size={20}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
