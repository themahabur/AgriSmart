"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTractor,
  FaSeedling,
  FaCloudSun,
  FaChartLine,
  FaNewspaper,
  FaCalendarAlt,
  FaFlask,
  FaWater,
  FaLandmark,
  FaShoppingCart,
  FaUserTie,
  FaUsers,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

const navItems = [
  { href: "/dashboard", icon: FaHome, text: "হোম ড্যাশবোর্ড" },
  { href: "/dashboard/my-farm", icon: FaTractor, text: "আমার ফার্ম" },
  { href: "/dashboard/crop-advice", icon: FaSeedling, text: "ফসল উপদেশ" },
  { href: "/dashboard/weather", icon: FaCloudSun, text: "আবহাওয়া" },
  { href: "/dashboard/market-price", icon: FaChartLine, text: "বাজার দাম" },
  { href: "/dashboard/news-alerts", icon: FaNewspaper, text: "খবর ও সতর্কতা" },
  {
    href: "/dashboard/agri-calendar",
    icon: FaCalendarAlt,
    text: "কৃষি ক্যালেন্ডার",
  },
  { href: "/dashboard/soil-health", icon: FaFlask, text: "মাটির স্বাস্থ্য" },
  { href: "/dashboard/irrigation", icon: FaWater, text: "সেচ নির্দেশিকা" },
  {
    href: "/dashboard/gov-assistance",
    icon: FaLandmark,
    text: "সরকারি সহায়তা",
  },
  {
    href: "/dashboard/sell-produce",
    icon: FaShoppingCart,
    text: "পণ্য বিক্রি",
  },
  {
    href: "/dashboard/expert-advice",
    icon: FaUserTie,
    text: "বিশেষজ্ঞের পরামর্শ",
  },
  { href: "/dashboard/community", icon: FaUsers, text: "কৃষক কমিউনিটি" },
  { href: "/dashboard/settings", icon: FaCog, text: "সেটিংস" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and Header */}
          <div className="p-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary">AgriSmart</h1>
              <p className="text-sm text-gray-500 mt-1">
                স্মার্ট কৃষি প্ল্যাটফর্ম
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 lg:hidden"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow px-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-4 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-light-green text-primary border-l-4 border-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive ? "text-primary" : "text-gray-500"
                        }`}
                      />
                      <span>{item.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-green text-primary font-bold text-lg">
                র
              </div>
              <div>
                <p className="font-semibold text-gray-800">রহিম মিয়া</p>
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  প্রোফাইল দেখুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
