"use client";
import React, { useEffect, useState } from "react";
import SelectArea from "../../../components/SelectArea";
import Link from "next/link";
import InputField from "./InputField";
import { IoIosEye, IoIosEyeOff, IoIosPerson, IoIosMail, IoIosCall, IoIosLock } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterRight = () => {
  const [divisionCode, setDivisionCode] = useState(null);
  const [distUpaName, setDistUpaName] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [eye, setEye] = useState(false);
  const [divisionName, setDivisionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // division select
  const handleSelectDivision = (e) => {
    const selectedId = e.target.value;
    setDivisionCode(selectedId);

    const division = divisions.find((divis) => divis.id == selectedId);
    if (division) {
      setDivisionName(division.division || division.name);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = new FormData(e.target);

    const profileFile = form.get("profileURL");
    const formData = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      division: divisionName,
      district: distUpaName?.distName || "",
      upazila: distUpaName?.upazilaName || "",
      phone: form.get("phone"),
      role: "farmer",
    };

    try {
      const response = await fetch(
        "https://agri-smart-server.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Fail to post data");
      }

      if (response.ok) {
        toast.success("রেজিস্ট্রেশন সফল!");
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/",
        });
        router.push("/");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
    e.target.reset();
  };

  // division load
  useEffect(() => {
    fetch("/division.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, []);

  return (
    <div className="w-full h-full p-6 lg:p-8 bg-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          এখানে একটি অ্যাকাউন্ট খুলুন
        </h1>
        <p className="text-gray-600">কৃষি সম্প্রদায়ের সাথে যুক্ত হোন</p>
      </div>

      <form className="space-y-2" onSubmit={handleFormSubmit}>
        {/* Name Field */}
        <div className="relative">
          <div className="absolute left-2 top-[50px] transform -translate-y-1/2 text-gray-400">
            <IoIosPerson size={20} />
          </div>
          <InputField
            label="আপনার পুরা নাম লেখুন"
            name="name"
            placeholder="উদাহরণ : রহিম মিয়া"
            required
            className="pl-8"
          />
        </div>

        {/* Photo and Division Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Photo Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              প্রোফাইল ছবি
            </label>
            <div className="relative">
              <input
                type="file"
                name="profileURL"
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl outline-none transition-all duration-300 hover:border-green-500 focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </div>

          {/* Division Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              বিভাগ নির্বাচন করুন
            </label>
            <div className="relative">
              <select
                onChange={handleSelectDivision}
                id="division"
                name="division"
                className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-green-500 hover:border-gray-300 bg-white"
                required
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.ban_name}
                  </option>
                ))}
              </select>
              
            </div>
          </div>
        </div>

        {/* District/Upazila Select */}
        <div className=" p-2 rounded-xl ">
          <label className="block mb-3 text-sm font-medium text-gray-700">
            এলাকা নির্বাচন করুন
          </label>
          <SelectArea
            divisionCode={divisionCode}
            setDistUpaName={setDistUpaName}
          />
        </div>

       <div className="md:flex gap-2">
         {/* Email Field */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400">
            <IoIosMail size={20} />
          </div>
          <InputField
            label="ই-মেইল ঠিকানা"
            type="email"
            name="email"
            placeholder="উদাহরণ : info@gmail.com"
            required
            className="pl-12"
          />
        </div>

        {/* Phone Field */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-[51px] transform -translate-y-1/2 text-gray-400">
            <IoIosCall size={20} />
          </div>
          <InputField
            label="মোবাইল নাম্বার"
            type="text"
            name="phone"
            placeholder="017xxxxxxxx"
            required
            className="pl-12"
          />
        </div>
       </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute left-4 top-12 transform -translate-y-1/2 text-gray-400">
            <IoIosLock size={20} />
          </div>
          <InputField
            label="পাসওয়ার্ড সেট করুণ"
            type={eye ? "text" : "password"}
            name="password"
            placeholder="উদাহরণ : !zdA?34Z.."
            required
            className="pl-12 pr-12"
          />
          <button
            type="button"
            onClick={() => setEye(!eye)}
            className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-1"
          >
            {eye ? <IoIosEye size={22} /> : <IoIosEyeOff size={22} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
        >
          {isLoading ? "রেজিস্ট্রেশন হচ্ছে..." : "অ্যাকাউন্ট খুলুন"}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pt-6 border-t border-gray-200">
        <p className="text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link 
            href="/auth/login" 
            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
          >
            লগইন করুণ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterRight;