import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen bg-green-400 flex justify-center items-center">
      <div className=" md:grid md:grid-cols-2 lg:grid-cols-5 bg-white rounded-2xl md:max-w-6xl mx-auto w-full">
        {/* left side */}
        <div className="relative lg:col-span-3 bg-gradient-to-l from-green-200 to bg-white rounded-l-2xl">
          <Link href='/' className=" p-5">
            <Image
              src="/logo.webp"
              width={70}
              height={70}
              alt="AgriSmart Logo"
              className="absolute top-0 left-0 rounded-[8px] "
            />
          </Link>
          <Image src="/tree.png" width={600} height={600} alt="registerImage" className="hidden md:block"/>
        </div>
        {/* Right side */}
        <div className="md:w-full mx-auto  p-8 lg:col-span-2">
          <h1 className="text-2xl md:text-3xl text-primary font-bold">
            Please Register Here
          </h1>
          <form className="w-full">
            {/* name */}

            <div className="my-5">
              <div className="flex ">
                <label>Enter Your Full Name Here -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="text"
                name="name"
                placeholder="enter your full name"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-300"
              />
            </div>

            {/* photo url */}
            <div className="my-5">
              <div className="flex ">
                <label>Enter Your Photo URL Here -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="url"
                name="url"
                placeholder="ljshZoXh/er80fv/?lopsf..."
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-300"
              />
            </div>

            {/* email */}
            <div className="my-5">
              <div className="flex ">
                <label>Enter Your Valid Email -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="email"
                name="email"
                placeholder="info@gmail.com"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-300"
              />
            </div>
            {/* password */}
            <div className="my-5">
              <div className="flex ">
                <label>Add your Password -</label>
                <div className="border-b-[1.5px] -rounded-br-2xl border-dotted  flex-1"></div>
              </div>
              <input
                type="password"
                name="password"
                placeholder="password (e.g. !zdA?34Z..)"
                className="w-full p-2 hover:rounded-bl-[8px] outline-0 placeholder:text-green-800 placeholder:text-sm border-b border-r hover:border-green-700 hover:bg-green-300"
              />
            </div>
            <button className=" font-semibold border-[2px] border-green-600 hover:bg-green-500 hover:text-white w-full rounded-full py-2 transition-all duration-500">
              Register
            </button>
          </form>
          <p className="mt-2 text-sm">Already have an account? Please <Link className="text-blue-500 hover:text-green-700" href="#">Login here</Link> .</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
