import React from "react";

const FooterBottom = () => {
  return (
    <div className="py-4 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Copyright */}
        <p className="mb-2 md:mb-0 text-center md:text-left">
          কপিরাইট ©২০২৫ এগ্রিস্মার্ট সর্বস্বত্ব সংরক্ষিত।
        </p>

        {/* Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-green-700">
            সাপোর্টেড ব্রাউজার
          </a>
          <a href="#" className="hover:text-green-700">
            শর্তাবলী
          </a>
          <a href="#" className="hover:text-green-700">
            বিক্রয় নীতি
          </a>
          <a href="#" className="hover:text-green-700">
            গোপনীয়তা নীতি
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
