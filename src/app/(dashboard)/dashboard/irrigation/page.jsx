"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Irrigation = () => {
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email || "";
    
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState('');

    const [weatherData, setWeatherData] = useState({
        temperature: 32,
        humidity: 65,
        rainProbability: 30,
        soilMoisture: 45,
        windSpeed: 12,
        lastRain: '২ দিন আগে'
    });

    const [soilType, setSoilType] = useState('দোআঁশ');
    const [area, setArea] = useState(1);

    const cropsData = {
        'ধান': {
            waterRequirement: 25,
            frequency: '৩-৪ দিন পর পর',
            method: 'জমিতে ২-৩ ইঞ্চি পানি রাখুন',
            criticalStages: ['বীজ বপনের ২৫-৩০ দিন', 'ফুল আসার সময়', 'দানা গঠনের সময়']
        },
        'গম': {
            waterRequirement: 18,
            frequency: '৭-১০ দিন পর পর',
            method: 'হালকা থেকে মাঝারি সেচ',
            criticalStages: ['বপনের ২০-২৫ দিন পর', 'কাইচ থোর আসার সময়', 'দানা গঠনের সময়']
        },
        'আলু': {
            waterRequirement: 22,
            frequency: '৫-৭ দিন পর পর',
            method: 'ফুরো পদ্ধতিতে সেচ',
            criticalStages: ['গাছ ১৫-২০ সেমি হলে', 'কন্দ গঠনের সময়', 'কন্দ বড় হওয়ার সময়']
        },
        'পাট': {
            waterRequirement: 28,
            frequency: '৪-৬ দিন পর পর',
            method: 'জমিতে হালকা পানি রাখুন',
            criticalStages: ['বপনের ৩০-৩৫ দিন পর', 'দ্রুত বাড়ন্ত অবস্থায়']
        },
        'ভুট্টা': {
            waterRequirement: 20,
            frequency: '৬-৮ দিন পর পর',
            method: 'ফুরো বা স্প্রিংকলার পদ্ধতি',
            criticalStages: ['বপনের ২০-২৫ দিন পর', 'ফুল আসার সময়', 'দানা গঠনের সময়']
        },
        'টমেটো': {
            waterRequirement: 24,
            frequency: '৪-৫ দিন পর পর',
            method: 'ড্রিপ ইরিগেশন',
            criticalStages: ['চারা রোপণের পর', 'ফুল আসার সময়', 'ফল ধারণের সময়']
        }
    };

    const soilWaterCapacity = {
        'বেলে': 15,
        'দোআঁশ': 25,
        'এটেল': 35
    };

    // Fetch farms data
    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://agri-smart-server.vercel.app/api/farms/${userEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch farm data');
                }
                const data = await response.json();
                console.log('Farms data:', data); // Debug log
                
                // Access the farms array from the correct path
                const farmsData = data.data?.farms || [];
                setFarms(farmsData);
                
                // Auto-select first farm and its crop if available
                if (farmsData.length > 0) {
                    const firstFarm = farmsData[0];
                    setSelectedFarm(firstFarm);
                    
                    // Get crop from cropDetails.type
                    const farmCrop = firstFarm.cropDetails?.type || '';
                    setSelectedCrop(farmCrop);
                    
                    setArea(firstFarm.sizeAcre || 1);
                    setSoilType(firstFarm.soilDetails?.type || 'দোআঁশ');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching farms:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchFarms();
        }
    }, [userEmail]);

    // Get unique crops from all farms
    const getAllUserCrops = () => {
        const allCrops = new Set();
        farms.forEach(farm => {
            if (farm.cropDetails?.type) {
                allCrops.add(farm.cropDetails.type);
            }
        });
        return Array.from(allCrops);
    };

    const calculateIrrigation = () => {
        if (!selectedCrop || !cropsData[selectedCrop]) {
            return {
                requiredWater: 0,
                timing: 'ফসল নির্বাচন করুন',
                duration: 0,
                nextIrrigation: 'নির্ধারণ করুন'
            };
        }

        const crop = cropsData[selectedCrop];
        const soilCapacity = soilWaterCapacity[soilType] || 25;
        const currentMoisture = weatherData.soilMoisture;
        const waterDeficit = soilCapacity - currentMoisture;
        
        // Calculate next irrigation date based on last irrigation
        let nextIrrigation = 'আজ';
        if (selectedFarm?.irrigation?.lastDate) {
            const lastDate = new Date(selectedFarm.irrigation.lastDate);
            const nextDate = new Date(lastDate);
            nextDate.setDate(nextDate.getDate() + 4); // Default 4 days later
            nextIrrigation = nextDate.toLocaleDateString('bn-BD');
        }
        
        return {
            requiredWater: Math.max(crop.waterRequirement, waterDeficit),
            timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 'নিয়মিত সেচ',
            duration: Math.round((area * crop.waterRequirement * 60) / 10),
            nextIrrigation: nextIrrigation
        };
    };

    const irrigationAdvice = calculateIrrigation();
    const userCrops = getAllUserCrops();

    // Get planting info for selected farm
    const getPlantingInfo = () => {
        if (!selectedFarm?.cropDetails?.plantingDate) return null;
        
        const plantingDate = new Date(selectedFarm.cropDetails.plantingDate);
        const today = new Date();
        const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
        
        return {
            plantingDate: plantingDate.toLocaleDateString('bn-BD'),
            daysSincePlanting: daysSincePlanting,
            growthStage: daysSincePlanting < 30 ? 'প্রারম্ভিক পর্যায়' : 
                        daysSincePlanting < 60 ? 'বর্ধনশীল পর্যায়' : 'পরিপক্ব পর্যায়'
        };
    };

    const plantingInfo = getPlantingInfo();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">ফার্ম ডেটা লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p>ত্রুটি: {error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 p-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
                        🚜 স্মার্ট সেচ ব্যবস্থাপনা
                    </h1>
                    <p className="text-gray-600">আপনার ফসলের জন্য সঠিক সময়ে সঠিক পরিমাণ সেচ</p>
                </div>

                {farms.length === 0 ? (
                    <div className="text-center bg-white rounded-xl shadow-lg p-8">
                        <div className="text-6xl mb-4">🌾</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">কোন ফার্ম পাওয়া যায়নি</h2>
                        <p className="text-gray-600 mb-6">সেচ সুপারিশ পেতে প্রথমে একটি ফার্ম তৈরি করুন</p>
                        <button 
                            onClick={() => window.location.href = '/farms'}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
            ফার্ম তৈরি করুন
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Farm and Crop Selection */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    🌾 আপনার ফার্ম ও ফসল
                                </h2>

                                {/* Farm Selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ফার্ম নির্বাচন করুন
                                    </label>
                                    <select 
                                        value={selectedFarm?.id || ''}
                                        onChange={(e) => {
                                            const farm = farms.find(f => f.id === e.target.value);
                                            setSelectedFarm(farm);
                                            const farmCrop = farm?.cropDetails?.type || '';
                                            setSelectedCrop(farmCrop);
                                            setArea(farm?.sizeAcre || 1);
                                            setSoilType(farm?.soilDetails?.type || 'দোআঁশ');
                                        }}
                                        className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        {farms.map(farm => (
                                            <option key={farm.id} value={farm.id}>
                                                {farm.name} - {farm.sizeAcre} একর
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Crop Selection */}
                                {userCrops.length > 0 ? (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ফসল নির্বাচন করুন
                                        </label>
                                        <select 
                                            value={selectedCrop}
                                            onChange={(e) => setSelectedCrop(e.target.value)}
                                            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">ফসল নির্বাচন করুন</option>
                                            {userCrops.map(crop => (
                                                <option key={crop} value={crop}>
                                                    {crop}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                        <p className="text-yellow-700">কোন ফসল পাওয়া যায়নি। ফার্মে ফসলের তথ্য যোগ করুন।</p>
                                    </div>
                                )}

                                <div className="mt-4 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            মাটির ধরন
                                        </label>
                                        <select 
                                            value={soilType}
                                            onChange={(e) => setSoilType(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                        >
                                            <option value="বেলে">বেলে মাটি</option>
                                            <option value="দোআঁশ">দোআঁশ মাটি</option>
                                            <option value="এটেল">এটেল মাটি</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            জমির পরিমাণ (একর)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={area}
                                            onChange={(e) => setArea(parseFloat(e.target.value))}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            min="0.1"
                                            step="0.1"
                                        />
                                    </div>
                                </div>

                                {/* Selected Farm Info */}
                                {selectedFarm && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">বর্তমান ফার্ম তথ্য:</h4>
                                        <p className="text-blue-700"><strong>নাম:</strong> {selectedFarm.name}</p>
                                        <p className="text-blue-700"><strong>অবস্থান:</strong> {selectedFarm.location}</p>
                                        <p className="text-blue-700"><strong>আকার:</strong> {selectedFarm.sizeAcre} একর</p>
                                        <p className="text-blue-700"><strong>স্ট্যাটাস:</strong> {selectedFarm.status}</p>
                                        {selectedFarm.cropDetails?.variety && (
                                            <p className="text-blue-700"><strong>প্রজাতি:</strong> {selectedFarm.cropDetails.variety}</p>
                                        )}
                                        {plantingInfo && (
                                            <p className="text-blue-700"><strong>রোপণের তারিখ:</strong> {plantingInfo.plantingDate}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Weather Info */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    📊 বর্তমান অবস্থা
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                        <span>তাপমাত্রা</span>
                                        <span className="font-bold text-blue-800">{weatherData.temperature}°C</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                        <span>মাটির আর্দ্রতা</span>
                                        <span className="font-bold text-green-800">{weatherData.soilMoisture}%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                        <span>বৃষ্টির সম্ভাবনা</span>
                                        <span className="font-bold text-yellow-800">{weatherData.rainProbability}%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                        <span>সর্বশেষ বৃষ্টি</span>
                                        <span className="font-bold text-purple-800">{weatherData.lastRain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column */}
                        <div className="space-y-6">
                            {/* Irrigation Advice */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    💧 আজকের সেচ সুপারিশ
                                </h2>
                                {selectedCrop && cropsData[selectedCrop] ? (
                                    <div className="space-y-4">
                                        <div className={`p-4 rounded-lg ${
                                            irrigationAdvice.timing.includes('জরুরি') 
                                                ? 'bg-red-50 border border-red-200' 
                                                : 'bg-green-50 border border-green-200'
                                        }`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold">সেচের অবস্থা:</span>
                                                <span className={`font-bold ${
                                                    irrigationAdvice.timing.includes('জরুরি') 
                                                        ? 'text-red-600' 
                                                        : 'text-green-600'
                                                }`}>
                                                    {irrigationAdvice.timing}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span>পানির পরিমাণ:</span>
                                                <span className="font-bold text-blue-600">{irrigationAdvice.requiredWater} mm</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span>সময়:</span>
                                                <span className="font-bold text-purple-600">{irrigationAdvice.duration} মিনিট</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>পরবর্তী সেচ:</span>
                                                <span className="font-bold text-orange-600">{irrigationAdvice.nextIrrigation}</span>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-blue-800 mb-2">🕒 উপযুক্ত সময়</h4>
                                            <p className="text-blue-700">সকাল ৬-৮টা বা বিকাল ৫-৭টা</p>
                                        </div>

                                        {plantingInfo && (
                                            <div className="bg-purple-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-purple-800 mb-2">🌱 ফসলের পর্যায়</h4>
                                                <p className="text-purple-700"><strong>রোপণের তারিখ:</strong> {plantingInfo.plantingDate}</p>
                                                <p className="text-purple-700"><strong>রোপণের পর দিন:</strong> {plantingInfo.daysSincePlanting} দিন</p>
                                                <p className="text-purple-700"><strong>বর্তমান পর্যায়:</strong> {plantingInfo.growthStage}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                                        <p className="text-gray-600">সেচ সুপারিশ দেখতে ফসল নির্বাচন করুন</p>
                                    </div>
                                )}
                            </div>

                            {/* Crop Details */}
                            {selectedCrop && cropsData[selectedCrop] && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        📝 {selectedCrop} এর সেচ নির্দেশিকা
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>পানির প্রয়োজন:</span>
                                            <span className="font-semibold">{cropsData[selectedCrop].waterRequirement} mm/সপ্তাহ</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>সেচের ফ্রিকোয়েন্সি:</span>
                                            <span className="font-semibold">{cropsData[selectedCrop].frequency}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">সেচ পদ্ধতি:</span>
                                            <p className="text-gray-700 mt-1">{cropsData[selectedCrop].method}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium">সমালোচনামূলক পর্যায়:</span>
                                            <ul className="list-disc list-inside mt-1 text-gray-700">
                                                {cropsData[selectedCrop].criticalStages.map((stage, index) => (
                                                    <li key={index}>{stage}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* জরুরি তথ্য */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-yellow-800 mb-3">
                                    ⚠️ গুরুত্বপূর্ণ নির্দেশনা
                                </h2>
                                <ul className="space-y-2 text-yellow-700">
                                    <li>• অতিরিক্ত সেচে ফসলের ক্ষতি হয়</li>
                                    <li>• মাটির আর্দ্রতা পরীক্ষা করে সেচ দিন</li>
                                    <li>• বৃষ্টির পূর্বাভাসে সেচ কমিয়ে দিন</li>
                                    <li>• ড্রিপ ইরিগেশন ব্যবহার করুন</li>
                                </ul>
                            </div>

                            {/* দ্রুত টিপস */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-green-800 mb-3">
                                    💡 সেচ সংরক্ষণ টিপস
                                </h2>
                                <ul className="space-y-2 text-green-700">
                                    <li>• সকাল-বিকাল সেচ দিন</li>
                                    <li>• মালচিং ব্যবহার করুন</li>
                                    <li>• ড্রিপ/স্প্রিংকলার ব্যবহার করুন</li>
                                    <li>• মাটির স্বাস্থ্য উন্নত করুন</li>
                                </ul>
                            </div>

                            {/* User's All Crops */}
                            {userCrops.length > 0 && (
                                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                    <h2 className="text-xl font-semibold text-purple-800 mb-3">
                                        🌱 আপনার সকল ফসল
                                    </h2>
                                    <div className="space-y-2">
                                        {userCrops.map((crop, index) => (
                                            <div key={index} className={`flex justify-between items-center p-2 rounded ${
                                                crop === selectedCrop ? 'bg-white shadow-sm' : 'bg-purple-100'
                                            }`}>
                                                <span className={`font-medium ${crop === selectedCrop ? 'text-green-600' : 'text-purple-700'}`}>
                                                    {crop}
                                                </span>
                                                {crop === selectedCrop && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">বর্তমান</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Weekly Schedule */}
                {selectedCrop && cropsData[selectedCrop] && (
                    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            🗓️ {selectedCrop} এর সাপ্তাহিক সেচ শিডিউল
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                            {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'].map((day, index) => (
                                <div key={day} className={`text-center p-3 rounded-lg ${
                                    index === 0 || index === 4 ? 'bg-green-100 border border-green-300' : 'bg-gray-100'
                                }`}>
                                    <div className="font-semibold">{day}</div>
                                    <div className="text-sm mt-1">
                                        {index === 0 || index === 4 ? 'সেচ দিন' : 'বিশ্রাম'}
                                    </div>
                                    {index === 0 || index === 4 && (
                                        <div className="text-xs text-blue-600 mt-1">৬-৮ AM</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Irrigation;