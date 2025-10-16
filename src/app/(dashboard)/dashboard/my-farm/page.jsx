
"use client";
import React, { useEffect, useState } from "react";
import {
  FaTractor,
  FaPlus,
 
  FaEdit,
  
} from "react-icons/fa";
import AddFarmModal from "../../../components/dashboard/myfarm/AddFarmModal";
import FarmCard from "../../../components/dashboard/myfarm/FarmCard";
import FarmProgress from "../../../components/dashboard/myfarm/FarmProgress";
import WeatherSoilCards from "../../../components/dashboard/myfarm/WeatherSoilCards";
import QuickActions from "../../../components/dashboard/myfarm/QuickActions";
import { fetchWeather } from "@/app/lib/fetchWeather";

const MyFarmPage = () => {
   const [weatherData, setWeatherData] = useState(null);
  // State management
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: "আমার প্রধান ফার্ম",
      location: "সিলেট, বাংলাদেশ",
      size: "২.৫ একর",
      crop: "ধান",
      status: "চলমান",
      lastUpdate: "২ দিন আগে",
      coordinates: { latitude: 24.8917, longitude: 91.8833 },
      cropDetails: {
        type: "ধান",
        variety: "BRRI Dhan-29",
        plantingDate: "2025-09-20",
      },
      soilDetails: { type: "দোআঁশ মাটি", pH: 6.5, nutrients: "মাধ্যমিক" },
      irrigation: { source: "নলকূপ", lastDate: "2025-10-08" },
      pestAlert: false,
      organicPractices: true,
    },
    {
      id: 2,
      name: "আমার বাগান",
      location: "সিলেট, বাংলাদেশ",
      size: "০.৫ একর",
      crop: "সবজি",
      status: "পরিকল্পনাধীন",
      lastUpdate: "৫ দিন আগে",
      coordinates: { latitude: 24.8917, longitude: 91.8833 },
      cropDetails: {
        type: "সবজি",
        variety: "টমেটো",
        plantingDate: "2025-10-01",
      },
      soilDetails: { type: "এঁটেল মাটি", pH: 7.0, nutrients: "উচ্চ" },
      irrigation: { source: "বৃষ্টি", lastDate: "2025-10-05" },
      pestAlert: true,
      organicPractices: false,
    },
  ]);

  // Activities data
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "সেচ প্রদান",
      description: "প্রধান ফার্মে সেচ দেওয়া প্রয়োজন",
      date: "২০২৫-১০-১০",
      status: "সম্পন্ন",
      priority: "উচ্চ",
      category: "irrigation",
    },
    {
      id: 2,
      title: "সার প্রয়োগ",
      description: "ইউরিয়া সার প্রয়োগ করতে হবে",
      date: "২০২৫-১০-১২",
      status: "চলমান",
      priority: "মাধ্যমিক",
      category: "fertilizer",
    },
    {
      id: 3,
      title: "ফসল কাটা",
      description: "ধান কাটার জন্য প্রস্তুতি নিতে হবে",
      date: "২০২৫-১১-১৫",
      status: "পরবর্তী",
      priority: "উচ্চ",
      category: "harvest",
    },
  ]);

  // Weather data
  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await fetchWeather();
        setWeatherData(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }
    loadWeather();
  }, []);
  // const [weatherData] = useState({
  //   temperature: "২৮°C",
  //   humidity: "৬৫%",
  //   condition: "সূর্যোজ্জ্বল",
  //   windSpeed: "১২ কিমি/ঘণ্টা",
  //   forecast: "গত ২ দিনের মধ্যে বৃষ্টির সম্ভাবনা নেই",
  //   icon: "☀️",
  // });

  // Soil data
  const [soilData] = useState({
    pH: "৬.৫",
    moisture: "৬০%",
    nutrients: "মাধ্যমিক",
    temperature: "২৫°C",
    organicMatter: "৩.২%",
  });

  // Modal state
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [lastSubmittedFarm, setLastSubmittedFarm] = useState(null);
  const [showSubmittedData, setShowSubmittedData] = useState(false);

  // Handle adding a new farm
  const handleAddFarm = (farmData) => {
    const farm = {
      id: farms.length + 1,
      name: farmData.name,
      location: farmData.location,
      size: farmData.size + " একর",
      crop: farmData.cropType,
      status: "পরিকল্পনাধীন",
      lastUpdate: "এই মুহূর্তে",
      coordinates: { latitude: 0, longitude: 0 },
      cropDetails: {
        type: farmData.cropType,
        variety: farmData.cropVariety,
        plantingDate: farmData.plantingDate,
      },
      soilDetails: {
        type: farmData.soilType,
        pH: parseFloat(farmData.soilPH) || 0,
        nutrients: "অজানা",
      },
      irrigation: {
        source: farmData.irrigationSource,
        lastDate: "আজ",
      },
      pestAlert: false,
      organicPractices: farmData.organicPractices,
    };

    console.log(farm);
    setFarms([...farms, farm]);
    setLastSubmittedFarm(farmData); // Store the original form data
    setShowSubmittedData(true); // Show the submitted data
    setShowAddFormModal(false);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      setShowSubmittedData(false);
    }, 10000);
  };

  // Handle editing a farm
  const handleEditFarm = (farm) => {
    console.log("Edit farm:", farm);
    // TODO: Implement edit functionality
  };

  // Handle deleting a farm
  const handleDeleteFarm = (id) => {
    setFarms(farms.filter((farm) => farm.id !== id));
  };

  // Handle adding new activity
  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  // Handle updating activity
  const handleUpdateActivity = (id, updates) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  // Handle viewing weather/soil details
  const handleViewDetails = (type) => {
    if (type === "weather") {
      // Navigate to weather page or show detailed modal
      console.log("View weather details");
    } else if (type === "soil") {
      // Navigate to soil health page or show detailed modal
      console.log("View soil details");
    }
  };

  // Handle quick action clicks
  const handleQuickActionClick = (action) => {
    console.log("Quick action clicked:", action);
  };

  return (
    <div className="flex flex-col font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <FaTractor className="text-green-600 mr-3" />
            আমার ফার্ম পরিচালনা 🚜
          </h1>
          <p className="text-gray-600 mt-2">
            আপনার সব ফার্ম এবং কৃষি কাজের এককেন্দ্রিক পরিচালনা
          </p>
        </div>
        <button
          onClick={() => setShowAddFormModal(true)}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-md"
        >
          <FaPlus className="mr-2" />
          নতুন ফার্ম যুক্ত করুন
        </button>
      </div>

      {/* Add Farm Modal */}
      <AddFarmModal
        isOpen={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
        onAddFarm={handleAddFarm}
      />

      {/* Submitted Data Display */}
      {showSubmittedData && lastSubmittedFarm && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <FaTractor className="mr-2" />
                সফলভাবে সাবমিট হয়েছে! 🎉
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    সাধারণ তথ্য
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">নাম:</span>{" "}
                      {lastSubmittedFarm.name}
                    </p>
                    <p>
                      <span className="font-medium">অবস্থান:</span>{" "}
                      {lastSubmittedFarm.location}
                    </p>
                    <p>
                      <span className="font-medium">আকার:</span>{" "}
                      {lastSubmittedFarm.size} একর
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">ফসল</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">প্রকার:</span>{" "}
                      {lastSubmittedFarm.cropType}
                    </p>
                    <p>
                      <span className="font-medium">জাত:</span>{" "}
                      {lastSubmittedFarm.cropVariety || "নির্ধারিত নয়"}
                    </p>
                    <p>
                      <span className="font-medium">রোপণ:</span>{" "}
                      {lastSubmittedFarm.plantingDate || "নির্ধারিত নয়"}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    মাটি ও সেচ
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">মাটি:</span>{" "}
                      {lastSubmittedFarm.soilType || "নির্ধারিত নয়"}
                    </p>
                    <p>
                      <span className="font-medium">pH:</span>{" "}
                      {lastSubmittedFarm.soilPH || "নির্ধারিত নয়"}
                    </p>
                    <p>
                      <span className="font-medium">সেচ:</span>{" "}
                      {lastSubmittedFarm.irrigationSource || "নির্ধারিত নয়"}
                    </p>
                    <p>
                      <span className="font-medium">অর্গানিক:</span>{" "}
                      {lastSubmittedFarm.organicPractices ? "হ্যাঁ" : "না"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSubmittedData(false)}
              className="text-green-600 hover:text-green-800 ml-4 p-2 hover:bg-green-100 rounded-full transition-colors"
              title="বন্ধ করুন"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Weather, Soil & Farms */}
        <div className="lg:col-span-2">
          {/* Weather & Soil Cards */}
          <WeatherSoilCards
            weatherData={weatherData}
            soilData={soilData}
            onViewDetails={handleViewDetails}
          />

          {/* Farms List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTractor className="text-green-600 mr-2" />
                আমার ফার্মসমূহ ({farms.length}টি)
              </h2>
            </div>
            <div className="p-4">
              {farms.length === 0 ? (
                <div className="text-center py-8">
                  <FaTractor className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">
                    এখনও কোন ফার্ম যুক্ত করা হয়নি
                  </p>
                  <button
                    onClick={() => setShowAddFormModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    প্রথম ফার্ম যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {farms.map((farm) => (
                    <FarmCard
                      key={farm.id}
                      farm={farm}
                      onEdit={handleEditFarm}
                      onDelete={handleDeleteFarm}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Progress & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Farm Progress & Activities */}
          <FarmProgress
            activities={activities}
            onAddActivity={handleAddActivity}
            onUpdateActivity={handleUpdateActivity}
          />

          {/* Quick Actions */}
          <QuickActions onActionClick={handleQuickActionClick} />
        </div>
      </div>
    </div>
  );
};

export default MyFarmPage;
