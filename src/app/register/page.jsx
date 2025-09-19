import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-green-300 flex justify-center items-center">
      <div className=" grid md:grid-cols-3 bg-white rounded-2xl max-w-6xl mx-auto">
        {/* left side */}
        <div className="relative col-span-2 bg-gradient-to-bl from-green-400 to bg-white">
          <Image
            src="/logo.webp"
            width={70}
            height={70}
            alt="AgriSmart Logo"
            className="absolute top-0 left-0"
          />
          <Image src="/tree.png" width={600} height={600} alt="registerImage" />
        </div>
        {/* Right side */}
        <div className="w-[400px] mx-auto  p-10 col-span-1">
          <form>
            {/* name */}

            <div className="my-6">
              <div className="flex ">
                <label>Enter Your Full Name Here -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="text"
                name="name"
                placeholder="enter your full name"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
              />
            </div>

            {/* photo url */}
            <div className="my-6">
              <div className="flex ">
                <label>Enter Your Photo URL Here -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="url"
                name="url"
                placeholder="ljshZoXh/er80fv/?lopsf..."
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
              />
            </div>

            {/* email */}
            <div className="my-6">
              <div className="flex ">
                <label>Enter Your Valid Email -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="email"
                name="email"
                placeholder="info@gmail.com"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
              />
            </div>
            {/* password */}
            <div className="my-6">
              <div className="flex ">
                <label>Add your Password -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="password"
                name="password"
                placeholder="password (e.g. !zdA?34Z..)"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
