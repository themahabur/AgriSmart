"use client";
import SecondaryBtn from "@/app/components/shared/buttons/SecondaryBtn";
import SocialLogin from "@/app/components/socialLogin/SocialLogin";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (result.error) {
      setError(result.error);
      toast("Invalid Email or Password");
      setEmail("");
      setPassword("");
    } else {
      toast("Alhamdulillah LogIn done");
      router.push("/");
    }

    setLoading(false);
  };
  
  return (
    <div className=" bg-gradient-to-br max-w-7xl mx-auto min-h-screen from-green-50 to-cyan-50 flex justify-center items-center p-4">
      <div className="w-full  bg-white rounded-3xl shadow-md overflow-hidden border border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Image Section (Same as Register) */}
          <div className="relative h-full  bg-gradient-to-br from-green-600 70%  to-cyan-700 hidden md:block">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between mt-5 px-8">
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
                    className="rounded-lg shadow-lg border-2 border-white"
                  />
                  <span className="flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    <IoIosArrowBack size={18} />
                    <span className="font-semibold">হোমপেজে ফিরে যান</span>
                  </span>
                </div>
              </Link>

              {/* Welcome Text */}
              <div className="text-white mb-4">
                <h2 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  AgriSmart কমিউনিটিতে ফিরে আসার জন্য স্বাগতম
                </h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  আপনার অ্যাকাউন্টে লগইন করুন এবং কৃষি সম্প্রদায়ের সাথে আবার যুক্ত হোন। 
                  বাজার দর, আবহাওয়া সংক্রান্ত তথ্য এবং আধুনিক কৃষি পদ্ধতি সম্পর্কে জানতে থাকুন।
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-green-500 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-white">রিয়েল-টাইম বাজার দর</span>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-500 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <span className="text-white">আবহাওয়ার সতর্কতা ও পূর্বাভাস</span>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-500 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <span className="text-white">বিশেষজ্ঞ কৃষি পরামর্শ</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center ">
                <div className="w-32 h-1 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full h-full p-6 lg:p-8 bg-white">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                আপনার অ্যাকাউন্টে লগইন করুন
              </h1>
              <p className="text-gray-600">ফিরে আসার জন্য স্বাগতম! অনুগ্রহ করে আপনার তথ্য দিন।</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-4 pl-12 border border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-green-500 hover:border-gray-300 bg-white"
                    placeholder="আপনার ইমেইল লিখুন"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-4 pl-12 pr-12 border border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-green-500 hover:border-gray-300 bg-white"
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    আমাকে মনে রাখুন
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-full text-white bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                একাউন্ট নেই?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-green-600 hover:text-green-700 transition-colors duration-300"
                >
                  সাইন আপ করুন
                </Link>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-2 pt-1 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 mb-2">
                অথবা চালিয়ে যান
              </p>
              <div className="flex justify-center">
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;