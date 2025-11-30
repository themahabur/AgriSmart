"use client";
import React, { useState } from "react";
import {
  FaSeedling,
  FaCalendarAlt,
  FaChartLine,
  FaCloudSun,
  FaHistory,
  FaFlask,
  FaWater,
  FaRobot,
  FaTractor,
  FaNewspaper,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const QuickActions = ({ onActionClick }) => {
  const [see, setSee] = useState(false);
  const quickActions = [
    {
      id: "crop-advice",
      title: "ফসল উপদেশ",
      icon: FaSeedling,
      color: "green",
      description: "AI ভিত্তিক ফসল পরামর্শ",
      href: "/dashboard/crop-advice",
    },
    {
      id: "agri-calendar",
      title: "কৃষি ক্যালেন্ডার",
      icon: FaCalendarAlt,
      color: "purple",
      description: "মৌসুমী কৃষি কার্যক্রম",
      href: "/dashboard/agri-calendar",
    },
    {
      id: "market-price",
      title: "বাজার দাম",
      icon: FaChartLine,
      color: "blue",
      description: "বর্তমান বাজার মূল্য",
      href: "/dashboard/market-price",
    },
    {
      id: "weather",
      title: "আবহাওয়া",
      icon: FaCloudSun,
      color: "yellow",
      description: "আবহাওয়ার তথ্য ও পূর্বাভাস",
      href: "/dashboard/weather",
    },
    {
      id: "soil-health",
      title: "মাটির স্বাস্থ্য",
      icon: FaFlask,
      color: "orange",
      description: "মাটি পরীক্ষা ও পরামর্শ",
      href: "/dashboard/soil-health",
    },
    {
      id: "irrigation",
      title: "সেচ নির্দেশিকা",
      icon: FaWater,
      color: "cyan",
      description: "সেচ পরিকল্পনা ও পরামর্শ",
      href: "/dashboard/irrigation",
    },
    {
      id: "ai-chatbot",
      title: "AI চ্যাটবট",
      icon: FaRobot,
      color: "indigo",
      description: "তাৎক্ষণিক কৃষি পরামর্শ",
      href: "/dashboard/ai-chatbot",
    },
    {
      id: "sell-produce",
      title: "পণ্য বিক্রি",
      icon: FaTractor,
      color: "emerald",
      description: "ফসল বিক্রয় সুবিধা",
      href: "/dashboard/sell-produce",
    },
    {
      id: "news-alerts",
      title: "খবর ও সতর্কতা",
      icon: FaNewspaper,
      color: "red",
      description: "গুরুত্বপূর্ণ কৃষি সংবাদ",
      href: "/dashboard/news-alerts",
    },
    {
      id: "community",
      title: "কৃষক কমিউনিটি",
      icon: FaUsers,
      color: "pink",
      description: "অন্যান্য কৃষকদের সাথে যোগাযোগ",
      href: "/dashboard/community",
    },
    {
      id: "expert-advice",
      title: "বিশেষজ্ঞ পরামর্শ",
      icon: FaHistory,
      color: "teal",
      description: "কৃষি বিশেষজ্ঞদের পরামর্শ",
      href: "/dashboard/expert-advice",
    },
    {
      id: "settings",
      title: "সেটিংস",
      icon: FaCog,
      color: "gray",
      description: "অ্যাপ সেটিংস ও পছন্দসমূহ",
      href: "/dashboard/settings",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green:
        "bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300 text-green-700",
      purple:
        "bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300 text-purple-700",
      blue: "bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300 text-blue-700",
      yellow:
        "bg-yellow-50 hover:bg-yellow-100 border-yellow-200 hover:border-yellow-300 text-yellow-700",
      orange:
        "bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300 text-orange-700",
      cyan: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200 hover:border-cyan-300 text-cyan-700",
      indigo:
        "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 hover:border-indigo-300 text-indigo-700",
      emerald:
        "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 hover:border-emerald-300 text-emerald-700",
      red: "bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 text-red-700",
      pink: "bg-pink-50 hover:bg-pink-100 border-pink-200 hover:border-pink-300 text-pink-700",
      teal: "bg-teal-50 hover:bg-teal-100 border-teal-200 hover:border-teal-300 text-teal-700",
      gray: "bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-700",
    };
    return colorMap[color] || colorMap.gray;
  };

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FaHistory className="text-green-600 mr-2" />
          দ্রুত কাজ
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          প্রয়োজনীয় কৃষি সেবাসমূহে সহজ প্রবেশ
        </p>
      </div>

      {/* Actions Grid */}
      <div className="p-4 max-h-[30vh] overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-3 ">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={action.id}
                href={action.href}
                onClick={() => handleActionClick(action)}
              >
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 border cursor-pointer group ${getColorClasses(
                    action.color
                  )}`}
                >
                  <IconComponent className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-center leading-tight">
                    {action.title}
                  </span>
                  {action.description && (
                    <span className="text-xs text-center mt-1 opacity-75 leading-tight">
                      {action.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats or Additional Info */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">১২+</div>
            <div className="text-xs text-gray-600">সেবা</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">২৪/৭</div>
            <div className="text-xs text-gray-600">সহায়তা</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">AI</div>
            <div className="text-xs text-gray-600">চালিত</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
