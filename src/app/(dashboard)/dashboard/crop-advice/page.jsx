"use client";
import React, { useState, useEffect } from "react";
import AIAdviceEngine from "@/app/components/dashboard/cropAdvice/AIAdviceEngine";
import CropDiagnosis from "@/app/components/dashboard/cropAdvice/CropDiagnosis";
import AdviceHistory from "@/app/components/dashboard/cropAdvice/AdviceHistory";

import WeatherIntegration from "@/app/components/dashboard/cropAdvice/WeatherIntegration";
import { useSession } from "next-auth/react";

const CropAdvice = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("ai-diagnosis");
  const [adviceHistory, setAdviceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data for smart recommendations
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

  // Load user's advice history
  useEffect(() => {
    const loadAdviceHistory = () => {
      const savedHistory = localStorage.getItem(
        `crop_advice_${session?.user?.email}`
      );
      if (savedHistory) {
        setAdviceHistory(JSON.parse(savedHistory));
      }
    };

    if (session?.user?.email) {
      loadAdviceHistory();
    }
  }, [session]);

  // Save advice to history
  const saveAdviceToHistory = (advice) => {
    const newHistory = [advice, ...adviceHistory].slice(0, 20); // Keep last 20 advice
    setAdviceHistory(newHistory);
    if (session?.user?.email) {
      localStorage.setItem(
        `crop_advice_${session.user.email}`,
        JSON.stringify(newHistory)
      );
    }
  };

  const tabs = [
    { id: "ai-diagnosis", label: "এআই ডায়াগনসিস", icon: "🤖" },
    { id: "image-analysis", label: "ছবি বিশ্লেষণ", icon: "📸" },

    { id: "history", label: "ইতিহাস", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-6 px-4 font-hind">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center">
                  🌾 এআই চালিত ফসল পরামর্শ কেন্দ্র
                </h1>
                <p className="text-gray-600">
                  কৃত্রিম বুদ্ধিমত্তা দিয়ে আপনার ফসলের সমস্যা নির্ণয় এবং
                  সমাধান পান
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-center">
                <div className="text-sm text-gray-500">চালিত হচ্ছে</div>
                <div className="text-lg font-bold text-green-600">
                  AgriSmart AI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <div className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "ai-diagnosis" && (
              <AIAdviceEngine
                onAdviceGenerated={saveAdviceToHistory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}

            {activeTab === "image-analysis" && (
              <CropDiagnosis
                onDiagnosisComplete={saveAdviceToHistory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}

            {activeTab === "history" && (
              <AdviceHistory
                history={adviceHistory}
                onClearHistory={() => {
                  setAdviceHistory([]);
                  if (session?.user?.email) {
                    localStorage.removeItem(
                      `crop_advice_${session.user.email}`
                    );
                  }
                }}
              />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <WeatherIntegration weatherData={weatherData} />

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                📊 আপনার পরিসংখ্যান
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">মোট প্রশ্ন:</span>
                  <span className="font-bold text-green-600">
                    {adviceHistory.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">এই মাসে:</span>
                  <span className="font-bold text-green-600">
                    {
                      adviceHistory.filter((advice) => {
                        const adviceDate = new Date(advice.timestamp);
                        const currentDate = new Date();
                        return (
                          adviceDate.getMonth() === currentDate.getMonth() &&
                          adviceDate.getFullYear() === currentDate.getFullYear()
                        );
                      }).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">সফল সমাধান:</span>
                  <span className="font-bold text-purple-600">
                    {adviceHistory.filter((advice) => advice.solved).length}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Tips */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 mt-6">
              <h3 className="text-lg font-bold text-green-800 mb-4">
                🤖 এআই টিপস
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-gray-700">
                    📸 ভালো ছবি তুলুন: দিনের আলোতে, পাতার উপর ও নিচ থেকে ছবি
                    তুলুন
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-gray-700">
                    📝 বিস্তারিত লিখুন: কখন সমস্যা শুরু, কোন অংশে, আবহাওয়ার
                    অবস্থা
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-gray-700">
                    ⏰ দ্রুত পদক্ষেপ: সমস্যা চিহ্নিত হওয়ার সাথে সাথে ব্যবস্থা
                    নিন
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropAdvice;
