"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const DashboardNavbar = ({ onMenuClick, pageTitle = "ড্যাশবোর্ড" }) => {
  const { data: session } = useSession();
  const user = session?.user || null;

  const displayName = user?.name || "Member";
  const displaySub = user?.email || "সদস্য";
  const avatarSrc = user?.image || user?.picture || null;
  const firstLetter = displayName?.charAt(0)?.toUpperCase() || "M";
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-accent border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side */}
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

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification Bell */}
          <button
            className="relative text-gray-500 p-2 border border-gray-100 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="View notifications"
          >
            <FaBell size={22} />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((s) => !s)}
              className="flex items-center gap-3 rounded-full p-1 pr-3 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 border-none"
              aria-haspopup="true"
              aria-expanded={showDropdown}
            >
              <div className="relative">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-green-100 object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-primary font-bold text-lg border border-green-200">
                    {firstLetter}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-primary ring-2 ring-white"></span>
              </div>

              <div className="hidden text-left md:block">
                <p className="font-semibold text-sm text-gray-800">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[140px]">
                  {displaySub}
                </p>
              </div>
              <FiChevronDown className="hidden text-gray-500 md:block" size={20} />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-30"
                role="menu"
              >
                <button
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  প্রোফাইল দেখুন
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  লগ আউট
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
