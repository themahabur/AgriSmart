"use client";

import React from "react";
import { FaComments } from "react-icons/fa";

const ChatButton = ({ expert, onClick, isOnline }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 font-hind flex items-center justify-center gap-2 ${
        isOnline
          ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg"
          : "bg-gray-100 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!isOnline}
    >
      <FaComments className="text-lg" />
      <span>{isOnline ? "চ্যাট শুরু করুন" : "বর্তমানে অফলাইন"}</span>
    </button>
  );
};

export default ChatButton;
