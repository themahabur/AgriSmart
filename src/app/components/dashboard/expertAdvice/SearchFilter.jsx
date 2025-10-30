"use client";

import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  specialtyFilter,
  setSpecialtyFilter,
  availabilityFilter,
  setAvailabilityFilter,
}) => {
  // ═══════════════════════════════════════════════════════
  // FILTER OPTIONS
  // ═══════════════════════════════════════════════════════
  const specialties = [
    "সব",
    "ফসল চাষ পদ্ধতি",
    "মাটি ও পুষ্টি বিশ্লেষণ",
    "পানি সেচ প্রযুক্তি",
    "পোকামাকড় দমন",
    "বাজার ও ব্যবসায়িক পরামর্শ",
  ];

  const availabilityOptions = ["সব", "অনলাইন", "অফলাইন"];

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-12">
      <div className="flex items-center gap-2 mb-6">
        <FaFilter className="text-green-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800 font-hind">
          খুঁজুন এবং ফিল্টার করুন
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ─────────────────────────────────────── */}
        {/* Search Input */}
        {/* ─────────────────────────────────────── */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-hind">
            নাম বা স্থান অনুসন্ধান করুন
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-hind"
              placeholder="যেমন: নাম, জেলা, বিভাগ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ─────────────────────────────────────── */}
        {/* Specialty Filter */}
        {/* ─────────────────────────────────────── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-hind">
            বিশেষত্ব
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white font-hind cursor-pointer"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        {/* ─────────────────────────────────────── */}
        {/* Availability Filter */}
        {/* ─────────────────────────────────────── */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-hind">
            উপলব্ধতা
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white font-hind cursor-pointer"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            {availabilityOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─────────────────────────────────────── */}
      {/* Clear Filters Button */}
      {/* ─────────────────────────────────────── */}
      {(searchTerm ||
        specialtyFilter !== "সব" ||
        availabilityFilter !== "সব") && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setSearchTerm("");
              setSpecialtyFilter("সব");
              setAvailabilityFilter("সব");
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium font-hind hover:underline"
          >
            সব ফিল্টার মুছে ফেলুন
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
