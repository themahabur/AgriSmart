import React, { useState, useEffect } from "react";
import { FaLightbulb, FaCloudSun, FaLeaf, FaCalendarAlt } from "react-icons/fa";

const SmartRecommendations = ({ weatherData, userHistory }) => {
  const [seasonalTips, setSeasonalTips] = useState([]);
  const [weatherBasedTips, setWeatherBasedTips] = useState([]);
  const [personalizedTips, setPersonalizedTips] = useState([]);

  useEffect(() => {
    generateSeasonalTips();
    generateWeatherBasedTips();
    generatePersonalizedTips();
  }, [weatherData, userHistory]);

  const generateSeasonalTips = () => {
    const currentMonth = new Date().getMonth();
    const tips = {
      9: [
        // অক্টোবর
        "রবি মৌসুমের প্রস্তুতি নিন - গম, আলু, সরিষা বপনের সময়",
        "শীতকালীন সবজির বীজতলা তৈরি করুন",
        "ধানের শেষ পর্যায়ের যত্ন নিন",
      ],
      10: [
        // নভেম্বর
        "আলু বপনের উপযুক্ত সময় - মাটি প্রস্তুত করুন",
        "টমেটো, বেগুন, মরিচের চারা রোপণ করুন",
        "কুয়াশার কারণে ফসলের যত্ন নিন",
      ],
      11: [
        // ডিসেম্বর
        "শীতকালীন সেচ ব্যবস্থা নিশ্চিত করুন",
        "পাতাকপি, ফুলকপি চাষের উপযুক্ত সময়",
        "ঠাণ্ডা থেকে চারা গাছ রক্ষা করুন",
      ],
    };
    setSeasonalTips(
      tips[currentMonth] || ["এই মাসের জন্য বিশেষ পরামর্শ আপডেট করা হচ্ছে"]
    );
  };

  const generateWeatherBasedTips = () => {
    if (!weatherData) return;

    const temp = weatherData.main?.temp || 0;
    const humidity = weatherData.main?.humidity || 0;
    const tips = [];

    if (temp < 15) {
      tips.push(
        "🌡️ কম তাপমাত্রা: ফসলকে ঠাণ্ডা থেকে রক্ষা করুন, সকালে পানি দিন"
      );
    } else if (temp > 35) {
      tips.push("🔥 উচ্চ তাপমাত্রা: বিকালে ছায়া দিন, বেশি পানি সেচ দিন");
    }

    if (humidity > 80) {
      tips.push("💧 উচ্চ আর্দ্রতা: ছত্রাক রোগের জন্য সতর্ক থাকুন");
    } else if (humidity < 40) {
      tips.push("🏜️ কম আর্দ্রতা: নিয়মিত সেচ দিন, মাটির আর্দ্রতা বজায় রাখুন");
    }

    setWeatherBasedTips(tips);
  };

  const generatePersonalizedTips = () => {
    if (!userHistory || userHistory.length === 0) return;

    // Analyze user's common problems
    const commonProblems = {};
    const commonCrops = {};

    userHistory.forEach((item) => {
      if (item.cropType) {
        commonCrops[item.cropType] = (commonCrops[item.cropType] || 0) + 1;
      }
    });

    const tips = [];
    const mostCommonCrop = Object.keys(commonCrops).reduce(
      (a, b) => (commonCrops[a] > commonCrops[b] ? a : b),
      ""
    );

    if (mostCommonCrop) {
      tips.push(
        `🌱 আপনি বেশি ${mostCommonCrop} নিয়ে প্রশ্ন করেছেন - এর নিয়মিত যত্নের জন্য সার ও পানি দিন`
      );
    }

    if (userHistory.length > 5) {
      tips.push("📚 আপনি নিয়মিত AI পরামর্শ নিচ্ছেন - এটি ভালো অভ্যাস!");
    }

    setPersonalizedTips(tips);
  };

  return (
    <div className="space-y-6">
      {/* Seasonal Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-2xl text-orange-600 mr-3" />
          <h3 className="text-lg font-bold text-gray-800">🗓️ মৌসুমী পরামর্শ</h3>
        </div>
        <div className="space-y-3">
          {seasonalTips.map((tip, index) => (
            <div
              key={index}
              className="bg-orange-50 border border-orange-100 rounded-lg p-3"
            >
              <p className="text-gray-700 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather-based Tips */}
      {weatherData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <FaCloudSun className="text-2xl text-blue-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">
              🌤️ আবহাওয়া ভিত্তিক পরামর্শ
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-sm text-gray-600">বর্তমান তাপমাত্রা:</span>
              <span className="font-bold text-blue-700 ml-2">
                {Math.round(weatherData.main?.temp || 0)}°C
              </span>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-sm text-gray-600">আর্দ্রতা:</span>
              <span className="font-bold text-blue-700 ml-2">
                {weatherData.main?.humidity || 0}%
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {weatherBasedTips.map((tip, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-100 rounded-lg p-3"
              >
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Tips */}
      {personalizedTips.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-2xl text-green-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">
              💡 আপনার জন্য বিশেষ পরামর্শ
            </h3>
          </div>
          <div className="space-y-3">
            {personalizedTips.map((tip, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-100 rounded-lg p-3"
              >
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General AI Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <div className="flex items-center mb-4">
          <FaLeaf className="text-2xl text-purple-600 mr-3" />
          <h3 className="text-lg font-bold text-purple-800">
            🌿 সাধারণ কৃষি টিপস
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-700 mb-2">🌱 বীজ বপন</h4>
            <p className="text-gray-700 text-sm">
              ভালো মানের বীজ ব্যবহার করুন এবং মাটির pH ৬-৭ রাখুন
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-700 mb-2">
              💧 সেচ ব্যবস্থা
            </h4>
            <p className="text-gray-700 text-sm">
              সকাল বা বিকালে সেচ দিন, দুপুরে এড়িয়ে চলুন
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-700 mb-2">
              🛡️ রোগ প্রতিরোধ
            </h4>
            <p className="text-gray-700 text-sm">
              নিয়মিত ক্ষেত পরিদর্শন করুন এবং আক্রান্ত অংশ তুলে ফেলুন
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-700 mb-2">
              🌾 ফসল সংগ্রহ
            </h4>
            <p className="text-gray-700 text-sm">
              সঠিক সময়ে ফসল কাটুন এবং ভালোভাবে শুকিয়ে সংরক্ষণ করুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
