"use client";

import React from "react";
import { FaComments } from "react-icons/fa";

const ChatButton = ({ expert, onClick, isOnline }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        className={`w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 font-hind flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-lg`}
      >
        <FaComments className="text-lg" />
        <span>চ্যাট খুলুন</span>
      </button>
      {!isOnline && (
        <p className="text-xs text-gray-500 text-center font-hind">
          ব্যবহারকারী অফলাইন। বার্তা পাঠালে অনলাইনে এলে পেয়ে যাবে।
        </p>
      )}
    </div>
  );
};

export default ChatButton;
