import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="pl-7">
      <div className="text-2xl font-bold text-[#127917] relative flex items-center">
        <div className="absolute -left-16 mb-2">
          <Image src="/logo.webp" width={70} height={70} alt="AgriSmart Logo" />
        </div>
        <div className="font-hind">অ্যাগ্রি স্মার্ট</div>
      </div>
    </div>
  );
}
