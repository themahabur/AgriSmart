"use client";

import React from "react";
import { FaUserTie, FaSearch } from "react-icons/fa";

const EmptyState = ({ searchTerm }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-r from-green-100 to-amber-100 p-6 rounded-full">
            {searchTerm ? (
              <FaSearch className="text-5xl text-green-600" />
            ) : (
              <FaUserTie className="text-5xl text-green-600" />
            )}
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-gray-800 font-hind mb-3">
          {searchTerm ? "কোন বিশেষজ্ঞ খুঁজে পাওয়া যায়নি" : "কোন বিশেষজ্ঞ নেই"}
        </h3>

        <p className="text-gray-600 font-hind mb-6">
          {searchTerm
            ? `"${searchTerm}" এর জন্য কোন বিশেষজ্ঞ পাওয়া যায়নি। অনুগ্রহ করে অন্য কিছু দিয়ে চেষ্টা করুন।`
            : "এই মুহূর্তে কোন বিশেষজ্ঞ উপলব্ধ নেই। পরে আবার চেক করুন।"}
        </p>

        {/* Suggestions */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-left">
          <p className="text-sm font-semibold text-gray-800 font-hind mb-3">
            পরামর্শ:
          </p>
          <ul className="space-y-2 text-sm text-gray-600 font-hind">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>বানান ঠিক আছে কিনা পরীক্ষা করুন</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>আরও সাধারণ শব্দ ব্যবহার করে দেখুন</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>ফিল্টার পরিবর্তন করে দেখুন</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
