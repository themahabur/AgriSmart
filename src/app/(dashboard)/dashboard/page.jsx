"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTractor,
  FaSeedling,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaUserTie,
  FaBell,
  FaLeaf,
  FaTint,
  FaWind,
  FaArrowUp,
  FaArrowDown,
  FaCheck,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";

import { IoIosSunny, IoIosRainy, IoMdCheckmark } from "react-icons/io";
import { useSession } from "next-auth/react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";

const Dashboard = () => {
  const { data: session } = useSession();
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Quick Stats Data
  const quickStats = [
    {
      title: "মোট ফসল",
      value: "৫টি",
      icon: FaSeedling,
      color: "bg-green-500",
      change: "+২",
      changeType: "positive",
    },
    {
      title: "আজকের কাজ",
      value: "৩টি",
      icon: IoMdCheckmark,
      color: "bg-blue-500",
      change: "১ সম্পূর্ণ",
      changeType: "neutral",
    },
    //
  ];
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

  // Today's Tasks
  const todaysTasks = [
    {
      id: 1,
      task: "ধানের ক্ষেতে সেচ দেওয়া",
      priority: "উচ্চ",
      status: "pending",
      time: "সকাল ৮:০০",
      crop: "ধান",
    },
    {
      id: 2,
      task: "সবজি ক্ষেতে কীটনাশক স্প্রে",
      priority: "মাধ্যম",
      status: "completed",
      time: "সকাল ১০:০০",
      crop: "সবজি",
    },
    {
      id: 3,
      task: "গরুর খাবার প্রস্তুতি",
      priority: "উচ্চ",
      status: "pending",
      time: "দুপুর ২:০০",
      crop: "পশুপালন",
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

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      activity: "আলু ক্ষেতে সার প্রয়োগ",
      time: "২ ঘন্টা আগে",
      type: "farming",
      icon: FaLeaf,
    },
    {
      id: 2,
      activity: "ধানের দাম চেক করেছেন",
      time: "৪ ঘন্টা আগে",
      type: "market",
      icon: FaChartLine,
    },
    {
      id: 3,
      activity: "নতুন ব্লগ পোস্ট পড়েছেন",
      time: "৬ ঘন্টা আগে",
      type: "education",
      icon: FaBookOpen,
    },
    {
      id: 4,
      activity: "এআই চ্যাটবট ব্যবহার করেছেন",
      time: "১ দিন আগে",
      type: "consultation",
      icon: FaRobot,
    },
  ];

  // Fetch basic weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const lat = "23.8103";
        const lon = "90.4125";
        const apiKey = "eed75703a552ed1ad8db7b42f4f3e024";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=bn`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Weather data fetch error:", error);
      }
    };

    fetchWeatherData();
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "উচ্চ":
        return "bg-red-100 text-red-700 border-red-200";
      case "মাধ্যম":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "নিম্ন":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-6 px-4 font-hind">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  স্বাগতম,{" "}
                  <span className="text-green-600">
                    {session?.user?.name || "কৃষক ভাই"}
                  </span>
                  ! 🌾
                </h1>
                <p className="text-gray-600">
                  আজ {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {weatherData ? Math.round(weatherData.main?.temp) : "--"}°C
                  </div>
                  <div className="text-sm text-gray-600">ঢাকা</div>
                </div>
                <div className="text-4xl text-gray-500">
                  {weatherData?.weather?.[0]?.main === "Clear" ? (
                    <IoIosSunny />
                  ) : (
                    <IoIosRainy />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} p-3 rounded-lg text-white text-xl`}
                >
                  <stat.icon />
                </div>
                <div
                  className={`text-sm px-2 py-1 rounded-full ${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-700"
                      : stat.changeType === "negative"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {stat.changeType === "positive" && (
                    <FaArrowUp className="inline mr-1" />
                  )}
                  {stat.changeType === "negative" && (
                    <FaArrowDown className="inline mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
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
                  <div
                    className={`text-sm px-2 py-1`}
                  >
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
              <h3 className="font-bold text-gray-600 mb-1">{act.title} <span className="text-sm font-normal">/ মণ</span></h3>
              <p className="text-2xl font-bold text-gray-800">{act.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Tasks & Quick Tools */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaClock className="mr-2 text-green-600" />
                  আজকের কাজ
                </h2>
                <Link
                  href="/dashboard/agri-calendar"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  সব দেখুন →
                </Link>
              </div>
              <div className="space-y-4">
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      task.status === "completed"
                        ? "bg-green-50 border-green-200 opacity-75"
                        : "bg-white border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            task.status === "completed"
                              ? "line-through text-green-700"
                              : "text-gray-800"
                          }`}
                        >
                          {task.task}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">
                            <FaClock className="inline mr-1" />
                            {task.time}
                          </span>
                          <span className="text-sm text-gray-600">
                            <FaLeaf className="inline mr-1" />
                            {task.crop}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`ml-4 p-2 rounded-full transition-colors ${
                          task.status === "completed"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
                        }`}
                      >
                        <FaCheck className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                      {weatherData.weather?.[0]?.main === "Clear" ? (
                        <IoIosSunny className="text-yellow-500 mx-auto" />
                      ) : (
                        <IoIosRainy className="text-gray-500 mx-auto" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(weatherData.main?.temp)}°C
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
                        {weatherData.main?.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <FaWind className="mr-1 text-gray-500" />
                        বাতাস
                      </span>
                      <span className="font-medium">
                        {Math.round(weatherData.wind?.speed)} কিমি/ঘ
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

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaBell className="mr-2 text-orange-600" />
                সাম্প্রতিক কার্যক্রম
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <activity.icon className="text-green-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 font-medium">
                        {activity.activity}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/community"
                className="block mt-4 text-center text-green-600 hover:text-green-700 text-sm font-medium"
              >
                সব কার্যক্রম দেখুন →
              </Link>
            </div>

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
