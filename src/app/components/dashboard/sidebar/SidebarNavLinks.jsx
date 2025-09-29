"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarNavLinks = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center gap-4 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
          isActive
            ? "bg-light-green text-primary border-l-4 border-primary"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <item.icon
          className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-500"}`}
        />
        <span>{item.text}</span>
      </Link>
    </li>
  );
};

export default SidebarNavLinks;
