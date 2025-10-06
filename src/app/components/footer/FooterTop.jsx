import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const FooterTop = () => {
  return (
    <div className="border-b border-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo */}
        <Logo />
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-700 text-sm md:text-base mb-4 md:mb-0">
          <a href="#" className="hover:text-green-600 transition-colors">
            ডিরেক্টরি ইন্টেন
          </a>
          <a href="#" className="hover:text-green-600 transition-colors">
            পরিচালক ফেসবুক গ্রুপ
          </a>
          <a href="#" className="hover:text-green-600 transition-colors">
            সেমিনার করুন
          </a>
          <a href="#" className="hover:text-green-600 transition-colors">
            যোগাযোগ
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-green-600">
          <a href="#" className="hover:text-green-800 transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-green-800 transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-green-800 transition-colors">
            <FaYoutube />
          </a>
          <a href="#" className="hover:text-green-800 transition-colors">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
