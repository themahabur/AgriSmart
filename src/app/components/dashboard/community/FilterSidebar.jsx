"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaQuestionCircle,
  FaStar,
  FaTags,
  FaPlus,
} from "react-icons/fa";

const FilterSidebar = () => {
  const pathname = usePathname();

  // A list of filters. We can make this dynamic later.
  const filters = [
    { name: "All Posts", href: "/dashboard/community", icon: FaHome },
    {
      name: "My Questions",
      href: "/dashboard/community",
      icon: FaQuestionCircle,
    },
    { name: "Popular", href: "/dashboard/community", icon: FaStar },
  ];

  return (
    <div className="sticky top-5 space-y-6">
      {" "}
      {/* sticky and top-24 makes it stick on scroll */}
      {/* Main Filters Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
        <ul className="space-y-2">
          {filters.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href // Basic active state check
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Popular Tags Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <FaTags className="mr-2 text-gray-400" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "fertilizer",
            "pesticide",
            "rice",
            "potato-disease",
            "irrigation",
          ].map((tag) => (
            <Link
              href={`/community?tag=${tag}`}
              key={tag}
              className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-green-200 hover:text-green-800 transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
