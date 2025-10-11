"use client";
import Link from "next/link";
import React from "react";
import {
  FaCloudSun,
  FaTint,
  FaLeaf,
  FaThermometerHalf,
  FaWind,
  FaEye,
  FaFlask,
  FaTint as FaDroplet,
  FaSeedling,
} from "react-icons/fa";

const WeatherSoilCards = ({ weatherData, soilData, onViewDetails }) => {
  // Default weather data if not provided
  const defaultWeatherData = {
    temperature: "২৮°C",
    humidity: "৬৫%",
    condition: "সূর্যোজ্জ্বল",
    windSpeed: "১২ কিমি/ঘণ্টা",
    forecast: "গত ২ দিনের মধ্যে বৃষ্টির সম্ভাবনা নেই",
    icon: "☀️",
  };

  // Default soil data if not provided
  const defaultSoilData = {
    pH: "৬.৫",
    moisture: "৬০%",
    nutrients: "মাধ্যমিক",
    temperature: "২৫°C",
    organicMatter: "৩.২%",
  };

  const weather = weatherData || defaultWeatherData;
  const soil = soilData || defaultSoilData;

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "সূর্যোজ্জ্বল":
      case "sunny":
        return "☀️";
      case "মেঘলা":
      case "cloudy":
        return "☁️";
      case "বৃষ্টি":
      case "rainy":
        return "🌧️";
      case "ঝড়":
      case "stormy":
        return "⛈️";
      default:
        return weather.icon || "☀️";
    }
  };

  const getPHColor = (pH) => {
    const phValue = parseFloat(pH);
    if (phValue < 6.0) return "text-red-600";
    if (phValue > 8.0) return "text-red-600";
    if (phValue >= 6.0 && phValue <= 7.5) return "text-green-600";
    return "text-yellow-600";
  };

  const getMoistureColor = (moisture) => {
    const moistureValue = parseInt(moisture);
    if (moistureValue < 30) return "text-red-600";
    if (moistureValue > 80) return "text-blue-600";
    return "text-green-600";
  };

  const getNutrientColor = (nutrients) => {
    switch (nutrients?.toLowerCase()) {
      case "উচ্চ":
      case "high":
        return "text-green-600";
      case "মাধ্যমিক":
      case "medium":
        return "text-yellow-600";
      case "নিম্ন":
      case "low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Weather Card */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaCloudSun className="text-yellow-500 mr-2" />
            আজকের আবহাওয়া
          </h2>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-3">
              {getWeatherIcon(weather.condition)}
            </span>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {weather.temperature}
              </p>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FaTint className="text-blue-500 mr-2" />
            <div>
              <span className="text-gray-600">আর্দ্রতা</span>
              <p className="font-semibold">{weather.humidity}</p>
            </div>
          </div>

          {weather.windSpeed && (
            <div className="flex items-center">
              <FaWind className="text-gray-500 mr-2" />
              <div>
                <span className="text-gray-600">বাতাস</span>
                <p className="font-semibold">{weather.windSpeed}</p>
              </div>
            </div>
          )}
        </div>

        {/* Weather Forecast */}
        {weather.forecast && (
          <div className="my-6 p-3 bg-blue-100 rounded-md">
            <p className="text-blue-800 text-sm">
              <FaCloudSun className="inline mr-1" />
              {weather.forecast}
            </p>
          </div>
        )}
        <Link
          href={"/dashboard/weather"}
          className=" p-3 bg-green-100 rounded-md block text-center text-gray-500 w-full"
        >
          বিস্তারিত দেখুন
        </Link>
      </div>

      {/* Soil Health Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaLeaf className="text-green-600 mr-2" />
            মাটির স্বাস্থ্য
          </h2>
          <button
            onClick={() => onViewDetails && onViewDetails("soil")}
            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-colors"
            title="বিস্তারিত দেখুন"
          >
            <FaEye className="w-4 h-4" />
          </button>
        </div>

        {/* Soil Parameters */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaFlask className="text-purple-500 mr-2" />
              <span className="text-gray-700">পিএইচ মান</span>
            </div>
            <span className={`font-semibold ${getPHColor(soil.pH)}`}>
              {soil.pH}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaDroplet className="text-blue-500 mr-2" />
              <span className="text-gray-700">আর্দ্রতা</span>
            </div>
            <span
              className={`font-semibold ${getMoistureColor(soil.moisture)}`}
            >
              {soil.moisture}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaSeedling className="text-green-500 mr-2" />
              <span className="text-gray-700">পুষ্টি মাত্রা</span>
            </div>
            <span
              className={`font-semibold ${getNutrientColor(soil.nutrients)}`}
            >
              {soil.nutrients}
            </span>
          </div>

          {soil.temperature && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaThermometerHalf className="text-red-500 mr-2" />
                <span className="text-gray-700">মাটির তাপমাত্রা</span>
              </div>
              <span className="font-semibold">{soil.temperature}</span>
            </div>
          )}

          {soil.organicMatter && (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaLeaf className="text-brown-500 mr-2" />
                <span className="text-gray-700">জৈব পদার্থ</span>
              </div>
              <span className="font-semibold">{soil.organicMatter}</span>
            </div>
          )}
        </div>

        {/* Soil Health Status */}
        <div className="mt-4 p-3 bg-green-100 rounded-md">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-800 text-sm font-medium">
              মাটির অবস্থা ভালো
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSoilCards;
