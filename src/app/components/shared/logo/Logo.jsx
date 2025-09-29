import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ w = 70, h = 70 }) => {
  return (
    <Link
      href={"/"}
      className="text-2xl font-bold text-[#127917] relative flex items-center"
    >
      <Image src="/logo.webp" width={w} height={h} alt="AgriSmart Logo" />

      <div className="font-hind">অ্যাগ্রি স্মার্ট</div>
    </Link>
  );
};

export default Logo;
