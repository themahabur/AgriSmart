import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const RegisterLeft = () => {
  return (
    <div className="relative h-full min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-green-600 to-cyan-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/seedTree.png')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Logo and Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white hover:text-green-200 transition-colors duration-300 group"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              width={60}
              height={60}
              alt="AgriSmart Logo"
              className="rounded-lg "
            />
            <span className="flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              <IoIosArrowBack size={18} />
              <span className="font-semibold">হোমপেজে ফিরে যান</span>
            </span>
          </div>
        </Link>

        {/* Welcome Text */}
        <div className="text-white mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            AgriSmart কমিউনিটিতে যোগ দিন
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            কৃষকদের জন্য বিশেষায়িত প্ল্যাটফর্ম। বাজার দর, আবহাওয়া সংক্রান্ত তথ্য 
            এবং আধুনিক কৃষি পদ্ধতি সম্পর্কে জানুন।
          </p>
        </div>

        {/* Decorative Elements */}
        <div></div>
      </div>
    </div>
  );
};

export default RegisterLeft;