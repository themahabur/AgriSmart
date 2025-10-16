"use client";
import React, { useState, useEffect } from "react";
import { fetchWeather } from "@/app/lib/fetchWeather";
import {
  FaTint,
  FaCloudSun,
  FaWind,
  FaTemperatureHigh,
  FaTachometerAlt,
  FaInfoCircle,
} from "react-icons/fa";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWeatherUpdate = async () => {
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      // Try GPS first
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            console.log("✅ GPS Location:", latitude, longitude);
            const data = await fetchWeather(latitude, longitude);
            setWeather(data);
            resolve();
          },
          (err) => {
            console.warn("⚠️ GPS failed, fallback to IP:", err);
            reject(err);
          }
        );
      });
    } catch {
      // Fallback to IP location
      const ipRes = await fetch("https://ipinfo.io/json");
      const ipData = await ipRes.json();
      const [latitude, longitude] = ipData.loc.split(",");
      const data = await fetchWeather(latitude, longitude);
      setWeather(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleWeatherUpdate();
  }, []);

  return (
    <div className="flex flex-col p-6 bg-white min-h-screen">
      <main>
        <section>
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 flex items-center">
              <FaCloudSun className="mr-2 text-green-600" />
              আবহাওয়ার পূর্বাভাস{" "}
              {weather ? `- ${weather.city}` : ""}
            </h2>
            <button
              onClick={handleWeatherUpdate}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors flex items-center"
            >
              <FaCloudSun className="mr-2" />
              আবহাওয়া আপডেট করুন
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              <p className="ml-4 text-gray-700">তথ্য লোড হচ্ছে...</p>
            </div>
          )}

          {error && (
            <div className="bg-gray-50 border border-green-500 text-green-600 px-4 py-3 rounded-lg mb-4">
              <p>আবহাওয়ার তথ্য লোড করতে সমস্যা হয়েছে: {error}</p>
            </div>
          )}

          {!loading && !error && weather && (
            <>
              {/* 🌤 আজকের পূর্বাভাস */}
              <div className="bg-gray-100 p-6 rounded-xl mb-8 border border-gray-200">
                <p className="font-bold text-lg sm:text-xl text-gray-800 mb-4">
                  আজকের পূর্বাভাস
                </p>
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="grid grid-cols-2 gap-4 text-base sm:text-lg font-medium text-gray-800">
                    <div>
                      <span className="text-sm text-gray-600">তাপমাত্রা</span>
                      <div className="flex items-center text-2xl font-bold">
                        <FaTemperatureHigh className="mr-2 text-green-500" />
                        {Math.round(weather.today.temp)}°C
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">আর্দ্রতা</span>
                      <div className="flex items-center text-2xl font-bold">
                        <FaTint className="mr-2 text-blue-500" />
                        {weather.today.humidity}%
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.today.icon}@4x.png`}
                      alt={weather.today.weather}
                      width={128}
                      height={128}
                      className="mx-auto"
                    />
                    <p className="capitalize text-gray-800 font-semibold">
                      {weather.today.weather}
                    </p>
                  </div>
                </div>
              </div>

              {/* 📅 সাপ্তাহিক পূর্বাভাস */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                সাপ্তাহিক পূর্বাভাস
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {weather.weekly.map((day, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                  >
                    <p className="font-semibold text-sm text-gray-600">
                      {day.date}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.weather}
                      width={64}
                      height={64}
                      className="mx-auto"
                    />
                    <p className="text-sm capitalize mt-1 text-gray-700">
                      {day.weather}
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {Math.round(day.temp)}°C
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-8 mb-4">
                  কৃষি সম্পদ ও পরামর্শ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
                    <p className="text-lg font-semibold text-green-600 flex items-center mb-2">
                      <FaInfoCircle className="mr-2" />
                      আজকের কৃষি পরামর্শ:
                    </p>
                    <p className="text-gray-800">
                      {weather.today.temp > 30
                        ? "আজকের তাপমাত্রা বেশি, ফসল সেচের পরিমাণ বাড়ান।"
                        : "আবহাওয়া অনুকূল, নিয়মিত সেচ দিন।"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
                    <p className="text-lg font-semibold text-green-600 flex items-center mb-2">
                      <FaInfoCircle className="mr-2" />
                      সাধারণ নির্দেশিকা:
                    </p>
                    <p className="text-gray-800">
                      মাটির আর্দ্রতা পরীক্ষা করুন এবং প্রয়োজন অনুসারে সেচ দিন।
                    </p>
                  </div>
                </div>
          

       
                 <section className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              কৃষি সম্পদ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-600 mb-2">
                  কৃষি পরামর্শ
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট থেকে সর্বশেষ কৃষি প্রযুক্তি
                  সম্পর্কে জানুন।
                </p>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500 transition-colors">
                  আরও জানুন
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-600 mb-2">বাজার দর</h3>
                <p className="text-sm text-gray-700 mb-3">
                  সর্বশেষ ফসলের বাজার মূল্য এবং বাজার সংবাদ সম্পর্কে আপডেট
                  থাকুন।
                </p>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500 transition-colors">
                  দেখুন
                </button>
              </div>
            </div>
          </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default WeatherPage;


