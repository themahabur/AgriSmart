import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterLeft = () => {
  return (
    <div
      className=" lg:col-span-1 opacity-80 rounded-l-2xl bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/tree.png')`,
      }}
    >
      <Link href="/" className=" p-5">
        <Image
          src="/logo.webp"
          width={70}
          height={70}
          alt="AgriSmart Logo"
          className=" top-0 left-0 rounded-[8px]  "
        />
      </Link>
    </div>
  );
};

export default RegisterLeft;
