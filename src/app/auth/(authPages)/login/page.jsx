"use client";
import SecondaryBtn from "@/app/components/shared/buttons/SecondaryBtn";
import SocialLogin from "@/app/components/socialLogin/SocialLogin";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
    console.log(result);
    if (result.error) {
      setError(result.error);
    
      toast("Invalid Email or Password")
      setEmail("");
      setPassword("");
    } else {
      toast("Alhamdulillah LogIn done")
      router.push("/");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen container mx-auto font-hind flex flex-col md:flex-row">
      {/* বাম পাশ - পূর্ণ উচ্চতার ছবি */}
      <div className="md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 to-amber-900/50 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80"
          alt="ফার্ম ল্যান্ডস্কেপ"
          className="w-full h-full object-cover absolute"
        />
        <div className="relative z-20 flex flex-col justify-center h-full p-8 text-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold mb-2">স্বাগতম</h2>
            <h1 className="text-5xl font-bold text-green-300 mb-6">
              অ্যাগ্রি স্মার্ট
            </h1>
            <p className="text-xl mb-8">
              রিয়েল-টাইম বাজার দর, আবহাওয়ার সতর্কতা এবং বিশেষজ্ঞ কৃষি পরামর্শ
              পান।
            </p>

            <div className="space-y-4">
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
                <span>রিয়েল-টাইম বাজার দর</span>
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
                <span>আবহাওয়ার সতর্কতা ও পূর্বাভাস</span>
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
                <span>বিশেষজ্ঞ কৃষি পরামর্শ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ডান পাশ - লগইন ফর্ম */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-green-50 to-amber-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              আপনার একাউন্টে লগইন করুন
            </h2>
            <p className="text-gray-600 mt-2">
              ফিরে আসার জন্য স্বাগতম! অনুগ্রহ করে আপনার তথ্য দিন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ইমেইল ঠিকানা
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition"
                placeholder="আপনার ইমেইল লিখুন"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

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
                  মনে রাখুন
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
            </div>

            {/* <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              সাইন ইন করুন
            </button> */}
            <SecondaryBtn className="w-full" children={"সাইন ইন করুন"} />
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              একাউন্ট নেই?{" "}
              <Link
                href="register"
                className="font-medium text-green-600 hover:text-green-500"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>

          <div className="mt-1 pt-1 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500 mb-4">
              অথবা চালিয়ে যান
            </p>
            <div className="">
              {/* Social Login */}
              <SocialLogin/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
