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
  FaCompass,
} from "react-icons/fa";

const WeatherSoilCards = ({ weatherData, soilData, onViewDetails }) => {
  // Process weather data from API
  const processWeatherData = (data) => {
    if (!data) {
      return {
        temperature: "২৮°C",
        condition: "সূর্যোজ্জ্বল",
        humidity: "৬৫%",
        windSpeed: "১২ km/h",
        feelsLike: "৩০°C",
        precipitation: "১০%",
        icon: "01d",
        weather: "Clear",
        date: new Date().toLocaleString('bn-BD')
      };
    }

    // Convert temperature from Celsius to Bengali format
    const formatTemperature = (temp) => {
      return `${Math.round(temp)}°C`;
    };

    // Convert weather condition to Bengali
    const getBengaliCondition = (weather) => {
      const conditionMap = {
        "clear": "সূর্যোজ্জ্বল",
        "clouds": "মেঘলা",
        "scattered clouds": "বিক্ষিপ্ত মেঘ",
        "broken clouds": "খণ্ডিত মেঘ",
        "overcast clouds": "ঘন মেঘলা",
        "rain": "বৃষ্টি",
        "drizzle": "গুঁড়ি গুঁড়ি বৃষ্টি",
        "thunderstorm": "ঝড়",
        "snow": "তুষারপাত",
        "mist": "কুয়াশা",
        "fog": "কুয়াশা",
        "haze": "ধোঁয়াশা"
      };

      return conditionMap[weather.toLowerCase()] || weather;
    };

    // Get proper icon from API icon code
    const getWeatherIcon = (iconCode) => {
      const iconMap = {
        "01d": "☀️",
        "01n": "🌙",
        "02d": "⛅",
        "02n": "⛅",
        "03d": "☁️",
        "03n": "☁️",
        "04d": "☁️",
        "04n": "☁️",
        "09d": "🌧️",
        "09n": "🌧️",
        "10d": "🌦️",
        "10n": "🌦️",
        "11d": "⛈️",
        "11n": "⛈️",
        "13d": "❄️",
        "13n": "❄️",
        "50d": "🌫️",
        "50n": "🌫️"
      };
      return iconMap[iconCode] || "☀️";
    };

    return {
      temperature: formatTemperature(data.temp),
      condition: getBengaliCondition(data.weather),
      humidity: `${data.humidity}%`,
      feelsLike: formatTemperature(data.feels_like),
      icon: data.icon,
      weather: data.weather,
      date: data.date,
      weatherIcon: getWeatherIcon(data.icon)
    };
  };

  // Default soil data if not provided
  const defaultSoilData = {
    pH: "৬.৫",
    moisture: "৬০%",
    nutrients: "মাধ্যমিক",
    temperature: "২৫°C",
    organicMatter: "৩.২%",
  };

  const weather = processWeatherData(weatherData?.today || weatherData);
  const soil = soilData || defaultSoilData;

  const getTemperatureColor = (temp) => {
    const tempValue = parseInt(temp);
    if (tempValue < 20) return "text-blue-600";
    if (tempValue > 35) return "text-red-600";
    return "text-orange-600";
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

  const getWeatherStatus = (condition, temp) => {
    const tempValue = parseInt(temp);
    
    if (condition.includes("বৃষ্টি") || condition.includes("rain")) {
      return "সেচের প্রয়োজন নেই, প্রাকৃতিক পানিই যথেষ্ট";
    } else if (condition.includes("সূর্যোজ্জ্বল") || condition.includes("clear")) {
      if (tempValue > 35) {
        return "গরমকাল, অতিরিক্ত সেচের প্রয়োজন হতে পারে";
      } else {
        return "কৃষিকাজের জন্য উপযুক্ত আবহাওয়া";
      }
    } else if (condition.includes("মেঘলা") || condition.includes("cloud")) {
      return "হালকা বৃষ্টির সম্ভাবনা, সেচ মাঝারি রাখুন";
    } else if (condition.includes("ঝড়") || condition.includes("storm")) {
      return "ফসল সুরক্ষা প্রয়োজন, বৃষ্টির পানির ব্যবস্থাপনা করুন";
    } else {
      return "স্বাভাবিক আবহাওয়া, নিয়মিত সেচ চালিয়ে যান";
    }
  };

  // Format date in Bengali
  const formatDate = (dateString) => {
    if (!dateString) return "আজ";
    
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return date.toLocaleDateString('bn-BD', options);
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
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {weather.date ? formatDate(weather.date) : "আজ"}
          </span>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-5xl mr-4">
              {weather.weatherIcon}
            </span>
            <div>
              <p className={`text-4xl font-bold ${getTemperatureColor(weather.temperature)}`}>
                {weather.temperature}
              </p>
              <p className="text-gray-600 text-lg">{weather.condition}</p>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center bg-white p-3 rounded-lg border border-blue-100">
            <FaTint className="text-blue-500 mr-3 text-lg" />
            <div>
              <span className="text-gray-600 block">আর্দ্রতা</span>
              <p className="font-semibold text-gray-800">{weather.humidity}</p>
            </div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg border border-blue-100">
            <FaThermometerHalf className="text-red-500 mr-3 text-lg" />
            <div>
              <span className="text-gray-600 block">অনুভূত তাপমাত্রা</span>
              <p className={`font-semibold ${getTemperatureColor(weather.feelsLike)}`}>
                {weather.feelsLike}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg border border-blue-100">
            <FaCompass className="text-green-500 mr-3 text-lg" />
            <div>
              <span className="text-gray-600 block">আবহাওয়া</span>
              <p className="font-semibold text-gray-800">{weather.condition}</p>
            </div>
          </div>

          <div className="flex items-center bg-white p-3 rounded-lg border border-blue-100">
            <FaCloudSun className="text-purple-500 mr-3 text-lg" />
            <div>
              <span className="text-gray-600 block">অবস্থা</span>
              <p className="font-semibold text-gray-800">বর্তমান</p>
            </div>
          </div>
        </div>

        {/* Weather Forecast Status */}
        <div className="mt-4 p-3 bg-blue-100 rounded-md border border-blue-200">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
            <span className="text-blue-800 text-sm font-medium">
              {getWeatherStatus(weather.condition, weather.temperature)}
            </span>
          </div>
        </div>

        <Link
          href={"/dashboard/weather"}
          className="mt-4 p-3 bg-green-100 rounded-md block text-center text-green-700 w-full font-medium hover:bg-green-200 transition-colors border border-green-200"
        >
          বিস্তারিত আবহাওয়া রিপোর্ট
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
            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-100 rounded transition-colors"
            title="বিস্তারিত দেখুন"
          >
            <FaEye className="w-4 h-4" />
          </button>
        </div>

        {/* Soil Parameters */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
            <div className="flex items-center">
              <FaFlask className="text-purple-500 mr-3" />
              <span className="text-gray-700">পিএইচ মান</span>
            </div>
            <span className={`font-semibold ${getPHColor(soil.pH)}`}>
              {soil.pH}
            </span>
          </div>

          <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
            <div className="flex items-center">
              <FaDroplet className="text-blue-500 mr-3" />
              <span className="text-gray-700">আর্দ্রতা</span>
            </div>
            <span
              className={`font-semibold ${getMoistureColor(soil.moisture)}`}
            >
              {soil.moisture}
            </span>
          </div>

          <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
            <div className="flex items-center">
              <FaSeedling className="text-green-500 mr-3" />
              <span className="text-gray-700">পুষ্টি মাত্রা</span>
            </div>
            <span
              className={`font-semibold ${getNutrientColor(soil.nutrients)}`}
            >
              {soil.nutrients}
            </span>
          </div>

          {soil.temperature && (
            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
              <div className="flex items-center">
                <FaThermometerHalf className="text-red-500 mr-3" />
                <span className="text-gray-700">মাটির তাপমাত্রা</span>
              </div>
              <span className="font-semibold text-gray-800">{soil.temperature}</span>
            </div>
          )}

          {soil.organicMatter && (
            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
              <div className="flex items-center">
                <FaLeaf className="text-yellow-600 mr-3" />
                <span className="text-gray-700">জৈব পদার্থ</span>
              </div>
              <span className="font-semibold text-gray-800">{soil.organicMatter}</span>
            </div>
          )}
        </div>

        {/* Soil Health Status */}
        <div className="mt-4 p-3 bg-green-100 rounded-md border border-green-200">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-800 text-sm font-medium">
              মাটির অবস্থা ভালো - ফসল চাষের জন্য উপযুক্ত
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSoilCards;