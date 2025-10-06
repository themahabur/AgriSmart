"use client";
import React, { useState, useEffect } from "react";
import {
  FaTint,
  FaCloudSun,
  FaCalendarAlt,
  FaSearch,
  FaWind,
  FaTemperatureHigh,
  FaTachometerAlt,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTasks, setExpandedTasks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dhaka coordinates
  const lat = "23.8103";
  const lon = "90.4125";
  const apiKey = "eed75703a552ed1ad8db7b42f4f3e024";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=bn`;

  // Crop options for dropdown
  const cropOptions = [
    { value: "all", label: "সব ফসল" },
    { value: "rice", label: "ধান" },
    { value: "vegetables", label: "সবজি" },
    { value: "fruits", label: "ফল" },
    { value: "potato", label: "আলু" },
    { value: "jute", label: "পাট" },
    { value: "mustard", label: "সরিষা" },
  ];

  // Work schedule data
  const workSchedule = {
    rice: [
      {
        task: "বীজ বপন",
        description:
          "অক্টোবরের প্রথম সপ্তাহে আমন ধানের বীজ বপন করুন। মাটি আর্দ্র রাখুন এবং নিষ্কাশন নিশ্চিত করুন।",
        nextStep: "১৫-২০ দিন পর চারা রোপণের জন্য প্রস্তুতি নিন।",
        month: "অক্টোবর",
        duration: "৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ভালভাবে চাষ ও মই দিয়ে প্রস্তুত করুন",
          "বীজ ২৪ ঘন্টা পানিতে ভিজিয়ে রাখুন",
          "প্রতি হেক্টরে ৩০-৪০ কেজি বীজ ব্যবহার করুন",
          "বীজ বপনের পর হালকা সেচ দিন",
        ],
      },
    ],
    vegetables: [
      {
        task: "মাটি প্রস্তুতি",
        description:
          "অক্টোবরে শীতকালীন সবজি (যেমন ফুলকপি, বাঁধাকপি) জন্য মাটি চাষ করুন। জৈব সার মেশান।",
        nextStep: "৭-১০ দিন পর বীজ বা চারা রোপণ করুন।",
        month: "অক্টোবর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ২-৩ বার চাষ ও মই দিন",
          "প্রতি হেক্টরে ১৫-২০ টন জৈব সার প্রয়োগ করুন",
          "বেড তৈরি করুন এবং নিষ্কাশনের ব্যবস্থা করুন",
          "মাটির pH ৬-৬.৫ এর মধ্যে রাখুন",
        ],
      },
    ],
    fruits: [
      {
        task: "গাছ ছাঁটাই",
        description:
          "অক্টোবরে আম, লিচু বা কাঁঠাল গাছের অতিরিক্ত ডাল ছাঁটাই করুন।",
        nextStep: "ছাঁটাইয়ের পর কীটনাশক স্প্রে করুন।",
        month: "অক্টোবর",
        duration: "১০-১৫ দিন",
        priority: "মাধ্যমিক",
        steps: [
          "শুকনো ও রোগাক্রান্ত ডাল কাটুন",
          "অতিরিক্ত ঘন ডাল পাতলা করুন",
          "ছাঁটাই করার পর কাটা স্থানে বোর্দো পেস্ট লাগান",
          "ছাঁটাই কাঁচি জীবাণুমুক্ত করুন",
        ],
      },
    ],
    potato: [
      {
        task: "জমি প্রস্তুতি",
        description:
          "অক্টোবরে আলু চাষের জন্য জমি প্রস্তুত করুন। মাটি গভীরভাবে চাষ করুন।",
        nextStep: "বীজ আলু বপন করুন",
        month: "অক্টোবর",
        duration: "৭-১০ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ১৫-২০ সেমি গভীর পর্যন্ত চাষ করুন",
          "মই দিয়ে মাটি সমতল ও নরম করুন",
          "প্রতি হেক্টরে ১৫-২০ টন জৈব সার মিশান",
          "বেড তৈরি করুন এবং নিষ্কাশনের ব্যবস্থা করুন",
        ],
      },
    ],
    jute: [
      {
        task: "জমি প্রস্তুতি",
        description:
          "মার্চ-এপ্রিলে পাট চাষের জন্য জমি প্রস্তুত করুন। মাটি ভালভাবে চাষ করুন।",
        nextStep: "বীজ বপন করুন",
        month: "মার্চ-এপ্রিল",
        duration: "১০-১২ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ৪-৫ বার চাষ ও মই দিন",
          "মাটি ঝুরঝুরে ও সমতল করুন",
          "প্রতি হেক্টরে ১০-১২ টন জৈব সার প্রয়োগ করুন",
          "জমিতে পর্যাপ্ত নিষ্কাশনের ব্যবস্থা করুন",
        ],
      },
    ],
    mustard: [
      {
        task: "জমি প্রস্তুতি",
        description:
          "অক্টোবর-নভেম্বরে সরিষা চাষের জন্য জমি প্রস্তুত করুন। মাটি হালকা চাষ করুন।",
        nextStep: "বীজ বপন করুন",
        month: "অক্টোবর-নভেম্বর",
        duration: "৫-৭ দিন",
        priority: "উচ্চ",
        steps: [
          "জমি ২-৩ বার চাষ ও মই দিন",
          "মাটি সমতল ও ঝুরঝুরে করুন",
          "প্রতি হেক্টরে ৮-১০ টন জৈব সার প্রয়োগ করুন",
          "বেড পদ্ধতিতে চাষ করা ভালো",
        ],
      },
    ],
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("আবহাওয়া তথ্য লোড করতে ব্যর্থ");
        }
        const data = await response.json();
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setWeatherData(dailyData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [apiUrl]);

  // Toggle task expansion
  const toggleTaskExpansion = (index) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const displayedSchedule =
    selectedCrop === "all"
      ? [
          ...workSchedule.rice,
          ...workSchedule.vegetables,
          ...workSchedule.fruits,
          ...workSchedule.potato,
          ...workSchedule.jute,
          ...workSchedule.mustard,
        ]
      : workSchedule[selectedCrop];

  const filteredSchedule = displayedSchedule.filter(
    (item) =>
      item.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSchedule.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatTodayDate = (dt) => {
    if (!dt) return "আজকের তারিখ";
    return new Date(dt * 1000).toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const todayForecast = weatherData.length > 0 ? weatherData[0] : null;
  const weekForecast = weatherData.length > 1 ? weatherData.slice(1) : [];

  const getWeatherAdvice = (forecast) => {
    if (!forecast)
      return "আবহাওয়ার তথ্য অনুপস্থিত। নিয়মিত সেচ ও পরিচর্যা বজায় রাখুন।";
    const temp = forecast.main.temp;
    const humidity = forecast.main.humidity;
    const windSpeed = forecast.wind.speed;
    const weatherMain = forecast.weather[0].main;
    if (weatherMain === "Rain") {
      return "বৃষ্টির সম্ভাবনা আছে, সেচ কমিয়ে দিন। বৃষ্টি হলে সার ও কীটনাশক স্প্রে করা থেকে বিরত থাকুন।";
    } else if (temp > 35) {
      return "অতিরিক্ত গরম, সকাল ও সন্ধ্যায় সেচ দিন। ফসলকে সরাসরি সূর্যের তাপ থেকে রক্ষা করুন।";
    } else if (temp < 15) {
      return "ঠান্ডা আবহাওয়া, ফসলকে কুয়াশা ও ঠান্ডা থেকে সুরক্ষার ব্যবস্থা নিন। প্রয়োজনে হালকা সেচ দিন।";
    } else if (humidity > 80) {
      return "উচ্চ আর্দ্রতা, ফসলের রোগের ঝুঁকি বেশি। ছত্রাকনাশক স্প্রে করার জন্য আবহাওয়া পর্যবেক্ষণ করুন।";
    } else if (windSpeed > 5) {
      return "তীব্র বাতাস, দুর্বল বা লম্বা গাছের সুরক্ষা নিশ্চিত করুন (যেমন খুঁটি দেওয়া)।";
    } else {
      return "নিয়মিত সেচ ও পরিচর্যা বজায় রাখুন। আবহাওয়া চাষের জন্য অনুকূল।";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "উচ্চ":
        return "border-red-500";
      case "মাধ্যমিক":
        return "border-yellow-500";
      default:
        return "border-green-500";
    }
  };

  return (
    <div className="flex flex-col font-['Noto_Sans_Bengali'] p-4 sm:p-6 md:p-8 lg:p-10 bg-white min-h-screen">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 flex items-center">
              <FaCloudSun className="mr-2 text-green-600" />
              আবহাওয়ার পূর্বাভাস (ঢাকা)
            </h2>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <p className="ml-4 text-gray-700">তথ্য লোড হচ্ছে...</p>
              </div>
            )}
            {error && (
              <div className="bg-gray-50 border border-green-500 text-green-600 px-4 py-3 rounded-lg mb-4">
                <p>আবহাওয়ার তথ্য লোড করতে সমস্যা হয়েছে: {error}</p>
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors flex items-center"
                  onClick={() => window.location.reload()}
                >
                  আবার চেষ্টা করুন
                </button>
              </div>
            )}

            {!loading && !error && todayForecast ? (
              <>
                <div className="bg-gray-100 p-4 sm:p-6 rounded-xl mb-8 border border-gray-100">
                  <p className="font-bold text-lg sm:text-xl text-gray-800 mb-4">
                    {formatTodayDate(todayForecast.dt)}
                  </p>
                  <div className="flex flex-col md:flex-row justify-between items-center space-x-0 md:space-x-4">
                    <div className="flex-1 grid grid-cols-2 gap-4 text-base sm:text-lg font-medium text-gray-800">
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-normal text-gray-600">
                          তাপমাত্রা
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-700 flex items-center">
                          <FaTemperatureHigh className="w-5 h-5 mr-1 text-green-500" />
                          {Math.round(todayForecast.main.temp)}°C
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-normal text-gray-600">
                          আর্দ্রতা
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-700 flex items-center">
                          <FaTint className="w-5 h-5 mr-1 text-gray-700" />
                          {todayForecast.main.humidity}%
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-normal text-gray-600">
                          বাতাস
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-700 flex items-center">
                          <FaWind className="w-5 h-5 mr-1 text-gray-700" />
                          {todayForecast.wind.speed.toFixed(1)} মি/সে
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-normal text-gray-600">
                          চাপ
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-700 flex items-center">
                          <FaTachometerAlt className="w-5 h-5 mr-1 text-gray-700" />
                          {todayForecast.main.pressure} hPa
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center mt-4 md:mt-0">
                      <img
                        src={`http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}@4x.png`}
                        alt={todayForecast.weather[0].description}
                        width={128}
                        height={128}
                        className="mx-auto"
                      />
                      <p className="text-lg sm:text-xl font-semibold capitalize text-black">
                        {todayForecast.weather[0].description}
                      </p>
                    </div>
                  </div>
                </div>
                {weekForecast.length > 0 && (
                  <>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                      সাপ্তাহিক পূর্বাভাস
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {weekForecast.map((forecast, index) => (
                        <div
                          key={index}
                          className={`${
                            forecast.weather[0].icon.startsWith("01")
                              ? "bg-yellow-100"
                              : "bg-gray-50"
                          } rounded-lg p-4 text-center transition-shadow border border-gray-300`}
                        >
                          <p className="font-semibold text-sm sm:text-md text-gray-600">
                            {new Date(forecast.dt * 1000)
                              .toLocaleDateString("bn-BD", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })
                              .replace("রবি", "রবি")
                              .replace("সোম", "সোম")
                              .replace("মঙ্গল", "মঙ্গল")
                              .replace("বুধ", "বুধ")
                              .replace("বৃহস্পতি", "বৃহ:")
                              .replace("শুক্র", "শুক্র")
                              .replace("শনি", "শনি")}
                          </p>
                          <div className="my-2 flex-grow">
                            <img
                              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                              alt={forecast.weather[0].description}
                              width={64}
                              height={64}
                              className="mx-auto"
                            />
                            <p className="text-sm font-medium capitalize mt-1 text-gray-700">
                              {forecast.weather[0].description}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-lg sm:text-xl font-bold text-gray-600">
                              {Math.round(forecast.main.temp)}°C
                            </p>
                            <p className="text-xs text-gray-600">
                              আর্দ্রতা: {forecast.main.humidity}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

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
                      {getWeatherAdvice(todayForecast)}
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
              </>
            ) : (
              !loading &&
              !error && (
                <p className="text-center text-gray-600 py-8">
                  আবহাওয়ার তথ্য পাওয়া যায়নি।
                </p>
              )
            )}
          </section>

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
        </div>

        {/* Right Column (Filters & Schedule) */}
        <div className="lg:col-span-1 bg-gray-50 p-4 sm:p-6 rounded-xl">
          <section className="pb-5">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-2/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="কাজের নাম বা বর্ণনা লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-white text-gray-800 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <FaSearch className="absolute left-3 top-3 text-green-600" />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="relative">
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full px-4 py-2 pr-10 bg-white text-gray-800 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    {cropOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-white text-gray-800"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-3.5 text-green-600 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-800" />
                কৃষি কাজের সময়সূচী
              </h2>
              <div className="text-sm text-gray-700 flex items-center">
                <FaInfoCircle className="mr-1 text-gray-600" />
                মোট কাজ: {filteredSchedule.length}টি
              </div>
            </div>

            {filteredSchedule.length === 0 ? (
              <div className="text-center py-8">
                <FaSearch className="text-4xl text-green-600 mx-auto mb-2" />
                <p className="text-gray-700">
                  কোন কাজ পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {currentItems.map((item, index) => (
                    <div
                      key={index}
                      className={`border-l-4 p-4 rounded-r-lg transition-all bg-white ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      <div className="flex flex-col">
                        <div className="mb-2 flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-base sm:text-lg font-medium text-gray-800">
                              {item.task}
                            </h3>
                            <span
                              className={`ml-2 px-2 py-1 rounded text-xs ${
                                item.priority === "উচ্চ"
                                  ? "bg-red-500 text-white"
                                  : item.priority === "মাধ্যমিক"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-gray-700">{item.description}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>পরবর্তী কাজ:</strong> {item.nextStep}
                          </p>

                          {item.steps && (
                            <div className="mt-3">
                              <button
                                onClick={() =>
                                  toggleTaskExpansion(indexOfFirstItem + index)
                                }
                                className="flex items-center text-green-600 hover:text-green-500 text-sm font-medium"
                              >
                                <span>
                                  ধাপে ধাপে পদ্ধতি{" "}
                                  {expandedTasks[indexOfFirstItem + index]
                                    ? "লুকান"
                                    : "দেখুন"}
                                </span>
                                <svg
                                  className={`ml-1 w-4 h-4 transition-transform ${
                                    expandedTasks[indexOfFirstItem + index]
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>

                              {expandedTasks[indexOfFirstItem + index] && (
                                <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-green-200">
                                  <h4 className="font-medium text-green-600 mb-2">
                                    বিস্তারিত পদ্ধতি:
                                  </h4>
                                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                    {item.steps.map((step, stepIndex) => (
                                      <li key={stepIndex} className="pl-2">
                                        {step}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-start text-sm space-x-4 mt-2 border-t border-green-200 pt-2">
                          <div className="flex items-center text-gray-700">
                            <FaCalendarAlt className="mr-1 text-green-600" />
                            <span>
                              <strong>মাস:</strong> {item.month}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <FaTachometerAlt className="mr-1 text-green-600" />
                            <span>
                              <strong>সময়:</strong> {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    পূর্ববর্তী
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === number
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    পরবর্তী
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default WeatherPage;