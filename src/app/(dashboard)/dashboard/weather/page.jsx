// "use client";
// import React, { useState, useEffect } from "react";
// import { fetchWeather } from "@/app/lib/fetchWeather";
// import {
//   FaTint,
//   FaCloudSun,
//   FaWind,
//   FaTemperatureHigh,
//   FaTachometerAlt,
//   FaInfoCircle,
// } from "react-icons/fa";

// const WeatherPage = () => {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleWeatherUpdate = async () => {
//     setError("");
//     setLoading(true);
//     setWeather(null);

//     try {
//       // Try GPS first
//       await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//           async (pos) => {
//             const { latitude, longitude } = pos.coords;
//             console.log("✅ GPS Location:", latitude, longitude);
//             const data = await fetchWeather(latitude, longitude);
//             setWeather(data);
//             resolve();
//           },
//           (err) => {
//             console.warn("⚠️ GPS failed, fallback to IP:", err);
//             reject(err);
//           }
//         );
//       });
//     } catch {
//       // Fallback to IP location
//       const ipRes = await fetch("https://ipinfo.io/json");
//       const ipData = await ipRes.json();
//       const [latitude, longitude] = ipData.loc.split(",");
//       const data = await fetchWeather(latitude, longitude);
//       setWeather(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleWeatherUpdate();
//   }, []);

//   return (
//     <div className="flex flex-col p-6 bg-white min-h-screen">
//       <main>
//         <section>
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 flex items-center">
//               <FaCloudSun className="mr-2 text-green-600" />
//               আবহাওয়ার পূর্বাভাস{" "}
//               {weather ? `- ${weather.city}` : ""}
//             </h2>
//             <button
//               onClick={handleWeatherUpdate}
//               className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors flex items-center"
//             >
//               <FaCloudSun className="mr-2" />
//               আবহাওয়া আপডেট করুন
//             </button>
//           </div>

//           {loading && (
//             <div className="flex justify-center items-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//               <p className="ml-4 text-gray-700">তথ্য লোড হচ্ছে...</p>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gray-50 border border-green-500 text-green-600 px-4 py-3 rounded-lg mb-4">
//               <p>আবহাওয়ার তথ্য লোড করতে সমস্যা হয়েছে: {error}</p>
//             </div>
//           )}

