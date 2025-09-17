"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
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
    <nav className="w-full px-6 py-4 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#127917] relative h-10 flex items-center">
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

        {/* Main Links */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium font-hind">
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
        </ul>
      </div>
    </nav>
  );
}
