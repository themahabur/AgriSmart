"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaCircle } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import Image from "next/image";
import { useChat } from "./chatProvider/ChatProvider";

import ChatWindow from "./ChatWindow";

const ExpertCard = ({ expert }) => {
  const { isUserOnline } = useChat();
  const [showChat, setShowChat] = useState(false);

  // Check if expert is online by id or email
  const isOnline = isUserOnline(expert._id, expert.email);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "ব";
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name[0];
  };

  // Format last login
  const formatLastLogin = (date) => {
    if (!date) return "কখনো না";
    const lastLogin = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now - lastLogin) / (1000 * 60 * 60));

    if (diffInHours < 1) return "এখন সক্রিয়";
    if (diffInHours < 24) return `${diffInHours} ঘন্টা আগে`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} দিন আগে`;
  };

  return (
    <>
      <button
        onClick={() => setShowChat(true)}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group w-full cursor-pointer "
      >
        {/* Card Header */}
        <div className="relative bg-gradient-to-r from-green-50 to-amber-50 p-3 border-b border-gray-100 flex gap-2 ">
          {/* Online status */}
          {isOnline && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-hind">অনলাইন</span>
            </div>
          )}

          {/* Avatar */}
          <div className="flex justify-center mb-4  ">
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
                <div className="w-18 h-18 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white text-2xl  shadow-lg border-4 border-white">
                  {getInitials(expert.name)}
                </div>
              )}

              <span className="absolute right-1 bottom-0">
                {expert.accountStatus === "active" ? (
                  <FaCircle
                    size={18}
                    className="text-green-600 text-xs border-2 border-white rounded-full "
                  />
                ) : expert.accountStatus === "pending" ? (
                  <CiCircleMore
                    size={18}
                    className="text-green-600 text-xs border-2 border-white rounded-full bg-gray-600"
                  />
                ) : (
                  <FaCircle
                    size={18}
                    className="text-red-600 text-xs border-2 border-white rounded-full "
                  />
                )}
              </span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="ml-1 w-full">
            <div className="flex gap-2 items-start justify-between">
              <h3 className=" font-semibold text-gray-900 font-hind mb-1">
                {expert.name}
              </h3>

              {expert.lastLogin && (
                <div className="flex items-center gap-1">
                  <div className=" text-green-600">
                    <FaClock className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium font-hind">
                      {formatLastLogin(expert.lastLogin)}...
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-start">
              <p className="text-gray-800 font-medium font-hind text-sm break-all">
                {expert.email}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
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

        {/* Card Body */}
        <div className="p-6 space-y-4 hidden hover:block group-hover:block transition duration-500 ease-in-out text-start">
          {/* Location */}
          {expert.district && (
            <div className="flex items-start gap-3">
              <div className=" text-green-600">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div className="flex-1 flex gap-2">
                <p className="text-sm text-gray-500 font-hind mb-0.5">
                  অবস্থান :
                </p>
                <p className="text-gray-800 font-medium font-hind">
                  {expert.upazila && `${expert.upazila}, `}
                  {expert.district}
                  {expert.division && `, ${expert.division}`}
                </p>
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="mb-1 text-green-600">
              <FaEnvelope className="text-lg" />
            </div>
            <div className="flex-1 flex gap-2">
              <p className="text-sm text-gray-500 font-hind mb-0.5">ইমেইল :</p>
              <p className="text-gray-800 font-medium font-hind text-sm break-all">
                {expert.email}
              </p>
            </div>
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {showChat && (
        <ChatWindow expert={expert} onClose={() => setShowChat(false)} />
      )}
    </>
  );
};

export default ExpertCard;
