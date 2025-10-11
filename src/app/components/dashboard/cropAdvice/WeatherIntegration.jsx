import React from "react";
import {
  FaCloudSun,
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  IoIosSunny,
  IoIosRainy,
  IoIosSnow,
  IoIosThunderstorm,
} from "react-icons/io";

const WeatherIntegration = ({ weatherData }) => {
  const getWeatherIcon = (weather) => {
    if (!weather) return <FaCloudSun />;

    const condition = weather.weather?.[0]?.main?.toLowerCase();
    switch (condition) {
      case "clear":
        return <IoIosSunny className="text-yellow-500" />;
      case "rain":
        return <IoIosRainy className="text-blue-500" />;
      case "snow":
        return <IoIosSnow className="text-blue-300" />;
      case "thunderstorm":
        return <IoIosThunderstorm className="text-purple-600" />;
      default:
        return <FaCloudSun className="text-gray-500" />;
    }
  };

  const getWeatherAlert = (weather) => {
    if (!weather) return null;

    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const windSpeed = weather.wind?.speed || 0;

    const alerts = [];

    if (temp < 10) {
      alerts.push({
        type: "warning",
        message: "কম তাপমাত্রা! ফসল ঢেকে রাখুন",
        icon: "🥶",
      });
    } else if (temp > 35) {
      alerts.push({
        type: "danger",
        message: "অতিরিক্ত গরম! বেশি পানি দিন",
        icon: "🔥",
      });
    }

    if (humidity > 85) {
      alerts.push({
        type: "warning",
        message: "উচ্চ আর্দ্রতা! ছত্রাক রোগের ঝুঁকি",
        icon: "💧",
      });
    }

    if (windSpeed > 10) {
      alerts.push({
        type: "danger",
        message: "প্রবল বাতাস! ফসল সুরক্ষা নিন",
        icon: "💨",
      });
    }

    return alerts;
  };

  const getFarmingAdvice = (weather) => {
    if (!weather) return [];

    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const condition = weather.weather?.[0]?.main?.toLowerCase();

    const advice = [];

    if (condition === "rain") {
      advice.push("☔ বৃষ্টির সময় সেচ বন্ধ রাখুন");
      advice.push("🏠 ফসল ঢাকার ব্যবস্থা করুন");
    } else if (condition === "clear" && temp > 30) {
      advice.push("☀️ দুপুরে ছায়ার ব্যবস্থা করুন");
      advice.push("💧 বেশি পানি সেচ দিন");
    }

    if (humidity < 50) {
      advice.push("🌵 মাটিতে মালচিং করুন");
    }

    return advice;
  };

  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center text-gray-500">
          <FaCloudSun className="text-4xl mx-auto mb-2" />
          <p>আবহাওয়ার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const alerts = getWeatherAlert(weatherData);
  const farmingAdvice = getFarmingAdvice(weatherData);

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-3">
   
          
          <h3 className="text-lg font-bold text-gray-800 text-center">
             বর্তমান আবহাওয়া
          </h3>
      

        <div className="text-center mb-4">
          <div className="text-4xl mb-2 w-10 mx-auto">{getWeatherIcon(weatherData)}</div>
          <div className="text-2xl font-bold text-gray-800">
            {Math.round(weatherData.main?.temp || 0)}°C
          </div>
          <div className="text-gray-600 capitalize">
            {weatherData.weather?.[0]?.description || "তথ্য নেই"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between lg:flex-col">
            <span className="text-gray-600 flex items-center">
              <FaThermometerHalf className="mr-2 text-red-500" />
              অনুভূত
            </span>
            <span className="font-bold text-blue-700">
              {Math.round(weatherData.main?.feels_like || 0)}°C
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between lg:flex-col">
            <span className="text-gray-600 flex items-center">
              <FaTint className="mr-2 text-blue-500" />
              আর্দ্রতা
            </span>
            <span className="font-bold text-blue-700">
              {weatherData.main?.humidity || 0}%
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between lg:flex-col">
            <span className="text-gray-600 flex items-center">
              <FaWind className="mr-2 text-gray-500" />
              বাতাস
            </span>
            <span className="font-bold text-blue-700">
              {Math.round((weatherData.wind?.speed || 0) * 3.6)} কিমি/ঘ
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between lg:flex-col">
            <span className="text-gray-600">চাপ</span>
            <span className="font-bold text-blue-700">
              {weatherData.main?.pressure || 0} hPa
            </span>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      {alerts && alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-2xl text-red-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">
              ⚠️ আবহাওয়া সতর্কতা
            </h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  alert.type === "danger"
                    ? "bg-red-50 border-red-200 text-red-800"
                    : "bg-yellow-50 border-yellow-200 text-yellow-800"
                }`}
              >
                <span className="mr-2">{alert.icon}</span>
                {alert.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farming Advice */}
      {farmingAdvice.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4">
            🌱 আবহাওয়া ভিত্তিক পরামর্শ
          </h3>
          <div className="space-y-2">
            {farmingAdvice.map((advice, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-green-100"
              >
                <p className="text-gray-700 text-sm">{advice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherIntegration;
