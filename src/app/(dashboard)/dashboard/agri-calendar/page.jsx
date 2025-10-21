"use client"
import FarmCard from "@/app/components/dashboard/calender/FarmCard";
import WeatherAlert from "@/app/components/dashboard/calender/WeatherAlert";
import { fetchWeather } from "@/app/lib/fetchWeather";
import { getLocation } from "@/app/lib/getlocation";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { 
  FaCalendarAlt, 
  FaSeedling, 
  FaTractor, 
  FaExclamationTriangle,
  FaWater,
  FaDollarSign,
  FaPhoneAlt,
  FaLeaf,
  FaInfoCircle,
  FaSun,
  FaTint,
  FaWind,
  FaTemperatureHigh,
  FaUser,
  FaMapMarkerAlt
} from "react-icons/fa";

const KrishiCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState('ধান');
  const [selectedCrop, setSelectedCrop] = useState("");
  const [activeTab, setActiveTab] = useState('myFarms');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
const { data: session, status } = useSession();
  const userEmail = session?.user?.email || "";
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
        setWeatherData(data);
        console.log("Weather data calender :", data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }
    loadWeather();
  }, []);

  // Fetch farm data
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://agri-smart-server.vercel.app/api/farms/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch farm data');
        }
        const data = await response.json();
        setFarms(data.data.farms || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching farms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // Crop Categories
  const cropCategories = {
    'ধান': {
      icon: '🌾',
      description: 'ধান চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "বোরো ধান": {
          planting: "নভেম্বর - ডিসেম্বর",
          irrigation: "সপ্তাহে ২-৩ বার, মাটি আর্দ্র রাখুন",
          harvesting: "মার্চ - এপ্রিল",
          soilType: "দোআঁশ বা এঁটেল দোআঁশ মাটি",
          climate: "শীতল ও শুষ্ক আবহাওয়া",
          duration: "৪-৫ মাস",
          water: "মাঝারি",
          fertilizer: "ইউরিয়া: ২৫০-৩০০ kg/ha, TSP: ১৮০-২০০ kg/ha, MOP: ১৫০ kg/ha",
          pestControl: "নিম তেল স্প্রে করুন, সমন্বিত বালাই ব্যবস্থাপনা, লাইট ট্রাপ ব্যবহার",
          suggestions: [
            "উচ্চ ফলনশীল জাত যেমন ব্রি ধান২৮, ব্রি ধান২৯ ব্যবহার করুন",
            "সময়মতো সার প্রয়োগ করুন - বপনের ১৫, ৩০, ৪৫ ও ৬০ দিন পর",
            "জৈব সারের ব্যবহার বৃদ্ধি করুন",
            "সেচের পানি সাশ্রয়ী পদ্ধতি ব্যবহার করুন"
          ],
          seedRate: "২৫-৩০ kg/ha",
          yield: "৪-৫ টন/হেক্টর",
          marketPrice: "১২০০-১৫০০ টাকা/মন",
          profit: "৪০-৫০ হাজার টাকা/হেক্টর"
        },
        "আমন ধান": {
          planting: "জুলাই - আগস্ট",
          irrigation: "বৃষ্টির পানির উপর নির্ভরশীল, প্রয়োজন হলে সেচ দিন",
          harvesting: "নভেম্বর - ডিসেম্বর",
          soilType: "দোআঁশ মাটি",
          climate: "উষ্ণ ও আর্দ্র বর্ষাকালীন আবহাওয়া",
          duration: "৫-৬ মাস",
          water: "অধিক",
          fertilizer: "ইউরিয়া: ২০০-২৫০ kg/ha, TSP: ১৫০ kg/ha, MOP: ১০০-১২০ kg/ha",
          pestControl: "জৈব কীটনাশক, লাইট ট্রাপ ব্যবহার, পাখি ব্যবহার করে পোকা দমন",
          suggestions: [
            "বন্যামুক্ত জমি নির্বাচন করুন",
            "জৈব সার ব্যবহার করুন",
            "নিকাশী ব্যবস্থা ভালো রাখুন",
            "বপনের আগে বীজ শোধন করুন"
          ],
          seedRate: "৩০-৩৫ kg/ha",
          yield: "৩-৪ টন/হেক্টর",
          marketPrice: "১০০০-১২০০ টাকা/মন",
          profit: "৩০-৪০ হাজার টাকা/হেক্টর"
        }
      }
    },
    'গম': {
      icon: '🌾',
      description: 'গম চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "উন্নত গম": {
          planting: "নভেম্বর - ডিসেম্বর",
          irrigation: "১৫-২০ দিন পর পর সেচ দিন",
          harvesting: "মার্চ - এপ্রিল",
          soilType: "দোআঁশ মাটি",
          climate: "শীতল ও শুষ্ক আবহাওয়া",
          duration: "৪-৫ মাস",
          water: "সল্প",
          fertilizer: "ইউরিয়া: ২৫০ kg/ha, TSP: ১৮০ kg/ha, MOP: ১৫০ kg/ha, জিপসাম: ১২০ kg/ha",
          pestControl: "ব্লাস্ট রোগ প্রতিরোধী জাত ব্যবহার, আগাছা নিয়ন্ত্রণ, জৈব বালাইনাশক",
          suggestions: [
            "সময়মতো বপন করুন",
            "ফসল কাটার পর শুকিয়ে নিন",
            "উন্নত জাত যেমন কাঞ্চন, শতাব্দী ব্যবহার করুন",
            "সেচের সময় সঠিকভাবে ম্যানেজ করুন"
          ],
          seedRate: "১২০ kg/ha",
          yield: "৩-৩.৫ টন/হেক্টর",
          marketPrice: "১১০০-১৩০০ টাকা/মন",
          profit: "৫০-৬০ হাজার টাকা/হেক্টর"
        }
      }
    },
    'ভুট্টা': {
      icon: '🌽',
      description: 'ভুট্টা চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "হাইব্রিড ভুট্টা": {
          planting: "নভেম্বর - ডিসেম্বর",
          harvesting: "এপ্রিল - মে",
          irrigation: "প্রতি ১৫ দিন অন্তর সেচ দিন",
          soilType: "বেলে দোআঁশ বা দোআঁশ মাটি",
          climate: "মৃদু ঠান্ডা ও শুষ্ক",
          duration: "৫-৬ মাস",
          fertilizer: "ইউরিয়া: ২৫০ kg/ha, TSP: ২০০ kg/ha, MOP: ১৫০ kg/ha",
          pestControl: "কর্ণ বোরার দমন, ফেরোমন ট্রাপ ব্যবহার",
          suggestions: [
            "উচ্চ ফলনশীল জাত ব্যবহার করুন",
            "আগাছা নিয়ন্ত্রণ করুন",
            "সঠিক দূরত্বে বপন করুন"
          ],
          seedRate: "২৫ kg/ha",
          yield: "৭-৮ টন/হেক্টর",
          marketPrice: "১০০০-১২০০ টাকা/মন",
          profit: "৬০-৭০ হাজার টাকা/হেক্টর"
        }
      }
    },
    'সবজি': {
      icon: '🥦',
      description: 'শাকসবজি চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "টমেটো": {
          planting: "সেপ্টেম্বর - অক্টোবর",
          irrigation: "সপ্তাহে ২ বার, গাছের গোড়ায় পানি দিন",
          harvesting: "ডিসেম্বর - ফেব্রুয়ারী",
          soilType: "দোআঁশ মাটি",
          climate: "শীতল ও হালকা রোদযুক্ত আবহাওয়া",
          duration: "৪-৫ মাস",
          water: "সল্প",
          fertilizer: "ইউরিয়া: ২০০ kg/ha, TSP: ১৫০ kg/ha, MOP: ১২০ kg/ha, কম্পোস্ট: ১০ টন/ha",
          pestControl: "নিম বেসড স্প্রে, ফেরোমন ট্রাপ ব্যবহার, জৈব পদ্ধতি",
          suggestions: [
            "খুঁটি দিয়ে গাছ সোজা রাখুন",
            "পর্যাপ্ত সূর্যালোক নিশ্চিত করুন",
            "নিয়মিত স্প্রে করুন"
          ],
          seedRate: "২৫০-৩০০ গ্রাম/ha",
          yield: "৩০-৪০ টন/হেক্টর",
          marketPrice: "২৫-৪০ টাকা/কেজি",
          profit: "১-১.৫ লাখ টাকা/হেক্টর"
        }
      }
    },
    'ফল': {
      icon: '🍎',
      description: 'ফল চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "আম": {
          planting: "জুন - জুলাই",
          irrigation: "সপ্তাহে ১-২ বার",
          harvesting: "এপ্রিল - জুন",
          soilType: "দোআঁশ মাটি",
          climate: "উষ্ণ ও আর্দ্র",
          duration: "৪-৫ বছর (ফল ধরা শুরু)",
          fertilizer: "জৈব সার: ২০-৩০ kg/গাছ, ইউরিয়া: ১-১.৫ kg/গাছ",
          pestControl: "জৈব কীটনাশক, ফেরোমন ট্রাপ",
          suggestions: [
            "উন্নত জাত নির্বাচন করুন",
            "নিয়মিত ডালপালা ছাঁটাই করুন",
            "পর্যাপ্ত সূর্যালোক নিশ্চিত করুন"
          ],
          yield: "২০০-৩০০ kg/গাছ",
          marketPrice: "৪০-৮০ টাকা/কেজি",
          profit: "উচ্চ লাভজনক"
        }
      }
    },
    'ডাল': {
      icon: '🟤',
      description: 'ডাল ফসল চাষের সম্পূর্ণ নির্দেশিকা',
      crops: {
        "মসুর": {
          planting: "নভেম্বর",
          harvesting: "মার্চ",
          irrigation: "১-২ বার সেচ প্রয়োজন",
          soilType: "দোআঁশ বা বেলে দোআঁশ",
          climate: "শীতল ও শুষ্ক",
          duration: "৪ মাস",
          fertilizer: "TSP: ৮০ kg/ha, MOP: ৫০ kg/ha",
          pestControl: "পাতা পোড়া রোগ প্রতিরোধী জাত ব্যবহার",
          suggestions: [
            "অতিরিক্ত সেচ এড়িয়ে চলুন",
            "বীজে ছত্রাকনাশক ব্যবহার করুন",
            "সময়মতো সংগ্রহ করুন"
          ],
          seedRate: "৩০-৩৫ kg/ha",
          yield: "১.২-১.৫ টন/হেক্টর",
          marketPrice: "২০০০-২২০০ টাকা/মন",
          profit: "৩০-৪০ হাজার টাকা/হেক্টর"
        }
      }
    },
    'অন্যান্য': {
      icon: '🌿',
      description: 'অন্যান্য ফসল চাষের নির্দেশিকা',
      crops: {
        "পাট": {
          planting: "মার্চ - এপ্রিল",
          irrigation: "অল্প কিন্তু নিয়মিত সেচ দিন",
          harvesting: "জুলাই - আগস্ট",
          soilType: "বেলে দোআঁশ মাটি",
          climate: "গরম ও আর্দ্র আবহাওয়া",
          duration: "৪ মাস",
          water: "মাঝারি",
          fertilizer: "ইউরিয়া: ১৫০ kg/ha, TSP: ১০০ kg/ha, MOP: ৮০ kg/ha",
          pestControl: "আগাছা নিয়ন্ত্রণ, জৈব বালাইনাশক, সমন্বিত বালাই ব্যবস্থাপনা",
          suggestions: [
            "নিকাশী ব্যবস্থা ভালো রাখুন",
            "গুণগত মানের বীজ ব্যবহার করুন",
            "সঠিক সময়ে কাটাই করুন"
          ],
          seedRate: "৫-৭ kg/ha",
          yield: "২.৫-৩ টন আঁশ/হেক্টর",
          marketPrice: "২০০০-২৫০০ টাকা/মন",
          profit: "৪০-৫০ হাজার টাকা/হেক্টর"
        }
      }
    }
  };

  // Monthly activities data
  const monthlyActivities = {
    জানুয়ারী: {
      activities: [
        'গমের যত্ন ও শেষ সেচ',
        'আলু সংগ্রহ ও সংরক্ষণ',
        'সরিষা পরিচর্যা',
        'রবি শস্যে সেচ ও সার প্রয়োগ',
        'বেগুন ও টমেটোর ফল সংগ্রহ শুরু'
      ],
      tips: [
        'শীতকালীন সেচ কম দিন',
        'কুয়াশা থেকে ফসল রক্ষা করুন',
        'গুদামে ফসল শুকিয়ে সংরক্ষণ করুন',
        'শীতকালীন সবজির যত্ন নিন'
      ],
      crops: ['গম', 'আলু', 'সরিষা', 'টমেটো', 'বেগুন']
    },
    ফেব্রুয়ারী: {
      activities: [
        'গম কাটাই প্রস্তুতি',
        'আলু সংরক্ষণ ও বিক্রয়',
        'মসুর ফসল সংগ্রহ',
        'গ্রীষ্মকালীন সবজির জমি প্রস্তুত',
        'পিঁয়াজ ও রসুন সংগ্রহ'
      ],
      tips: [
        'বসন্তকালীন ফসলের জন্য জমি চাষ করুন',
        'অতিরিক্ত সেচ এড়িয়ে চলুন',
        'ফসল সংগ্রহে সতর্ক থাকুন',
        'বীজ সংরক্ষণ করুন'
      ],
      crops: ['গম', 'মসুর', 'আলু', 'শসা', 'পিঁয়াজ']
    },
    মার্চ: {
      activities: [
        'পাট বপন',
        'তিল ও ভুট্টা বপন',
        'বোরো ধান সংগ্রহ',
        'গ্রীষ্মকালীন সবজি যেমন শসা, করলা রোপণ',
        'আউশ ধান বপন'
      ],
      tips: [
        'তাপমাত্রা বাড়ার সাথে সেচ বাড়ান',
        'আগাছা নিয়ন্ত্রণ করুন',
        'জলাবদ্ধতা এড়িয়ে চলুন',
        'বপন সময় ঠিক রাখুন'
      ],
      crops: ['পাট', 'তিল', 'ভুট্টা', 'বোরো ধান', 'শসা']
    },
    এপ্রিল: {
      activities: [
        'আমন ধানের চারা প্রস্তুতি',
        'ভুট্টা ও পাট পরিচর্যা',
        'বর্ষা প্রস্তুতি',
        'খরিফ ফসলের জমি তৈরি'
      ],
      tips: [
        'বৃষ্টির পানি সংরক্ষণ করুন',
        'নিকাশী ব্যবস্থা ঠিক রাখুন',
        'আগাছা নিয়ন্ত্রণ করুন'
      ],
      crops: ['ধান', 'ভুট্টা', 'পাট', 'তিল']
    },
    মে: {
      activities: [
        'আউশ ধান রোপণ',
        'ধানের জমিতে নিয়মিত সেচ',
        'কীটনাশক ও সার প্রয়োগ',
        'গ্রীষ্মকালীন শাকসবজি সংগ্রহ'
      ],
      tips: [
        'বৃষ্টি শুরু হলে সেচ কমিয়ে দিন',
        'রোগবালাই নিয়ন্ত্রণ করুন',
        'নিয়মিত ফসল পর্যবেক্ষণ করুন'
      ],
      crops: ['আউশ ধান', 'তিল', 'শসা', 'ভুট্টা']
    },
    জুন: {
      activities: [
        'আমন চারা উৎপাদন',
        'ফসলের যত্ন ও সার প্রয়োগ',
        'কীটপতঙ্গ নিয়ন্ত্রণ',
        'বন্যা প্রতিরোধ ব্যবস্থা'
      ],
      tips: [
        'উঁচু জমিতে চারা সংরক্ষণ করুন',
        'অতিরিক্ত বৃষ্টির পানি বের করে দিন',
        'রোগ প্রতিরোধ করুন'
      ],
      crops: ['আমন ধান', 'ডাল', 'ভুট্টা', 'তিল']
    }
  };

  const tabs = [
    { id: 'myFarms', label: 'আমার ফার্ম', icon: <FaUser /> },
    { id: 'crops', label: 'ফসল নির্দেশিকা', icon: <FaSeedling /> },
    { id: 'calendar', label: 'মাসিক কার্যক্রম', icon: <FaCalendarAlt /> }
  ];

  const getCropIcon = (category) => {
    return cropCategories[category]?.icon || '🌱';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-800 font-bangla text-lg">ফার্ম ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Weather Alert */}
        <div className="text-center mb-8">
          <WeatherAlert weatherData={weatherData} />
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaLeaf className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 font-bangla">
              কৃষি ক্যালেন্ডার
            </h1>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bangla mb-2">
            স্মার্ট কৃষকের জন্য সম্পূর্ণ নির্দেশিকা
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 font-bangla shadow-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-green-700 hover:bg-green-50 border border-green-200 hover:shadow-md'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* My Farms Tab */}
        {activeTab === 'myFarms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla flex items-center justify-center gap-3">
                <FaUser className="text-green-600" />
                আমার ফার্মসমূহ
              </h2>
              
              {error ? (
                <div className="text-center py-8">
                  <p className="text-red-600 font-bangla text-lg">ত্রুটি: {error}</p>
                </div>
              ) : farms.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-bangla text-lg">কোন ফার্ম পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {farms.map((farm) => (
                    <FarmCard 
                      key={farm.id} 
                      farm={farm} 
                      cropData={cropCategories}
                      getCropIcon={getCropIcon}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crops Guide Tab */}
        {activeTab === 'crops' && (
          <div className="space-y-8">
            {/* Category Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla flex items-center justify-center gap-3">
                <FaSeedling className="text-green-600" />
                ফসল ক্যাটাগরি নির্বাচন করুন
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {Object.keys(cropCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedCrop("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-bangla group hover:shadow-md flex flex-col items-center gap-2 ${
                      selectedCategory === category
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm transform scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-3xl transform group-hover:scale-110 transition-transform">
                      {cropCategories[category].icon}
                    </div>
                    <div className="font-semibold text-sm">{category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Selection */}
            {selectedCategory && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-6 text-center font-bangla">
                  <span className="text-2xl mr-2">{cropCategories[selectedCategory].icon}</span>
                  {selectedCategory} - ফসল নির্বাচন করুন
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(cropCategories[selectedCategory].crops).map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setSelectedCrop(crop)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 font-bangla group hover:shadow-md text-left ${
                        selectedCrop === crop
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-sm transform scale-105'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl transform group-hover:scale-110 transition-transform">
                          {cropCategories[selectedCategory].icon}
                        </div>
                        <h4 className="font-semibold text-lg">{crop}</h4>
                      </div>
                      <p className="text-sm text-gray-600 font-bangla">
                        {cropCategories[selectedCategory].crops[crop].planting}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Crop Details */}
            {selectedCrop && cropCategories[selectedCategory]?.crops[selectedCrop] && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla flex items-center justify-center gap-3">
                  <span className="text-3xl">{cropCategories[selectedCategory].icon}</span>
                  {selectedCrop} চাষের সম্পূর্ণ নির্দেশিকা
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Information */}
                  <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <h4 className="text-xl font-bold text-green-700 mb-4 font-bangla border-b-2 border-green-200 pb-2 flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      মৌলিক তথ্য
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold font-bangla">বপন সময়:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].planting}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold font-bangla">কাটাই সময়:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].harvesting}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold font-bangla">সেচ:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].irrigation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Economic Information */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <h4 className="text-xl font-bold text-blue-700 mb-4 font-bangla border-b-2 border-blue-200 pb-2 flex items-center gap-2">
                      <FaDollarSign className="text-blue-600" />
                      অর্থনৈতিক তথ্য
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold font-bangla">বাজার মূল্য:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].marketPrice}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold font-bangla">উৎপাদন:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].yield}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold font-bangla">লাভ:</span>
                        <p className="text-gray-700 font-bangla mt-1">{cropCategories[selectedCategory].crops[selectedCrop].profit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Farming Practices */}
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                    <h4 className="text-xl font-bold text-amber-700 mb-4 font-bangla border-b-2 border-amber-200 pb-2 flex items-center gap-2">
                      <FaLeaf className="text-amber-600" />
                      চাষ পদ্ধতি
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold font-bangla">সার ব্যবস্থাপনা:</span>
                        <p className="text-gray-700 font-bangla text-sm mt-1">{cropCategories[selectedCategory].crops[selectedCrop].fertilizer}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold font-bangla">রোগবালাই নিয়ন্ত্রণ:</span>
                        <p className="text-gray-700 font-bangla text-sm mt-1">{cropCategories[selectedCategory].crops[selectedCrop].pestControl}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mt-6 bg-purple-50 rounded-xl p-5 border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-700 mb-4 font-bangla border-b-2 border-purple-200 pb-2 flex items-center gap-2">
                    <FaInfoCircle className="text-purple-600" />
                    বিশেষ পরামর্শ
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {cropCategories[selectedCategory].crops[selectedCrop].suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                        <span className="text-purple-600 mt-1 flex-shrink-0">•</span>
                        <span className="text-gray-700 font-bangla text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Monthly Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla flex items-center justify-center gap-3">
                <FaCalendarAlt className="text-green-600" />
                মাসিক কৃষি কার্যক্রম
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {Object.keys(monthlyActivities).map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-bangla ${
                      selectedMonth === month
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm transform scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>

              {selectedMonth && monthlyActivities[selectedMonth] && (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-6 text-center font-bangla">
                    {selectedMonth} মাসের কার্যক্রম
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-xl font-bold text-green-700 mb-4 font-bangla flex items-center gap-2">
                        <FaTractor className="text-green-600" />
                        প্রধান কার্যক্রম
                      </h4>
                      <ul className="space-y-2">
                        {monthlyActivities[selectedMonth].activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-2 font-bangla bg-white p-3 rounded-lg">
                            <span className="text-green-600 mt-1">•</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-green-700 mb-4 font-bangla flex items-center gap-2">
                        <FaInfoCircle className="text-green-600" />
                        বিশেষ পরামর্শ
                      </h4>
                      <ul className="space-y-2">
                        {monthlyActivities[selectedMonth].tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 font-bangla bg-white p-3 rounded-lg">
                            <span className="text-green-600 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-green-700 mb-4 font-bangla flex items-center gap-2">
                        <FaSeedling className="text-green-600" />
                        চাষযোগ্য ফসল
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {monthlyActivities[selectedMonth].crops.map((crop, index) => (
                          <span 
                            key={index} 
                            className="bg-white px-3 py-2 rounded-lg text-green-800 text-sm font-bangla border border-green-200"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 text-white p-2 rounded-full">
              <FaPhoneAlt />
            </div>
            <h4 className="font-bold text-red-700 font-bangla text-lg">🚨 জরুরি যোগাযোগ</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-red-800 font-bangla">
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <p className="font-semibold flex items-center gap-2">
                <FaPhoneAlt className="text-red-600" />
                কৃষি পরামর্শ কেন্দ্র: ১৬১২৩
              </p>
              <p className="text-sm text-red-600 mt-1">২৪ ঘন্টা কৃষি পরামর্শ সেবা</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <p className="font-semibold flex items-center gap-2">
                <FaExclamationTriangle className="text-red-600" />
                কৃষি বিপর্যয় সহায়তা: ১০৯০
              </p>
              <p className="text-sm text-red-600 mt-1">বন্যা, খরা বা প্রাকৃতিক দুর্যোগে সাহায্য</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KrishiCalendar;