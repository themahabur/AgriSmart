import React from "react";
import Link from "next/link";
import { FaLeaf, FaPlus } from "react-icons/fa";

const EmptyFarmTasks = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <FaLeaf className="text-4xl text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          কোনো কাজ নেই
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          আজকের জন্য কোনো কাজ পাওয়া যায়নি। নতুন কাজ যোগ করতে আমার ফার্ম পেজে
          যান।
        </p>
        <Link
          href="/dashboard/my-farm"
          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <FaPlus className="mr-2" />
          আমার ফার্মে যান
        </Link>
      </div>
    </div>
  );
};

export default EmptyFarmTasks;