//           {!loading && !error && weather && (
//             <>
//               {/* 🌤 আজকের পূর্বাভাস */}
//               <div className="bg-gray-100 p-6 rounded-xl mb-8 border border-gray-200">
//                 <p className="font-bold text-lg sm:text-xl text-gray-800 mb-4">
//                   আজকের পূর্বাভাস
//                 </p>
//                 <div className="flex flex-col md:flex-row justify-between items-center">
//                   <div className="grid grid-cols-2 gap-4 text-base sm:text-lg font-medium text-gray-800">
//                     <div>
//                       <span className="text-sm text-gray-600">তাপমাত্রা</span>
//                       <div className="flex items-center text-2xl font-bold">
//                         <FaTemperatureHigh className="mr-2 text-green-500" />
//                         {Math.round(weather.today.temp)}°C
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-sm text-gray-600">আর্দ্রতা</span>
//                       <div className="flex items-center text-2xl font-bold">
//                         <FaTint className="mr-2 text-blue-500" />
//                         {weather.today.humidity}%
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-center mt-4 md:mt-0">
//                     <img
//                       src={`https://openweathermap.org/img/wn/${weather.today.icon}@4x.png`}
//                       alt={weather.today.weather}
//                       width={128}
//                       height={128}
//                       className="mx-auto"
//                     />
//                     <p className="capitalize text-gray-800 font-semibold">
//                       {weather.today.weather}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* 📅 সাপ্তাহিক পূর্বাভাস */}
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
//                 সাপ্তাহিক পূর্বাভাস
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                 {weather.weekly.map((day, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
//                   >
//                     <p className="font-semibold text-sm text-gray-600">
//                       {day.date}
//                     </p>
//                     <img
//                       src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
//                       alt={day.weather}
//                       width={64}
//                       height={64}
//                       className="mx-auto"
//                     />
//                     <p className="text-sm capitalize mt-1 text-gray-700">
//                       {day.weather}
//                     </p>
//                     <p className="text-lg font-bold text-gray-800">
//                       {Math.round(day.temp)}°C
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-8 mb-4">
//                   কৃষি সম্পদ ও পরামর্শ
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
//                     <p className="text-lg font-semibold text-green-600 flex items-center mb-2">
//                       <FaInfoCircle className="mr-2" />
//                       আজকের কৃষি পরামর্শ:
//                     </p>
//                     <p className="text-gray-800">
//                       {weather.today.temp > 30
//                         ? "আজকের তাপমাত্রা বেশি, ফসল সেচের পরিমাণ বাড়ান।"
//                         : "আবহাওয়া অনুকূল, নিয়মিত সেচ দিন।"}
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
//                     <p className="text-lg font-semibold text-green-600 flex items-center mb-2">
//                       <FaInfoCircle className="mr-2" />
//                       সাধারণ নির্দেশিকা:
//                     </p>
//                     <p className="text-gray-800">
//                       মাটির আর্দ্রতা পরীক্ষা করুন এবং প্রয়োজন অনুসারে সেচ দিন।
//                     </p>
//                   </div>
//                 </div>
          

       
//                  <section className="mt-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
//               কৃষি সম্পদ
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
//                 <h3 className="font-semibold text-green-600 mb-2">
//                   কৃষি পরামর্শ
//                 </h3>
//                 <p className="text-sm text-gray-700 mb-3">
//                   বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট থেকে সর্বশেষ কৃষি প্রযুক্তি
//                   সম্পর্কে জানুন।
//                 </p>
//                 <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500 transition-colors">
//                   আরও জানুন
//                 </button>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-green-200">
//                 <h3 className="font-semibold text-green-600 mb-2">বাজার দর</h3>
//                 <p className="text-sm text-gray-700 mb-3">
//                   সর্বশেষ ফসলের বাজার মূল্য এবং বাজার সংবাদ সম্পর্কে আপডেট
//                   থাকুন।
//                 </p>
//                 <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500 transition-colors">
//                   দেখুন
//                 </button>
//               </div>
//             </div>
//           </section>
//             </>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default WeatherPage;



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
  FaSync,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSeedling,
  FaSun,
  FaUmbrella,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaSmog,
  FaTree,
  FaTractor,
  FaShoppingCart,
  FaBook,
  FaChartLine,
  FaLeaf,
  FaWater,
  FaMountain,
  FaCloudShowersHeavy,
} from "react-icons/fa";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiRainMix,
} from "react-icons/wi";
import Link from "next/link";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherIcon = (iconCode, size = 24) => {
    const iconMap = {
      '01d': <WiDaySunny size={size} className="text-yellow-500" />,
      '01n': <WiDaySunny size={size} className="text-yellow-300" />,
      '02d': <WiDayCloudy size={size} className="text-blue-400" />,
      '02n': <WiDayCloudy size={size} className="text-blue-300" />,
      '03d': <WiCloudy size={size} className="text-gray-500" />,
      '03n': <WiCloudy size={size} className="text-gray-400" />,
      '04d': <WiCloudy size={size} className="text-gray-600" />,
      '04n': <WiCloudy size={size} className="text-gray-500" />,
      '09d': <WiRainMix size={size} className="text-blue-500" />,
      '09n': <WiRainMix size={size} className="text-blue-400" />,
      '10d': <WiRain size={size} className="text-blue-600" />,
      '10n': <WiRain size={size} className="text-blue-500" />,
      '11d': <WiThunderstorm size={size} className="text-purple-500" />,
      '11n': <WiThunderstorm size={size} className="text-purple-400" />,
      '13d': <WiSnow size={size} className="text-cyan-400" />,
      '13n': <WiSnow size={size} className="text-cyan-300" />,
      '50d': <WiFog size={size} className="text-gray-400" />,
      '50n': <WiFog size={size} className="text-gray-300" />,
    };
    return iconMap[iconCode] || <WiDaySunny size={size} className="text-yellow-500" />;
  };

  const handleWeatherUpdate = async () => {
    setError("");
    setLoading(true);
    setWeather(null);

    try {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Header with Icons */}
        <header className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl mb-6">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <FaCloudSun className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl md:text-3xl font-bold">কৃষি আবহাওয়া সেবা</h1>
          </div>
          <div className="flex justify-center items-center space-x-4 text-gray-600">
            <FaLeaf className="text-green-500 text-xl" />
            <p className="text-lg max-w-2xl">
              আপনার এলাকার সঠিক আবহাওয়া তথ্য এবং কৃষি পরামর্শ পান
            </p>
            <FaTree className="text-green-500 text-xl" />
          </div>
        </header>

        <main className="space-y-8">
          {/* Location Card with Enhanced Icons */}
          <section className="bg-white rounded-3xl shadow-2xl p-8 border-l-8 border-green-500 transform  transition-all ">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl mr-6 shadow-lg">
                  <FaMapMarkerAlt className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {weather ? `${weather.city}, বাংলাদেশ` : "আপনার অবস্থান"}
                  </h2>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <FaTractor className="text-green-500 mr-2" />
                    বর্তমান অবস্থান অনুযায়ী আবহাওয়া
                  </p>
                </div>
              </div>
              <button
                onClick={handleWeatherUpdate}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:shadow-xl hover:scale-105"
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
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-2xl">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mb-6"></div>
              <FaCloudSun className="text-6xl text-green-500 mb-4 animate-pulse" />
              <p className="text-gray-700 text-xl font-semibold">আবহাওয়ার তথ্য লোড হচ্ছে...</p>
              <p className="text-gray-500 mt-2">অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন</p>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-8 border-red-500 text-red-800 px-8 py-6 rounded-3xl shadow-2xl">
              <div className="flex items-center">
                <div className="bg-red-500 p-3 rounded-xl mr-4">
                  <FaInfoCircle className="text-white text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-lg">তথ্য লোড করতে সমস্যা</p>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && weather && (
            <>
              {/* Today's Weather - Enhanced with Icons */}
              <section className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white rounded-3xl shadow-2xl p-8 transform  transition-all ">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="bg-white/20 p-3 rounded-2xl mr-4">
                        <FaCalendarAlt className="text-2xl" />
                      </div>
                      <h3 className="text-3xl font-bold">আজকের আবহাওয়া</h3>
                    </div>
                    <p className="text-blue-100 text-lg ml-16">
                      {new Date().toLocaleDateString('bn-BD', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="text-right mt-4 lg:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
                      <p className="text-6xl font-bold">{Math.round(weather.today.temp)}°C</p>
                      <div className="flex items-center justify-center mt-3">
                        {getWeatherIcon(weather.today.icon, 32)}
                        <p className="text-blue-100 capitalize ml-3 text-xl font-semibold">
                          {weather.today.weather}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Metrics Grid with Icons */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {[
                    { 
                      icon: FaTint, 
                      label: "আর্দ্রতা", 
                      value: `${weather.today.humidity}%`, 
                      bg: "from-blue-400 to-cyan-500",
                      iconColor: "text-blue-200"
                    },
                    { 
                      icon: FaWind, 
                      label: "বাতাস", 
                      value: `${weather.today.windSpeed || 'N/A'} m/s`, 
                      bg: "from-green-400 to-emerald-500",
                      iconColor: "text-green-200"
                    },
                    { 
                      icon: FaTachometerAlt, 
                      label: "চাপ", 
                      value: `${weather.today.pressure || 'N/A'} hPa`, 
                      bg: "from-purple-400 to-indigo-500",
                      iconColor: "text-purple-200"
                    },
                    { 
                      icon: FaTemperatureHigh, 
                      label: "অনুভূতি", 
                      value: `${Math.round(weather.today.feelsLike)}°C`, 
                      bg: "from-red-400 to-pink-500",
                      iconColor: "text-red-200"
                    }
                  ].map((metric, index) => (
                    <div key={index} className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/25 transition-all ">
                      <div className={`bg-gradient-to-br ${metric.bg} p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center`}>
                        <metric.icon className="text-2xl text-white" />
                      </div>
                      <p className="text-blue-100 text-sm mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Weather Icon Display */}
                <div className="flex justify-center mt-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8">
                    <div className="flex items-center justify-center">
                      {getWeatherIcon(weather.today.icon, 120)}
                    </div>
                  </div>
                </div>
              </section>

              {/* Weekly Forecast - Enhanced with Icons */}
              <section className="bg-white rounded-3xl shadow-2xl p-8 border-l-8 border-blue-500">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl mr-4 shadow-lg">
                    <FaCalendarAlt className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">সাপ্তাহিক পূর্বাভাস</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {weather.weekly.map((day, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 transition-all  rounded-2xl p-4 text-center border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transform "
                    >
                      <p className="font-bold text-gray-700 mb-3 text-sm">
                        {day.date}
                      </p>
                      <div className="bg-white rounded-xl p-3 mb-3 shadow-inner flex justify-center">
                        {getWeatherIcon(day.icon, 48)}
                      </div>
                      <p className="text-xs capitalize text-gray-600 mb-2 font-medium">
                        {day.weather}
                      </p>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full py-2 px-3">
                        <span className="text-sm font-bold">
                          {Math.round(day.temp)}°C
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Agriculture Advice - Enhanced with Icons */}
              <section className="bg-white rounded-3xl shadow-2xl p-8 border-l-8 border-emerald-500">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl mr-4 shadow-lg">
                    <FaSeedling className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">কৃষি পরামর্শ</h3>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Today's Special Advice */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-all ">
                    <div className="flex items-center mb-6">
                      <div className="bg-emerald-500 p-3 rounded-xl mr-4 shadow-md">
                        <FaInfoCircle className="text-white text-xl" />
                      </div>
                      <h4 className="text-xl font-bold text-emerald-800">আজকের বিশেষ পরামর্শ</h4>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {weather.today.temp > 30 ? (
                            <FaSun className="text-orange-500 text-2xl" />
                          ) : weather.today.temp < 20 ? (
                            <FaSnowflake className="text-blue-400 text-2xl" />
                          ) : (
                            <FaCloudSun className="text-green-500 text-2xl" />
                          )}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {weather.today.temp > 30
                            ? "🌡️ আজকের তাপমাত্রা বেশি থাকায় ফসলের সেচের পরিমাণ বাড়ান এবং বিকেল বেলায় সেচ দিন।"
                            : weather.today.temp < 20
                            ? "❄️ তাপমাত্রা কম থাকায় সকালে সেচ দেবেন না, বরং দুপুরে হালকা সেচ দিন।"
                            : "🌤️ আবহাওয়া অনুকূল আছে, নিয়মিত সেচ ও পরিচর্যা চালিয়ে যান।"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* General Guidelines */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="bg-cyan-500 p-3 rounded-xl mr-4 shadow-md">
                        <FaWater className="text-white text-xl" />
                      </div>
                      <h4 className="text-xl font-bold text-cyan-800">সাধারণ নির্দেশিকা</h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: FaLeaf, text: "মাটির আর্দ্রতা পরীক্ষা করুন এবং প্রয়োজন অনুসারে সেচ দিন" },
                        { icon: FaTree, text: "ফসলের রোগবালাই পর্যবেক্ষণ করুন" },
                        { icon: FaSeedling, text: "জৈব সারের ব্যবহার বাড়ান" },
                        { icon: FaTractor, text: "সময়মতো ফসল সংগ্রহ করুন" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center bg-white rounded-lg p-4 border border-cyan-100 hover:shadow-md transition-all duration-200">
                          <div className="bg-cyan-100 p-2 rounded-lg mr-4">
                            <item.icon className="text-cyan-600 text-lg" />
                          </div>
                          <span className="text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Additional Resources - Enhanced with Icons */}
              <section className="bg-white rounded-3xl shadow-2xl p-8 border-l-8 border-amber-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">কৃষি সম্পদ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 hover:shadow-xl transition-all  transform ">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-500 p-3 rounded-xl mr-4 shadow-md">
                        <FaBook className="text-white text-xl" />
                      </div>
                      <h4 className="font-bold text-amber-800 text-xl">কৃষি পরামর্শ</h4>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট থেকে সর্বশেষ কৃষি প্রযুক্তি 
                      ও আধুনিক চাষাবাদ পদ্ধতি সম্পর্কে জানুন।
                    </p>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center shadow-lg hover:scale-105">
                      <FaBook className="mr-3" />
                      বিস্তারিত জানুন
                      <span className="ml-2 text-xl">→</span>
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all  transform ">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-500 p-3 rounded-xl mr-4 shadow-md">
                        <FaChartLine className="text-white text-xl" />
                      </div>
                      <h4 className="font-bold text-purple-800 text-xl">বাজার দর</h4>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      সর্বশেষ ফসলের বাজার মূল্য, চাহিদা এবং বাজার সংবাদ সম্পর্কে 
                      আপডেট থাকুন এবং ভালো দামে বিক্রয়ের সুযোগ নিন।
                    </p>
                    <Link href={'/dashboard/market-price'} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center shadow-lg hover:scale-105">
                      <FaShoppingCart className="mr-3" />
                      বাজার দেখুন
                      <span className="ml-2 text-xl">→</span>
                    </Link>
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