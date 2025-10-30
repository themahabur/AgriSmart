"use client"

import { useState } from "react";

const Irrigation = () => {
    const [weatherData, setWeatherData] = useState({
        temperature: 32,
        humidity: 65,
        rainProbability: 30,
        soilMoisture: 45,
        windSpeed: 12,
        lastRain: '২ দিন আগে'
    });

    const [selectedCrop, setSelectedCrop] = useState('ধান');
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
        }
    };

    const soilWaterCapacity = {
        'বেলে': 15,
        'দোআঁশ': 25,
        'এটেল': 35
    };

    const calculateIrrigation = () => {
        const crop = cropsData[selectedCrop];
        const soilCapacity = soilWaterCapacity[soilType];
        const currentMoisture = weatherData.soilMoisture;
        const waterDeficit = soilCapacity - currentMoisture;
        
        return {
            requiredWater: Math.max(crop.waterRequirement, waterDeficit),
            timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 'নিয়মিত সেচ',
            duration: Math.round((area * crop.waterRequirement * 60) / 10)
        };
    };

    const irrigationAdvice = calculateIrrigation();

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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Crop Selection */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                🌾 ফসল নির্বাচন করুন
                            </h2>
                            <select 
                                value={selectedCrop}
                                onChange={(e) => setSelectedCrop(e.target.value)}
                                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {Object.keys(cropsData).map(crop => (
                                    <option key={crop} value={crop}>{crop}</option>
                                ))}
                            </select>

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
                                    <div className="flex justify-between items-center">
                                        <span>সময়:</span>
                                        <span className="font-bold text-purple-600">{irrigationAdvice.duration} মিনিট</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">🕒 উপযুক্ত সময়</h4>
                                    <p className="text-blue-700">সকাল ৬-৮টা বা বিকাল ৫-৭টা</p>
                                </div>
                            </div>
                        </div>

                        {/* Crop Details */}
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
                    </div>

                    {/* Right Column - Tips only */}
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
                    </div>
                </div>

                {/* Weekly Schedule */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        🗓️ সাপ্তাহিক সেচ শিডিউল
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
            </div>
        </div>
    );
};

export default Irrigation;
