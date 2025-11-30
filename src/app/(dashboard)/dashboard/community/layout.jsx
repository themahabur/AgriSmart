import FilterSidebar from "@/app/components/dashboard/community/FilterSidebar";
import StatsSidebar from "@/app/components/dashboard/community/StatsSidebar";
import { FaUsers } from "react-icons/fa";

export default function CommunityLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen font-hind">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUsers className="text-green-600 mr-3" />
            কৃষক কমিউনিটি
          </h1>
          <p className="text-gray-600 mt-1">
            অভিজ্ঞতা শেয়ার করুন, জ্ঞান অর্জন করুন এবং সমস্যার সমাধান খুঁজুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">{children}</main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
            <StatsSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
