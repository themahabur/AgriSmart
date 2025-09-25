import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const RegisterLeft = () => {
  return (
    <div
      className=" lg:col-span-1 opacity-80  bg-cover bg-no-repeat bg-center bg-green-200"
      style={{
        backgroundImage: `url('/seedTree.png')`,
      }}
    >
      <Link href="/" className=" p-5 flex items-center-safe hover:text-green-700">
        <Image
          src="/logo.webp"
          width={70}
          height={70}
          alt="AgriSmart Logo"
          className=" top-0 left-10 rounded-[8px]  "
        />
        <p className="flex items-center"><IoIosArrowBack size={20} /> Go back</p>
      </Link>
    </div>
  );
};

export default RegisterLeft;
