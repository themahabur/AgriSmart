"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "BN" : "EN"));
  };

  const links = [
    { name: "হোম", href: "/" },
    { name: "সেবাসমূহ", href: "#" },
    { name: "বাজার মূল্য", href: "/market-price" },
    { name: "আবহাওয়া", href: "/weather" },
    { name: "ব্লগ", href: "/blogs" },
    { name: "যোগাযোগ", href: "/contact" },
  ];

  const services = [
    { name: "ফসল ব্যবস্থাপনা", href: "/services/crop" },
    { name: "পশুপালন", href: "/services/livestock" },
    { name: "জলসম্পদ", href: "/services/water" },
  ];

  return (
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto  pl-7">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#127917] relative flex items-center">
          <div className="absolute -left-16 mb-2">
            <Image
              src="/logo.webp"
              width={70}
              height={70}
              alt="AgriSmart Logo"
            />
          </div>
          <div className="font-hind">অ্যাগ্রি স্মার্ট</div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-gray-700 font-medium font-hind items-center">
          {links.map((link) =>
            link.name === "সেবাসমূহ" ? (
              <li key={link.name} className="relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="flex items-center gap-1 hover:text-green-600"
                >
                  {link.name} <IoMdArrowDropdown />
                </button>
                {activeDropdown === "services" && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    {services.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-green-600">
                  {link.name}
                </Link>
              </li>
            )
          )}
          {/* Language & Login */}
          <li className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-4 py-1 rounded-md border border-green-600 text-green-600 hover:bg-[#33ac3d] hover:text-white transition"
            >
              {language === "EN" ? "বাংলা" : "English"}
            </button>
            <Link
              href={"login"}
              className="px-4 py-1 rounded-md bg-[#33ac3d] text-white hover:bg-[#259e2f] transition font-hind"
            >
              লগইন
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden mt-2 px-4 pb-4 space-y-2">
          {links.map((link) =>
            link.name === "সেবাসমূহ" ? (
              <div key={link.name} className="relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="flex justify-between w-full items-center px-2 py-2 text-gray-700 hover:text-green-600"
                >
                  {link.name} <IoMdArrowDropdown />
                </button>
                {activeDropdown === "services" && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {services.map((service) => (
                      <li key={service.name}>
                        <Link
                          href={service.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="block px-2 py-2 text-gray-700 hover:text-green-600 rounded"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Language & Login */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={toggleLanguage}
              className="px-4 py-1 rounded-md border border-green-600 text-green-600 hover:bg-[#33ac3d] hover:text-white transition"
            >
              {language === "EN" ? "বাংলা" : "English"}
            </button>
            <Link
              href={"login"}
              className="px-4 py-1 rounded-md bg-[#33ac3d] text-white hover:bg-[#259e2f] transition font-hind"
            >
              লগইন
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
