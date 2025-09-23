"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SelectArea from "../components/SelectArea";

const Register = () => {
   const [divisionCode, setDivisionCode] = useState(null);
  const handleSelectDivision = (e) => {
    const divisionName = e.target.value;
    setDivisionCode(divisionName);
  };
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
  };
// console.log(divisionCode);
  return (
    <div className="min-h-screen bg-green-100 flex justify-center items-center">
      <div className=" md:grid md:grid-cols-2  lg:grid-cols-2 bg-white rounded-2xl md:max-w-6xl mx-auto w-full">
        {/* left side */}
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
        {/* Right side */}
        <div className="md:w-full mx-auto  p-8 lg:col-span-1">
          <h1 className="text-2xl md:text-3xl text-primary font-bold">
            এখানে একটি অ্যাকাউন্ট খুলুন ।
          </h1>
          <form className="w-full" onSubmit={handleFormSubmit}>
            {/* name */}
            <div className="my-5">
              <label>আপনার পুরা নাম লেখুন</label>
              <input
                type="text"
                name="name"
                placeholder="উদাহরণ : রহিম মিয়া"
                className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* photo url */}
              <div className=" flex-1">
                <label>আপনার প্রোফাইল ছবি পছন্দ করুণ ।</label>
                <input
                  type="file"
                  name="profileURL"
                  className="file:mr-4  file:border-0 file:bg-green-500 file:px-4 file:py-4 file:text-sm file:font-semibold  hover:file:bg-violet-100 dark:file:bg-green-600 dark:file:text-violet-100 dark:hover:file:bg-green-700 w-full mt-2  border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100 "
                />
              </div>

              {/* address */}
              <div className="flex-1">
                <label
                  htmlFor="division"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  আপনার এলাকা নির্বাচন করুন
                </label>
                <select
                  onChange={handleSelectDivision}
                  id="division"
                  name="division"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option className="bg-green-500 " value="">
                    একটি বিভাগ নির্বাচন করুন
                  </option>
                  <option value="1">ঢাকা</option>
                  <option value="2">চট্টগ্রাম</option>
                  <option value="3">রাজশাহী</option>
                  <option value="4">খুলনা</option>
                  <option value="5">বরিশাল</option>
                  <option value="6">সিলেট</option>
                  <option value="7">রংপুর</option>
                  <option value="8">ময়মনসিংহ</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <SelectArea divisionCode ={divisionCode} />
            </div>
            <div className="my-5">
              <label>আপনার ই-মেইল ঠিকানা লিখুন ।</label>
              <input
                type="email"
                name="email"
                placeholder="উদাহরণ : info@gmail.com"
                className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
              />
            </div>
            {/* password */}
            <div className="my-5">
              <label>আপনার পাসওর্য়াড সেট করুণ</label>

              <input
                type="password"
                name="password"
                placeholder="উদাহরণ :  !zdA?34Z.."
                className="w-full mt-2 py-3 px-5 border-[1.5px] border-green-200 rounded-[10px] outline-0 hover:bg-green-100"
              />
            </div>
            <button
              type="submit"
              className=" text-gray-100  bg-green-600 hover:bg-green-700 hover:text-white w-full rounded-[10px] py-3 transition-all duration-500"
            >
              অ্যাকাউন্ট খুলুন
            </button>
          </form>
          <p className="mt-2 text-sm">
            ইতিমধ্যে আপনার একটি অ্যাকাউন্ট আছে ? দয়া করে{" "}
            <Link className="text-blue-500 hover:text-green-700" href="#">
              এখানে লগইন করুণ
            </Link>{" "}
            ।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
