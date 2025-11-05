"use client";
import React, { useState, useEffect } from "react";
import { fetchWeather } from "@/app/lib/fetchWeather";
import { FaCloudSun, FaSync, FaMapMarkerAlt, FaTint, FaWind, FaTemperatureHigh, FaTachometerAlt } from "react-icons/fa";
import { getLocation } from "@/app/lib/getlocation";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWeatherUpdate = async () => {
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      // 📍 Get user location (GPS → fallback IP)
      const location = await getLocation();

      if (!location) {
        throw new Error("Unable to get location");
      }

      const { latitude, longitude } = location;
      console.log("📍 User Location:", latitude, longitude);
      // 🌦️ Fetch weather using lat/lon
      const data = await fetchWeather(latitude, longitude);

      setWeather(data);
    } catch (error) {
      console.error("❌ Weather update failed:", error);
      setError("Failed to fetch weather. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleWeatherUpdate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl mb-6">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <FaCloudSun className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl md:text-3xl font-bold">
              কৃষি আবহাওয়া সেবা
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            আপনার এলাকার সঠিক আবহাওয়া তথ্য এবং কৃষি পরামর্শ পান
          </p>
        </header>

        <main className="space-y-8">
          {/* Location Card */}
          <section className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br rounded-3xl from-green-500 to-emerald-600 p-4 mr-6 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {weather ? `${weather.city}, বাংলাদেশ` : "আপনার অবস্থান"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    বর্তমান অবস্থান অনুযায়ী আবহাওয়া
                  </p>
                </div>
              </div>
              <button
                onClick={handleWeatherUpdate}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span className="font-semibold">লোড হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <FaSync className="mr-3 text-xl" />
                    <span className="font-semibold">আপডেট করুন</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mb-6"></div>
              <FaCloudSun className="text-6xl text-green-500 mb-4 animate-pulse" />
              <p className="text-gray-700 text-xl font-semibold">
                আবহাওয়ার তথ্য লোড হচ্ছে...
              </p>
              <p className="text-gray-500 mt-2">
                অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-8 border-red-500 text-red-800 px-8 py-6 rounded-3xl shadow-lg">
              <p className="font-bold text-lg">তথ্য লোড করতে সমস্যা</p>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && weather && (
            <>
              {/* Today's Weather */}
              <section className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white rounded-3xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">আজকের আবহাওয়া</h3>
                  <p className="text-blue-100 text-lg">
                    {new Date().toLocaleDateString("bn-BD", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center mb-6 md:mb-0">
                    <p className="text-6xl font-bold">
                      {Math.round(weather.today?.temp)}°C
                    </p>
                    <p className="text-blue-100 capitalize text-xl mt-2">
                      {weather.today.weather}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <FaTint className="text-2xl text-blue-200 mx-auto mb-2" />
                      <p className="text-blue-100 text-sm">আর্দ্রতা</p>
                      <p className="text-xl font-bold">{weather.today.humidity}%</p>
                    </div>
                    
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <FaWind className="text-2xl text-green-200 mx-auto mb-2" />
                      <p className="text-blue-100 text-sm">বাতাস</p>
                      <p className="text-xl font-bold">{weather.today.windSpeed || "N/A"} m/s</p>
                    </div>
                    
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <FaTachometerAlt className="text-2xl text-purple-200 mx-auto mb-2" />
                      <p className="text-blue-100 text-sm">চাপ</p>
                      <p className="text-xl font-bold">{weather.today.pressure || "N/A"} hPa</p>
                    </div>
                    
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <FaTemperatureHigh className="text-2xl text-red-200 mx-auto mb-2" />
                      <p className="text-blue-100 text-sm">অনুভূতি</p>
                      <p className="text-xl font-bold">{Math.round(weather.today.feelsLike)}°C</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default WeatherPage;