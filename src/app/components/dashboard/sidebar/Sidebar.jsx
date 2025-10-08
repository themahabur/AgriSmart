import { useEffect } from "react";
import PropTypes from "prop-types";
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
  FaRobot,
  FaPenFancy,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Logo from "../../shared/logo/Logo";
import UserProfile from "./UserProfile";
import SidebarNavLinks from "./SidebarNavLinks";
import { MdNotificationAdd } from "react-icons/md";

const navItems = [
  { href: "/dashboard", icon: FaHome, text: "হোম ড্যাশবোর্ড" },
  { href: "/dashboard/my-farm", icon: FaTractor, text: "আমার ফার্ম" },
  { href: "/dashboard/crop-advice", icon: FaSeedling, text: "ফসল উপদেশ" },
  { href: "/dashboard/weather", icon: FaCloudSun, text: "আবহাওয়া" },
  { href: "/dashboard/market-price", icon: FaChartLine, text: "বাজার দাম" },
  { href: "/dashboard/ai-chatbot", icon: FaRobot, text: "এআই চ্যাটবট" },
  { href: "/dashboard/blog", icon: FaPenFancy, text: "ব্লগ" },
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
  { href: "/dashboard/add-notification", icon: MdNotificationAdd , text: "নোটিফিকেশন যুক্ত করুণ" },
  { href: "/dashboard/settings", icon: FaCog, text: "সেটিংস" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  // Close sidebar on escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);

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
          <div className="p-4 border-b border-gray-200 flex items-center justify-between mb-2">
            <Logo w={45} h={45} />

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 lg:hidden"
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow px-4 overflow-auto  relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <SidebarNavLinks key={item.href} item={item} />
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200 sticky bottom-0 w-full z-10 bg-white">
            <UserProfile />
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
