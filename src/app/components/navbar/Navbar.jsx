

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { 
  HiMenuAlt3, 
  HiX, 
  HiHome, 
  HiDocumentText, 
  HiInformationCircle, 
  HiPhone, 
  HiLogout,
  HiLogin,
  HiTemplate
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo/Logo";
// import useUser from "@/app/hooks/useUser";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get current path

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const links = [
    { name: "হোম", href: "/", icon: HiHome },
    { name: "ব্লগ", href: "/blogs", icon: HiDocumentText },
    { name: "আমাদের সম্পর্কে", href: "/about", icon: HiInformationCircle },
    { name: "যোগাযোগ", href: "/contact", icon: HiPhone },
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: HiTemplate },
  ];

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Function to get link classes based on active state
  const getLinkClasses = (href, isMobile = false) => {
    const baseClasses = isMobile 
      ? "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group"
      : "flex items-center gap-2 hover:text-green-600 transition-colors duration-200 group";
    
    const activeClasses = isMobile
      ? "text-green-600 bg-green-50 font-semibold"
      : "text-green-600 font-semibold";
    
    const inactiveClasses = isMobile
      ? "text-gray-700 hover:text-green-600 hover:bg-green-50"
      : "text-gray-700";
    
    return `${baseClasses} ${isActiveLink(href) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-gray-700 font-medium font-hind items-center">
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={getLinkClasses(link.href)}
                >
                  <IconComponent 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActiveLink(link.href) 
                        ? "scale-110 text-green-600" 
                        : "group-hover:scale-110"
                    }`} 
                  />
                  {link.name}
                </Link>
              </li>
            );
          })}
          
          {/* Language & Login */}
          <li className="flex items-center gap-3">
            {session?.user?.email ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <HiLogout className="w-4 h-4" />
                লগআউট
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105 ${
                  isActiveLink("/auth/login") ? "ring-2 ring-green-300 ring-offset-2" : ""
                }`}
              >
                <HiLogin className="w-4 h-4" />
                লগইন
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenu ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden mt-4 px-4 pb-6 bg-white/95 backdrop-blur-sm rounded-b-xl shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-1">
            {links.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={getLinkClasses(link.href, true)}
                  onClick={() => setMobileMenu(false)}
                >
                  <IconComponent 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActiveLink(link.href) 
                        ? "scale-110 text-green-600" 
                        : "group-hover:scale-110"
                    }`} 
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Login/Logout */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            {session?.user?.email ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105 flex-1 justify-center"
              >
                <HiLogout className="w-4 h-4" />
                লগআউট
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-hind shadow-md hover:shadow-lg transform hover:scale-105 flex-1 justify-center ${
                  isActiveLink("/auth/login") ? "ring-2 ring-green-300 ring-offset-2" : ""
                }`}
                onClick={() => setMobileMenu(false)}
              >
                <HiLogin className="w-4 h-4" />
                লগইন
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}