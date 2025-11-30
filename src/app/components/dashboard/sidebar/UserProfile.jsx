"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserProfile = () => {
  const { data: session } = useSession();
  const user = session?.user || null;
  const name = user?.name || "অজানা সদস্য";
  const image = user?.image || user?.picture || null;
  const firstLetter = name.charAt(0); // নামের প্রথম অক্ষর

  return (
    <Link href="/dashboard/profile" className="flex items-center gap-3 cursor-pointer">
      {/* Avatar */}
      {image ? (
        <div className="relative w-10 h-10">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover border border-green-100"
          />
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-primary ring-2 ring-white"></span>
        </div>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-primary font-bold text-lg border border-green-200">
          {firstLetter}
        </div>
      )}

      {/* Name & Profile Link */}
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p  className="text-xs text-gray-500 hover:underline">
          প্রোফাইল দেখুন
        </p>
      </div>
    </Link>
  );
};

export default UserProfile;
