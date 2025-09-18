import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const FooterTop = () => {
  return (
    <div className="border-b border-gray-300 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white font-bold p-2 rounded-full">
            Agri
          </div>
          <h2 className="text-xl font-semibold text-green-700">AgriSmart</h2>
        </div>
        <div className="flex space-x-4 text-gray-700  mt-4 md:mt-0">
          <a href="#">ডিরেক্টরি ইন্টেন</a>
          <a href="#">পরিচালক ফেসবুক গ্রুপ</a>
          <a href="#">সেমিনার করুন</a>
          <a href="#">যোগাযোগ</a>
        </div>
        <div className="flex space-x-4 text-green-600 mt-4 md:mt-0">
          <FaFacebookF className="cursor-pointer hover:text-green-800" />
          <FaInstagram className="cursor-pointer hover:text-green-800" />
          <FaYoutube className="cursor-pointer hover:text-green-800" />
          <FaLinkedinIn className="cursor-pointer hover:text-green-800" />
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
