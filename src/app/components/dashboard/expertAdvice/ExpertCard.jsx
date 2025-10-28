"use client";

import React from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaComments,
} from "react-icons/fa";
import Image from "next/image";

const ExpertCard = ({ expert }) => {
  // ═══════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════

  // Check if expert is online (active account)
  const isOnline = expert.accountStatus === "active";

  // Get initials from name for avatar fallback
  const getInitials = (name) => {
    if (!name) return "ব";
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name[0];
  };

  // Format last login date
  const formatLastLogin = (date) => {
    if (!date) return "কখনো না";
    const lastLogin = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now - lastLogin) / (1000 * 60 * 60));

    if (diffInHours < 1) return "এখন সক্রিয়";
    if (diffInHours < 24) return `${diffInHours} घंटा আগে`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} দিন আগে`;
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
      {/* ─────────────────────────────────────── */}
      {/* Card Header with Status */}
      {/* ─────────────────────────────────────── */}
      <div className="relative bg-gradient-to-r from-green-50 to-amber-50 p-6 border-b border-gray-100">
        {/* Online status indicator */}
        {isOnline && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-hind">অনলাইন</span>
          </div>
        )}

        {/* ─────────────────────────────────────── */}
        {/* Avatar */}
        {/* ─────────────────────────────────────── */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {expert.avatar ? (
              <Image
                src={expert.avatar}
                alt={expert.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                {getInitials(expert.name)}
              </div>
            )}

            {/* Verified badge */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 p-1.5 rounded-full border-2 border-white">
                <FaCheckCircle className="text-white text-xs" />
              </div>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────── */}
        {/* Name & Role */}
        {/* ─────────────────────────────────────── */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 font-hind mb-1">
            {expert.name}
          </h3>

          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium font-hind">
            <FaStar className="text-amber-500 text-xs" />
            <span>{expert.role === "expert" ? "কৃষি বিশেষজ্ঞ" : "কৃষক"}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────── */}
      {/* Card Body */}
      {/* ─────────────────────────────────────── */}
      <div className="p-6 space-y-4">
        {/* Location */}
        {expert.district && (
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaMapMarkerAlt className="text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-hind mb-0.5">অবস্থান</p>
              <p className="text-gray-800 font-medium font-hind">
                {expert.upazila && `${expert.upazila}, `}
                {expert.district}
                {expert.division && `, ${expert.division}`}
              </p>
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="mt-1 text-green-600">
            <FaEnvelope className="text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-hind mb-0.5">ইমেইল</p>
            <p className="text-gray-800 font-medium font-hind text-sm break-all">
              {expert.email}
            </p>
          </div>
        </div>

        {/* Last Active */}
        {expert.lastLogin && (
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaClock className="text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-hind mb-0.5">
                সর্বশেষ সক্রিয়
              </p>
              <p className="text-gray-800 font-medium font-hind">
                {formatLastLogin(expert.lastLogin)}
              </p>
            </div>
          </div>
        )}

        {/* Account Status Badge */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-hind">
              অ্যাকাউন্ট স্ট্যাটাস
            </span>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full font-hind ${
                expert.accountStatus === "active"
                  ? "bg-green-100 text-green-700"
                  : expert.accountStatus === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {expert.accountStatus === "active"
                ? "সক্রিয়"
                : expert.accountStatus === "pending"
                ? "অপেক্ষমাণ"
                : "নিষ্ক্রিয়"}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────── */}
      {/* Card Footer - Action Button */}
      {/* ─────────────────────────────────────── */}
      <div className="px-6 pb-6">
        <button
          className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 font-hind flex items-center justify-center gap-2 ${
            isOnline
              ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg"
              : "bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isOnline}
        >
          <FaComments className="text-lg" />
          <span>{isOnline ? "পরামর্শ শুরু করুন" : "বর্তমানে অফলাইন"}</span>
        </button>
      </div>
    </div>
  );
};

export default ExpertCard;
