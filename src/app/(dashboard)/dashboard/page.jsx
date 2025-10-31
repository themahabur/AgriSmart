"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  FaTractor,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaUserTie,
  FaTint,
  FaWind,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import { IoIosSunny, IoIosRainy, IoMdCheckmark } from "react-icons/io";
import { useSession } from "next-auth/react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { fetchWeather } from "@/app/lib/fetchWeather";
import { getLocation } from "@/app/lib/getlocation";
import WelcomeHeader from "@/app/components/dashboard/userDashboard/WelcomeHeader";
import QuickStat from "@/app/components/dashboard/userDashboard/QuickStat";
import RecentActivities from "@/app/components/dashboard/userDashboard/RecentActivities";
import TodayTask from "@/app/components/dashboard/userDashboard/todayTask/TodayTask";
import axiosInstance from "@/lib/axios";

const Dashboard = () => {
  const { data: session } = useSession();
  const [weatherData, setWeatherData] = useState(null);

  const activities = [
    {
      title: "মুশুর ডাল",
      value: "২৫,০০০/-৳",
      icon: PiChartLineUpBold,
      color: "bg-green-500",
      income: "সর্বোচ্চ বাজার মূল্য ", //🌾
      change: "🌾",
      changeType: "positive",
    },
    {
      title: "আলু",
      value: "১৮,০০০/-৳",
      icon: PiChartLineDownBold,
      color: "bg-red-500",
      income: "সর্বোনিম্ন বাজার মূল্য ",
      change: "🌾",
      changeType: "negative",
    },
  ];

  // Quick Access Tools
  const quickTools = [
    {
      title: "আবহাওয়া",
      description: "আজকের আবহাওয়া ও পূর্বাভাস",
      icon: FaCloudSun,
      href: "/dashboard/weather",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "বাজার দাম",
      description: "সর্বশেষ ফসলের বাজার মূল্য",
      icon: FaChartLine,
      href: "/dashboard/market-price",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "এআই চ্যাটবট",
      description: "কৃষি বিষয়ক পরামর্শ পান",
      icon: FaRobot,
      href: "/dashboard/ai-chatbot",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "আমার ফার্ম",
      description: "ফসল ও ক্ষেত পরিচালনা",
      icon: FaTractor,
      href: "/dashboard/my-farm",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "বিশেষজ্ঞ পরামর্শ",
      description: "কৃষি বিশেষজ্ঞদের সাথে যোগাযোগ",
      icon: FaUserTie,
      href: "/dashboard/expert-advice",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "কৃষক কমিউনিটি",
      description: "অন্যান্য কৃষকদের সাথে আলোচনা",
      icon: FaUsers,
      href: "/dashboard/community",
      color: "from-teal-500 to-green-500",
    },
  ];

  // Fetch weather data based on user's location
  useEffect(() => {
    async function loadWeather() {
      try {
        const location = await getLocation();

        if (!location) {
          throw new Error("Unable to get location");
        }

        const { latitude, longitude } = location;

        const data = await fetchWeather(latitude, longitude);
        setWeatherData(data);
        // console.log("Weather data:", data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }
    loadWeather();
  }, []);

  // Function to format time in Bengali
  const formatTime = (date) => {
    return date.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to format date in Bengali
  const formatDate = (date) => {
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-6 px-4 font-hind">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <WelcomeHeader
            formatDate={formatDate}
            weatherData={weatherData}
            formatTime={formatTime}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickStat />

          {activities.map((act, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${act.color} p-3 rounded-lg text-white text-xl`}
                >
                  <act.icon />
                </div>
                <div>
                  <p className="text-sm pb-1 ml-1">{act.income}</p>
                  <div className={`text-sm px-2 py-1`}>
                    {act.changeType === "positive" && (
                      <FaArrowUp className="inline mr-1" />
                    )}
                    {act.changeType === "negative" && (
                      <FaArrowDown className="inline mr-1" />
                    )}
                    {act.change}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-gray-600 mb-1">
                {act.title} <span className="text-sm font-normal">/ মণ</span>
              </h3>
              <p className="text-2xl font-bold text-gray-800">{act.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Tasks & Quick Tools */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Tasks */}
            <TodayTask />

            {/* Quick Access Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaTractor className="mr-2 text-green-600" />
                দ্রুত প্রবেশ
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.href}
                    className="group block p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="text-xl" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-tight">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Weather & Activities */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4  text-center">
                আজকের আবহাওয়া
              </h2>
              {weatherData ? (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">
                      {weatherData.today?.weather === "Clear" ? (
                        <IoIosSunny className="text-yellow-500 mx-auto" />
                      ) : (
                        <IoIosRainy className="text-gray-500 mx-auto" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(weatherData.today?.temp)}°C
                    </div>
                    <div className="text-gray-600 capitalize">
                      {weatherData.weather?.[0]?.description}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <FaTint className="mr-1 text-blue-500" />
                        আর্দ্রতা
                      </span>
                      <span className="font-medium">
                        {weatherData.today.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <FaWind className="mr-1 text-gray-500" />
                        বাতাস
                      </span>
                      <span className="font-medium">
                        {Math.round(weatherData.today?.feels_like)} কিমি/ঘ
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/weather"
                    className="block mt-4 text-center bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  আবহাওয়ার তথ্য লোড হচ্ছে...
                </div>
              )}
            </div>

            {/* <RecentActivities /> */}
            <RecentActivities />

            {/* Agricultural Tips */}
            {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="mr-2 text-green-600" />
                আজকের টিপস
              </h2>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <h3 className="font-medium text-green-800 mb-1">
                    সেচের সময়
                  </h3>
                  <p className="text-sm text-gray-700">
                    অক্টোবর মাসে ধানের ক্ষেতে নিয়মিত সেচ দিন এবং মাটির আর্দ্রতা
                    বজায় রাখুন।
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <h3 className="font-medium text-green-800 mb-1">
                    কীটপতঙ্গ নিয়ন্ত্রণ
                  </h3>
                  <p className="text-sm text-gray-700">
                    শীতকালীন সবজির জন্য জৈব কীটনাশক ব্যবহার করুন। রাসায়নিক
                    স্প্রে এড়িয়ে চলুন।
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/blog"
                className="block mt-4 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                আরও টিপস পড়ুন
              </Link>
            </div> */}
          </div>
        </div>

        {/* Bottom Action Cards */}
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/market-price"
            className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FaChartLine className="text-2xl" />
              <HiOutlineChartBar className="text-3xl opacity-20" />
            </div>
            <h3 className="text-lg font-bold mb-2">বাজার দাম চেক করুন</h3>
            <p className="text-green-100 text-sm">
              সর্বশেষ ফসলের দাম জানুন এবং বিক্রির সঠিক সময় নির্ধারণ করুন।
            </p>
          </Link>

          <Link
            href="/dashboard/ai-chatbot"
            className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FaRobot className="text-2xl" />
              <FaRobot className="text-3xl opacity-20" />
            </div>
            <h3 className="text-lg font-bold mb-2">এআই সহায়তা নিন</h3>
            <p className="text-purple-100 text-sm">
              কৃষি বিষয়ক যেকোনো প্রশ্নের তাৎক্ষণিক উত্তর পান আমাদের স্মার্ট বট
              থেকে।
            </p>
          </Link>

          <Link
            href="/dashboard/community"
            className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FaUsers className="text-2xl" />
              <FaUsers className="text-3xl opacity-20" />
            </div>
            <h3 className="text-lg font-bold mb-2">কমিউনিটিতে যোগ দিন</h3>
            <p className="text-blue-100 text-sm">
              অন্যান্য কৃষকদের সাথে অভিজ্ঞতা শেয়ার করুন এবং নতুন কিছু শিখুন।
            </p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
