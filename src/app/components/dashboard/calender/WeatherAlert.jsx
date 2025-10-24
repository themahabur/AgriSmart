import { fetchWeather } from "@/app/lib/fetchWeather";
import { getLocation } from "@/app/lib/getlocation";
import { useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaSun,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaInfoCircle,
} from "react-icons/fa";

const WeatherAlert = () => {
  const [weatherData, setWeatherData] = useState(null);

  // Weather data
  useEffect(() => {
    async function loadWeather() {
      try {
        const location = await getLocation();
        if (!location) {
          throw new Error("Unable to get location");
        }
        const { latitude, longitude } = location;
        const data = await fetchWeather(latitude, longitude);
        setWeatherData(data.today ? data.today : data); 
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }
    loadWeather();
  }, []);

  // Default weather data to prevent destructuring errors
  const defaultWeatherData = {
    temp: 0,
    humidity: 0,
    weather: "Loading...",
    feelsLike: 0,
    windSpeed: 0,
    place: "লোড হচ্ছে...",
    pressure: 0,
    time: new Date().toISOString(),
  };

  // Use weatherData if available, otherwise use defaults
  const safeWeatherData = weatherData || defaultWeatherData;
  const {
    temp,
    humidity,
    weather,
    feelsLike,
    windSpeed,
    place,
    pressure,
    time,
  } = safeWeatherData;

  const getWeatherAlert = () => {
    // If weatherData is null, show loading message
    if (!weatherData) {
      return {
        type: "info",
        message: "⏳ আবহাওয়া ডেটা লোড হচ্ছে...",
        suggestions: [
          "অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন",
          "ইন্টারনেট সংযোগ পরীক্ষা করুন",
          "পৃষ্ঠাটি রিফ্রেশ করুন",
        ],
      };
    }

    // Temperature-based alerts
    if (temp > 35) {
      return {
        type: "danger",
        message:
          "🚨 জরুরি: উচ্চ তাপমাত্রা - ফসলের জন্য অতিরিক্ত সেচ দিন এবং ছায়ার ব্যবস্থা করুন",
        suggestions: [
          "সকাল ও সন্ধ্যায় সেচ দিন",
          "গাছের গোড়ায় মালচিং করুন",
          "তাপ সহনশীল জাতের ফসল চাষ করুন",
        ],
      };
    } else if (temp > 30 && temp <= 35) {
      return {
        type: "warning",
        message: "⚠️ সতর্কতা: মাঝারি উচ্চ তাপমাত্রা - ফসলের যত্ন নিন",
        suggestions: [
          "নিয়মিত সেচ বজায় রাখুন",
          "ফসলের অবস্থা পর্যবেক্ষণ করুন",
          "দুপুরে সেচ এড়িয়ে চলুন",
        ],
      };
    } else if (temp < 15) {
      return {
        type: "warning",
        message: "⚠️ সতর্কতা: নিম্ন তাপমাত্রা - শীতকালীন ফসলের যত্ন নিন",
        suggestions: [
          "শীতকালীন সেচ কম দিন",
          "কুয়াশা থেকে ফসল রক্ষা করুন",
          "শীত সহনশীল জাত ব্যবহার করুন",
        ],
      };
    }

    // Humidity-based alerts
    if (humidity < 40) {
      return {
        type: "danger",
        message: "🚨 জরুরি: শুষ্ক আবহাওয়া - ফসলের নিয়মিত সেচ দিন",
        suggestions: [
          "মাটি আর্দ্র রাখুন",
          "স্প্রিংকলার সেচ ব্যবহার করুন",
          "সকালে সেচ দিন",
        ],
      };
    } else if (humidity > 80) {
      return {
        type: "warning",
        message: "⚠️ সতর্কতা: অতিরিক্ত আর্দ্রতা - ফসলের রোগ প্রতিরোধ করুন",
        suggestions: [
          "নিকাশী ব্যবস্থা ভালো রাখুন",
          "ছত্রাকনাশক স্প্রে করুন",
          "বায়ু চলাচল নিশ্চিত করুন",
        ],
      };
    }

    // Weather condition-based alerts
    if (weather?.toLowerCase().includes("rain")) {
      return {
        type: "warning",
        message: "🌧️ বৃষ্টিপাত - ফসল রক্ষার প্রস্তুতি নিন",
        suggestions: [
          "নিকাশী ব্যবস্থা পরীক্ষা করুন",
          "ফসল সংগ্রহে ত্বরান্বিত হোন",
          "জলাবদ্ধতা এড়িয়ে চলুন",
        ],
      };
    } else if (weather?.toLowerCase().includes("cloud")) {
      return {
        type: "info",
        message: "☁️ মেঘলা আবহাওয়া - ফসলের বৃদ্ধির জন্য ভালো",
        suggestions: [
          "সার প্রয়োগের ভালো সময়",
          "ফসলের বৃদ্ধি পর্যবেক্ষণ করুন",
          "প্রয়োজনীয় সেচ দিন",
        ],
      };
    }

    // Feels-like temperature alerts
    if (feelsLike > 38) {
      return {
        type: "danger",
        message: "🚨 জরুরি: উত্তপ্ত আবহাওয়া - ফসলের অতিরিক্ত যত্ন নিন",
        suggestions: [
          "অতিরিক্ত পানি সরবরাহ করুন",
          "ছায়ার ব্যবস্থা করুন",
          "ফসলের অবস্থা নিয়মিত চেক করুন",
        ],
      };
    }

    // Wind speed alerts
    if (windSpeed > 20) {
      return {
        type: "warning",
        message: "💨 প্রবল বাতাস - ফসল রক্ষা করুন",
        suggestions: [
          "উচ্চ গাছের জন্য খুঁটি দিন",
          "নাজুক ফসল রক্ষা করুন",
          "ঝড়ের প্রস্তুতি নিন",
        ],
      };
    }

    // Default good weather condition
    return {
      type: "good",
      message: "✅ অনুকূল আবহাওয়া - ফসলের জন্য ভালো সময়",
      suggestions: [
        "নিয়মিত ফসল পরিচর্যা করুন",
        "সার ও সেচের রুটিন মেনে চলুন",
        "ফসলের বৃদ্ধি পর্যবক্ষণ করুন",
      ],
    };
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "danger":
        return "from-red-100 to-orange-100 border-red-500 text-red-800";
      case "warning":
        return "from-amber-100 to-yellow-100 border-amber-500 text-amber-800";
      case "info":
        return "from-blue-100 to-cyan-100 border-blue-500 text-blue-800";
      case "good":
        return "from-green-100 to-emerald-100 border-green-500 text-green-800";
      default:
        return "from-gray-100 to-gray-200 border-gray-500 text-gray-800";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "danger":
        return <FaExclamationTriangle className="text-red-600 text-xl" />;
      case "warning":
        return <FaExclamationTriangle className="text-amber-600 text-xl" />;
      case "info":
        return <FaInfoCircle className="text-blue-600 text-xl" />;
      case "good":
        return <FaSun className="text-green-600 text-xl" />;
      default:
        return <FaInfoCircle className="text-gray-600 text-xl" />;
    }
  };

  const getWeatherIcon = (weather) => {
    const desc = weather.toLowerCase();
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('sun')) return '☀️';
    if (desc.includes('wind')) return '💨';
    return '🌤️';
  };

  const alert = getWeatherAlert();

  return (
    <div
      className={`bg-gradient-to-r ${getAlertColor(
        alert.type
      )} border-l-4 rounded-lg p-4 mb-6 shadow-md`}
    >
      <div className="flex flex-col gap-4">
        {/* Alert Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            {getAlertIcon(alert.type)}
            <p className="font-bold font-bangla text-lg leading-tight">
              {alert.message}
            </p>
          </div>

          {/* Weather Stats */}
          <div className="flex items-center gap-4 text-sm bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-sm">
            <div className="flex items-center gap-1">
              <FaTemperatureHigh className="text-red-500" />
              <span className="font-bangla font-semibold">{temp}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <FaTint className="text-blue-500" />
              <span className="font-bangla font-semibold">{humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <FaWind className="text-green-500" />
              <span className="font-bangla font-semibold">
                {windSpeed} km/h
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg">{getWeatherIcon(weather)}</span>
              <span className="font-bangla font-semibold">{weather}</span>
            </div>
          </div>
        </div>

        {/* Location and Time */}
        <div className="flex items-center justify-between text-sm">
          
          <div className="text-gray-500 font-bangla bg-white px-3 py-1 rounded-full border">
            {weatherData ? (
              <>
                আপডেট:{" "}
                {new Date(time).toLocaleTimeString("bn-BD", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            ) : (
              "ডেটা লোড হচ্ছে..."
            )}
          </div>
        </div>

        {/* Actionable Suggestions */}
        {weatherData && (
          <div className="mt-2 bg-white rounded-lg p-4 border shadow-sm">
            <h4 className="font-bold text-gray-800 font-bangla mb-3 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" />
              আজকের করণীয়:
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {alert.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-sm font-bangla text-gray-700">
                    {suggestion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Weather Info */}
        {weatherData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white bg-opacity-80 p-3 rounded-lg border text-center shadow-sm">
              <div className="font-bangla text-gray-600 mb-1">অনুভূত তাপমাত্রা</div>
              <div className="font-bold text-orange-600 text-lg">{feelsLike}°C</div>
              <div className="text-xs text-gray-500 mt-1">গরম অনুভূত হচ্ছে</div>
            </div>
            <div className="bg-white bg-opacity-80 p-3 rounded-lg border text-center shadow-sm">
              <div className="font-bangla text-gray-600 mb-1">বায়ুচাপ</div>
              <div className="font-bold text-blue-600 text-lg">{pressure} hPa</div>
              <div className="text-xs text-gray-500 mt-1">স্বাভাবিক চাপ</div>
            </div>
            <div className="bg-white bg-opacity-80 p-3 rounded-lg border text-center shadow-sm">
              <div className="font-bangla text-gray-600 mb-1">আবহাওয়া</div>
              <div className="font-bold text-amber-600 text-lg flex items-center justify-center gap-1">
                <span>{getWeatherIcon(weather)}</span>
                {weather}
              </div>
              <div className="text-xs text-gray-500 mt-1">পরিষ্কার আকাশ</div>
            </div>
            <div className="bg-white bg-opacity-80 p-3 rounded-lg border text-center shadow-sm">
              <div className="font-bangla text-gray-600 mb-1">কৃষি সুযোগ</div>
              <div className="font-bold text-green-600 text-lg">ফসল পরিচর্যা</div>
              <div className="text-xs text-gray-500 mt-1">উত্তম সময়</div>
            </div>
          </div>
        )}

        {/* Weather Summary */}
        {weatherData && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="font-bangla text-blue-800 text-sm">
                <strong>আবহাওয়া সারাংশ:</strong> {place} এ বর্তমান তাপমাত্রা {temp}°C, 
                আর্দ্রতা {humidity}%, {weather.toLowerCase().includes('clear') ? 'পরিষ্কার আকাশ' : weather}। 
                ফসলের পরিচর্যার জন্য উত্তম সময়।
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAlert;
