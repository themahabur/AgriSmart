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

    // Enhanced crops data with varieties and detailed requirements
    const cropsData = {
        'ধান': {
            varieties: {
                'ব্রি ধান ২৮': { waterRequirement: 24, duration: 140, season: 'রবি' },
                'ব্রি ধান ২৯': { waterRequirement: 26, duration: 145, season: 'খারিফ' },
                'ব্রি ধান ৫০': { waterRequirement: 22, duration: 110, season: 'বোরো' },
                'ব্রি ধান ৮৯': { waterRequirement: 25, duration: 135, season: 'আমন' }
            },
            defaultWater: 25,
            frequency: '৩-৪ দিন পর পর',
            method: 'জমিতে ২-৩ ইঞ্চি পানি রাখুন',
            criticalStages: ['বীজ বপনের ২৫-৩০ দিন', 'ফুল আসার সময়', 'দানা গঠনের সময়'],
            tips: ['বোরো মৌসুমে নিয়মিত সেচ দিন', 'আমন মৌসুমে বৃষ্টির পানির ব্যবহার করুন'],
            waterSaving: 'অন্তর্বর্তী শুকনা পদ্ধতি ব্যবহার করুন'
        },
        'গম': {
            varieties: {
                'প্রতিভা': { waterRequirement: 16, duration: 110, season: 'রবি' },
                'বারি গম ২৬': { waterRequirement: 18, duration: 105, season: 'রবি' },
                'সৌরভ': { waterRequirement: 17, duration: 115, season: 'রবি' }
            },
            defaultWater: 18,
            frequency: '৭-১০ দিন পর পর',
            method: 'হালকা থেকে মাঝারি সেচ',
            criticalStages: ['বপনের ২০-২৫ দিন পর', 'কাইচ থোর আসার সময়', 'দানা গঠনের সময়'],
            tips: ['কাইচ থোর পর্যায়ে অবশ্যই সেচ দিন', 'দানা গঠনের সময় মাটি আর্দ্র রাখুন'],
            waterSaving: 'স্প্রিংকলার পদ্ধতি ব্যবহার করুন'
        },
        'আলু': {
            varieties: {
                'ডায়মন্ড': { waterRequirement: 20, duration: 90, season: 'রবি' },
                'কার্ডিনাল': { waterRequirement: 22, duration: 95, season: 'রবি' },
                'গ্রানোলা': { waterRequirement: 21, duration: 85, season: 'রবি' }
            },
            defaultWater: 22,
            frequency: '৫-৭ দিন পর পর',
            method: 'ফুরো পদ্ধতিতে সেচ',
            criticalStages: ['গাছ ১৫-২০ সেমি হলে', 'কন্দ গঠনের সময়', 'কন্দ বড় হওয়ার সময়'],
            tips: ['কন্দ গঠনের সময় নিয়মিত সেচ দিন', 'ফসল তোলার ১৫ দিন আগে সেচ বন্ধ করুন'],
            waterSaving: 'ড্রিপ ইরিগেশন ব্যবহার করুন'
        },
        'পাট': {
            varieties: {
                'ও-৯৮৯৭': { waterRequirement: 26, duration: 120, season: 'খারিফ' },
                'সিভিএল-১': { waterRequirement: 28, duration: 110, season: 'খারিফ' },
                'কে-১২': { waterRequirement: 27, duration: 115, season: 'খারিফ' }
            },
            defaultWater: 28,
            frequency: '৪-৬ দিন পর পর',
            method: 'জমিতে হালকা পানি রাখুন',
            criticalStages: ['বপনের ৩০-৩৫ দিন পর', 'দ্রুত বাড়ন্ত অবস্থায়'],
            tips: ['বপনের পর হালকা সেচ দিন', 'বর্ধনশীল পর্যায়ে পর্যাপ্ত পানি সরবরাহ করুন'],
            waterSaving: 'বৃষ্টির পানির সর্বোত্তম ব্যবহার করুন'
        },
        'ভুট্টা': {
            varieties: {
                'বারি ভুট্টা ৯': { waterRequirement: 18, duration: 100, season: 'রবি' },
                'পায়রা': { waterRequirement: 19, duration: 95, season: 'খারিফ' },
                'সুপার হাইব্রিড': { waterRequirement: 20, duration: 105, season: 'রবি' }
            },
            defaultWater: 20,
            frequency: '৬-৮ দিন পর পর',
            method: 'ফুরো বা স্প্রিংকলার পদ্ধতি',
            criticalStages: ['বপনের ২০-২৫ দিন পর', 'ফুল আসার সময়', 'দানা গঠনের সময়'],
            tips: ['পরাগায়ন সময়ে সেচ গুরুত্বপূর্ণ', 'দানা পূর্ণতা পর্যায়ে সেচ কমিয়ে দিন'],
            waterSaving: 'মালচিং ব্যবহার করুন'
        },
        'টমেটো': {
            varieties: {
                'বারি টমেটো ৪': { waterRequirement: 22, duration: 90, season: 'রবি' },
                'বারি টমেটো ১৪': { waterRequirement: 24, duration: 95, season: 'খারিফ' },
                'হাইব্রিড': { waterRequirement: 23, duration: 85, season: 'সারা বছর' },
                '000': { waterRequirement: 23, duration: 85, season: 'সারা বছর' }
            },
            defaultWater: 24,
            frequency: '৪-৫ দিন পর পর',
            method: 'ড্রিপ ইরিগেশন',
            criticalStages: ['চারা রোপণের পর', 'ফুল আসার সময়', 'ফল ধারণের সময়'],
            tips: ['ফল ধারণের সময় সুষম সেচ দিন', 'অতিরিক্ত সেচে রোগের প্রকোপ বাড়ে'],
            waterSaving: 'ড্রিপ ইরিগেশন সবচেয়ে কার্যকর'
        }
    };

    const soilWaterCapacity = {
        'বেলে': 15,
        'দোআঁশ': 25,
        'এটেল': 35,
        'পডল মাটি': 30
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
                
                const farmsData = data.data?.farms || [];
                setFarms(farmsData);
                 console.log('Fetched farms data:', farmsData);
                if (farmsData.length > 0) {
                    const farmWithCrop = farmsData.find(farm => farm.cropDetails?.type) || farmsData[0];
                    setSelectedFarm(farmWithCrop);
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

    // Get water requirement based on crop variety
    const getWaterRequirement = () => {
        if (!selectedFarm?.cropDetails?.type || !cropsData[selectedFarm.cropDetails.type]) 
            return 0;
        
        const cropType = selectedFarm.cropDetails.type;
        const variety = selectedFarm.cropDetails.variety;
        
        if (variety && cropsData[cropType].varieties[variety]) {
            return cropsData[cropType].varieties[variety].waterRequirement;
        }
        return cropsData[cropType].defaultWater;
    };

    const calculateIrrigation = () => {
        if (!selectedFarm?.cropDetails?.type || !cropsData[selectedFarm.cropDetails.type]) {
            return {
                requiredWater: 0,
                timing: 'ফসল নির্বাচন করুন',
                duration: 0,
                nextIrrigation: 'নির্ধারণ করুন',
                efficiency: 'N/A',
                waterSource: 'নির্ধারণ করুন'
            };
        }

        const waterRequirement = getWaterRequirement();
        const soilType = selectedFarm.soilDetails?.type || 'দোআঁশ';
        const soilCapacity = soilWaterCapacity[soilType] || 25;
        const currentMoisture = 45;
        const waterDeficit = soilCapacity - currentMoisture;
        
        let efficiency = 'মধ্যম';
        if (soilType === 'এটেল') efficiency = 'উচ্চ';
        if (soilType === 'বেলে') efficiency = 'নিম্ন';
        if (soilType === 'পডল মাটি') efficiency = 'ভাল';
        
        let nextIrrigation = 'আজ';
        let daysUntilNext = 0;
        if (selectedFarm?.irrigation?.lastDate) {
            const lastDate = new Date(selectedFarm.irrigation.lastDate);
            const today = new Date();
            const daysSinceLast = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
            
            const cropType = selectedFarm.cropDetails.type;
            const frequencyDays = cropType === 'ধান' ? 4 : cropType === 'গম' ? 8 : 5;
            daysUntilNext = Math.max(0, frequencyDays - daysSinceLast);
            
            if (daysUntilNext === 0) {
                nextIrrigation = 'আজ';
            } else if (daysUntilNext === 1) {
                nextIrrigation = 'আগামীকাল';
            } else {
                nextIrrigation = `${daysUntilNext} দিন পর`;
            }
        }
        
        const requiredWater = Math.max(waterRequirement, waterDeficit);
        const area = selectedFarm?.sizeAcre || 1;
        const duration = Math.round((area * requiredWater * 60) / 10);
        
        return {
            requiredWater: requiredWater,
            timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 
                   currentMoisture < 40 ? 'শীঘ্রই সেচ দিন' : 'নিয়মিত সেচ',
            duration: duration,
            nextIrrigation: nextIrrigation,
            efficiency: efficiency,
            waterSource: selectedFarm.irrigation?.source || 'নির্ধারিত হয়নি',
            tubeWellDepth: selectedFarm.irrigation?.tubeWellDepth,
            daysUntilNext: daysUntilNext
        };
    };

    const irrigationAdvice = calculateIrrigation();

    // Get planting info for selected farm
    const getPlantingInfo = () => {
        if (!selectedFarm?.cropDetails?.plantingDate) return null;
        
        const plantingDate = new Date(selectedFarm.cropDetails.plantingDate);
        const today = new Date();
        const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
        
        let growthStage = 'অঙ্কুরোদগম';
        let stageProgress = 0;
        
        if (selectedFarm.cropDetails?.type && cropsData[selectedFarm.cropDetails.type]) {
            const cropType = selectedFarm.cropDetails.type;
            const variety = selectedFarm.cropDetails.variety;
            const cropDuration = variety && cropsData[cropType].varieties[variety] 
                ? cropsData[cropType].varieties[variety].duration 
                : cropsData[cropType].defaultWater * 5;
            
            stageProgress = Math.min(100, (daysSincePlanting / cropDuration) * 100);
            
            if (daysSincePlanting < cropDuration * 0.3) {
                growthStage = 'বর্ধনশীল পর্যায়';
            } else if (daysSincePlanting < cropDuration * 0.7) {
                growthStage = 'ফুল/ফল ধারণ';
            } else {
                growthStage = 'পরিপক্বতা';
            }
        }
        
        return {
            plantingDate: plantingDate.toLocaleDateString('bn-BD'),
            daysSincePlanting: daysSincePlanting,
            growthStage: growthStage,
            stageProgress: stageProgress
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
                        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 p-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 shadow-lg">
                        <span className="text-3xl">🚜</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                        স্মার্ট সেচ ব্যবস্থাপনা
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        আপনার ফার্মের তথ্য অনুযায়ী সঠিক সেচ পরামর্শ
                    </p>
                </div>

                {farms.length === 0 ? (
                    <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto border border-green-100">
                        <div className="text-8xl mb-6">🌾</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">কোন ফার্ম পাওয়া যায়নি</h2>
                        <p className="text-gray-600 mb-8 text-lg">সেচ সুপারিশ পেতে প্রথমে একটি ফার্ম তৈরি করুন</p>
                        <button 
                            onClick={() => window.location.href = '/farms'}
                            className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
                        >
                            ফার্ম তৈরি করুন
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        
                        {/* Left Column - Farm Selection & Details */}
                        <div className="space-y-8">
                            {/* Farm Selection Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg">🌾</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">ফার্ম নির্বাচন</h2>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        আপনার ফার্ম নির্বাচন করুন
                                    </label>
                                    <select 
                                        value={selectedFarm?.id || ''}
                                        onChange={(e) => {
                                            const farm = farms.find(f => f.id === e.target.value);
                                            setSelectedFarm(farm);
                                        }}
                                        className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-700 font-medium"
                                    >
                                        {farms.map(farm => (
                                            <option key={farm.id} value={farm.id}>
                                                {farm.name} - {farm.sizeAcre} একর
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Farm Details */}
                                {selectedFarm && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                            <h4 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
                                                <span>🏠</span> ফার্ম তথ্য
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-green-700 font-medium">নাম:</span>
                                                    <span className="text-green-900 font-semibold">{selectedFarm.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-green-700 font-medium">অবস্থান:</span>
                                                    <span className="text-green-900 font-semibold">{selectedFarm.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-green-700 font-medium">আকার:</span>
                                                    <span className="text-green-900 font-semibold">{selectedFarm.sizeAcre} একর</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-green-700 font-medium">স্ট্যাটাস:</span>
                                                    <span className="text-green-900 font-semibold">{selectedFarm.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedFarm.cropDetails?.type && (
                                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                                <h4 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
                                                    <span>🌱</span> ফসল তথ্য
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-blue-700 font-medium">ফসল:</span>
                                                        <span className="text-blue-900 font-semibold">{selectedFarm.cropDetails.type}</span>
                                                    </div>
                                                    {selectedFarm.cropDetails.variety && (
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-700 font-medium">ভ্যারাইটি:</span>
                                                            <span className="text-blue-900 font-semibold">{selectedFarm.cropDetails.variety}</span>
                                                        </div>
                                                    )}
                                                    {plantingInfo && (
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-700 font-medium">রোপণ:</span>
                                                            <span className="text-blue-900 font-semibold">{plantingInfo.plantingDate}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedFarm.irrigation?.source && (
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                                                <h4 className="font-bold text-purple-800 mb-3 text-lg flex items-center gap-2">
                                                    <span>💧</span> সেচ সুবিধা
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-purple-700 font-medium">পানির উৎস:</span>
                                                        <span className="text-purple-900 font-semibold">{selectedFarm.irrigation.source}</span>
                                                    </div>
                                                    {selectedFarm.irrigation.tubeWellDepth && (
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-700 font-medium">টিউবওয়েল গভীরতা:</span>
                                                            <span className="text-purple-900 font-semibold">{selectedFarm.irrigation.tubeWellDepth} ফুট</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedFarm.soilDetails?.type && (
                                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                                                <h4 className="font-bold text-amber-800 mb-3 text-lg flex items-center gap-2">
                                                    <span>🌿</span> মাটির তথ্য
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-amber-700 font-medium">মাটির ধরন:</span>
                                                        <span className="text-amber-900 font-semibold">{selectedFarm.soilDetails.type}</span>
                                                    </div>
                                                    {selectedFarm.soilDetails.pH && (
                                                        <div className="flex justify-between">
                                                            <span className="text-amber-700 font-medium">পিএইচ মান:</span>
                                                            <span className={`font-semibold ${
                                                                selectedFarm.soilDetails.pH < 5.5 || selectedFarm.soilDetails.pH > 7.5 
                                                                    ? 'text-red-600' 
                                                                    : 'text-amber-900'
                                                            }`}>
                                                                {selectedFarm.soilDetails.pH}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Tips & Guidelines */}
                            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-6 border border-yellow-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg">⚠️</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-yellow-800">গুরুত্বপূর্ণ নির্দেশনা</h2>
                                </div>
                                <ul className="space-y-3 text-yellow-700">
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>মাটির আর্দ্রতা ৩০% এর নিচে না যেতে দিন</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>বৃষ্টির পূর্বাভাসে সেচ কমিয়ে দিন</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>ক্রিটিক্যাল স্টেজে নিয়মিত সেচ দিন</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>পানির উৎসের গুণগত মান পরীক্ষা করুন</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Middle Column - Main Content */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Irrigation Advice Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">💧</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">আজকের সেচ সুপারিশ</h2>
                                        <p className="text-gray-600">বুদ্ধিমান সেচ ব্যবস্থাপনা</p>
                                    </div>
                                </div>

                                {selectedFarm?.cropDetails?.type ? (
                                    <div className="space-y-6">
                                        <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                                            irrigationAdvice.timing.includes('জরুরি') 
                                                ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg' 
                                                : irrigationAdvice.timing.includes('শীঘ্রই')
                                                ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-lg'
                                                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg'
                                        }`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
                                                        <span className="font-semibold text-gray-700">সেচের অবস্থা:</span>
                                                        <span className={`font-bold text-lg px-4 py-2 rounded-full ${
                                                            irrigationAdvice.timing.includes('জরুরি') 
                                                                ? 'bg-red-100 text-red-700 border border-red-200' 
                                                                : irrigationAdvice.timing.includes('শীঘ্রই')
                                                                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                                : 'bg-green-100 text-green-700 border border-green-200'
                                                        }`}>
                                                            {irrigationAdvice.timing}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
                                                        <span className="font-semibold text-gray-700">পানির পরিমাণ:</span>
                                                        <span className="font-bold text-blue-600 text-xl">{irrigationAdvice.requiredWater} mm</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
                                                        <span className="font-semibold text-gray-700">সময়:</span>
                                                        <span className="font-bold text-purple-600 text-xl">{irrigationAdvice.duration} মিনিট</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
                                                        <span className="font-semibold text-gray-700">পরবর্তী সেচ:</span>
                                                        <span className="font-bold text-orange-600 text-xl">{irrigationAdvice.nextIrrigation}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                                            <h4 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
                                                <span>🕒</span> উপযুক্ত সময়
                                            </h4>
                                            <div className="flex items-center justify-center gap-8">
                                                <div className="text-center bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100">
                                                    <div className="text-3xl font-bold text-blue-600 mb-1">সকাল</div>
                                                    <div className="text-blue-700 font-semibold text-lg">৬-৮টা</div>
                                                </div>
                                                <div className="text-blue-600 font-bold text-xl">বা</div>
                                                <div className="text-center bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100">
                                                    <div className="text-3xl font-bold text-blue-600 mb-1">বিকাল</div>
                                                    <div className="text-blue-700 font-semibold text-lg">৫-৭টা</div>
                                                </div>
                                            </div>
                                            <p className="text-blue-700 text-center mt-4 font-medium">
                                                💡 বাতাস কম থাকা অবস্থায় সেচ দিন
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                        <div className="text-6xl mb-4">🌱</div>
                                        <p className="text-gray-600 text-lg font-medium">এই ফার্মে কোনো ফসলের তথ্য নেই</p>
                                        <p className="text-gray-500 mt-2">ফার্মে ফসলের তথ্য যোগ করুন</p>
                                    </div>
                                )}
                            </div>

                            {/* Grid of Additional Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Crop Growth Progress */}
                                {plantingInfo && (
                                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100 hover:shadow-2xl transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg">📈</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-800">ফসলের অগ্রগতি</h2>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between mb-3">
                                                    <span className="text-sm font-semibold text-gray-700">বৃদ্ধির পর্যায়</span>
                                                    <span className="text-lg font-bold text-emerald-600">{Math.round(plantingInfo.stageProgress)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                                                    <div 
                                                        className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-md"
                                                        style={{ width: `${plantingInfo.stageProgress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                                    <span className="font-medium text-emerald-700">রোপণের তারিখ:</span>
                                                    <span className="font-semibold text-emerald-900">{plantingInfo.plantingDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                    <span className="font-medium text-blue-700">রোপণের পর দিন:</span>
                                                    <span className="font-semibold text-blue-900">{plantingInfo.daysSincePlanting} দিন</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                                                    <span className="font-medium text-purple-700">বর্তমান পর্যায়:</span>
                                                    <span className="font-semibold text-purple-900">{plantingInfo.growthStage}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Water Efficiency */}
                                <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100 hover:shadow-2xl transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <span className="text-lg">💎</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-800">পানি দক্ষতা</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-indigo-700">দক্ষতা রেটিং:</span>
                                                <span className="font-bold text-indigo-900 text-lg">{irrigationAdvice.efficiency}</span>
                                            </div>
                                            <p className="text-indigo-700 text-sm">
                                                {irrigationAdvice.efficiency === 'উচ্চ' 
                                                    ? 'আপনার মাটি পানির ভাল দক্ষতা রাখে'
                                                    : irrigationAdvice.efficiency === 'ভাল'
                                                    ? 'মধ্যম দক্ষতা, নিয়মিত মনিটরিং করুন'
                                                    : 'নিম্ন দক্ষতা, ঘন ঘন সেচ প্রয়োজন'}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                            <h4 className="font-semibold text-green-800 mb-2">পানি সাশ্রয় টিপস</h4>
                                            <ul className="text-green-700 space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <span>💧</span>
                                                    সকাল বা বিকালে সেচ দিন
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span>🌿</span>
                                                    মালচিং ব্যবহার করুন
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span>🔄</span>
                                                    ড্রিপ ইরিগেশন ব্যবহার করুন
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Crop Details */}
                                {selectedFarm?.cropDetails?.type && cropsData[selectedFarm.cropDetails.type] && (
                                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-amber-100 hover:shadow-2xl transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg">📝</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {selectedFarm.cropDetails.type} এর সেচ নির্দেশিকা
                                            </h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-semibold text-blue-700">পানির প্রয়োজন:</span>
                                                        <span className="font-bold text-blue-900 text-lg">{getWaterRequirement()} mm/সপ্তাহ</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold text-blue-700">সেচের ফ্রিকোয়েন্সি:</span>
                                                        <span className="font-bold text-blue-900">{cropsData[selectedFarm.cropDetails.type].frequency}</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                                    <h4 className="font-semibold text-green-800 mb-2">সেচ পদ্ধতি</h4>
                                                    <p className="text-green-700">{cropsData[selectedFarm.cropDetails.type].method}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                                                    <h4 className="font-semibold text-amber-800 mb-2">সমালোচনামূলক পর্যায়</h4>
                                                    <ul className="text-amber-700 space-y-2">
                                                        {cropsData[selectedFarm.cropDetails.type].criticalStages.map((stage, index) => (
                                                            <li key={index} className="flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
                                                                {stage}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Weekly Schedule */}
                {selectedFarm?.cropDetails?.type && cropsData[selectedFarm.cropDetails.type] && (
                    <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🗓️</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedFarm.cropDetails.type} এর সাপ্তাহিক সেচ শিডিউল
                                </h2>
                                <p className="text-gray-600">সপ্তাহের সেরা সময়ে সেচ দিন</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                            {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'].map((day, index) => (
                                <div key={day} className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                                    index === 0 || index === 4 
                                        ? 'bg-gradient-to-b from-green-100 to-emerald-100 border-green-300 shadow-lg transform hover:-translate-y-1' 
                                        : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <div className={`font-bold text-lg mb-2 ${
                                        index === 0 || index === 4 ? 'text-green-700' : 'text-gray-600'
                                    }`}>
                                        {day}
                                    </div>
                                    <div className={`text-sm font-semibold ${
                                        index === 0 || index === 4 ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                        {index === 0 || index === 4 ? 'সেচ দিন' : 'বিশ্রাম'}
                                    </div>
                                    {index === 0 || index === 4 && (
                                        <div className="text-xs text-blue-600 mt-2 font-medium bg-blue-100 px-2 py-1 rounded-full">
                                            ৬-৮ AM
                                        </div>
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


// "use client"

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// const Irrigation = () => {
//     const { data: session, status } = useSession();
//     const userEmail = session?.user?.email || "";
    
//     const [farms, setFarms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedFarm, setSelectedFarm] = useState(null);

//     // Enhanced crops data with varieties and detailed requirements
//     const cropsData = {
//         'ধান': {
//             varieties: {
//                 'ব্রি ধান ২৮': { waterRequirement: 24, duration: 140, season: 'রবি' },
//                 'ব্রি ধান ২৯': { waterRequirement: 26, duration: 145, season: 'খারিফ' },
//                 'ব্রি ধান ৫০': { waterRequirement: 22, duration: 110, season: 'বোরো' },
//                 'ব্রি ধান ৮৯': { waterRequirement: 25, duration: 135, season: 'আমন' }
//             },
//             defaultWater: 25,
//             frequency: '৩-৪ দিন পর পর',
//             method: 'জমিতে ২-৩ ইঞ্চি পানি রাখুন',
//             criticalStages: ['বীজ বপনের ২৫-৩০ দিন', 'ফুল আসার সময়', 'দানা গঠনের সময়'],
//             tips: ['বোরো মৌসুমে নিয়মিত সেচ দিন', 'আমন মৌসুমে বৃষ্টির পানির ব্যবহার করুন'],
//             waterSaving: 'অন্তর্বর্তী শুকনা পদ্ধতি ব্যবহার করুন'
//         },
//         'গম': {
//             varieties: {
//                 'প্রতিভা': { waterRequirement: 16, duration: 110, season: 'রবি' },
//                 'বারি গম ২৬': { waterRequirement: 18, duration: 105, season: 'রবি' },
//                 'সৌরভ': { waterRequirement: 17, duration: 115, season: 'রবি' }
//             },
//             defaultWater: 18,
//             frequency: '৭-১০ দিন পর পর',
//             method: 'হালকা থেকে মাঝারি সেচ',
//             criticalStages: ['বপনের ২০-২৫ দিন পর', 'কাইচ থোর আসার সময়', 'দানা গঠনের সময়'],
//             tips: ['কাইচ থোর পর্যায়ে অবশ্যই সেচ দিন', 'দানা গঠনের সময় মাটি আর্দ্র রাখুন'],
//             waterSaving: 'স্প্রিংকলার পদ্ধতি ব্যবহার করুন'
//         },
//         'আলু': {
//             varieties: {
//                 'ডায়মন্ড': { waterRequirement: 20, duration: 90, season: 'রবি' },
//                 'কার্ডিনাল': { waterRequirement: 22, duration: 95, season: 'রবি' },
//                 'গ্রানোলা': { waterRequirement: 21, duration: 85, season: 'রবি' }
//             },
//             defaultWater: 22,
//             frequency: '৫-৭ দিন পর পর',
//             method: 'ফুরো পদ্ধতিতে সেচ',
//             criticalStages: ['গাছ ১৫-২০ সেমি হলে', 'কন্দ গঠনের সময়', 'কন্দ বড় হওয়ার সময়'],
//             tips: ['কন্দ গঠনের সময় নিয়মিত সেচ দিন', 'ফসল তোলার ১৫ দিন আগে সেচ বন্ধ করুন'],
//             waterSaving: 'ড্রিপ ইরিগেশন ব্যবহার করুন'
//         },
//         'পাট': {
//             varieties: {
//                 'ও-৯৮৯৭': { waterRequirement: 26, duration: 120, season: 'খারিফ' },
//                 'সিভিএল-১': { waterRequirement: 28, duration: 110, season: 'খারিফ' },
//                 'কে-১২': { waterRequirement: 27, duration: 115, season: 'খারিফ' }
//             },
//             defaultWater: 28,
//             frequency: '৪-৬ দিন পর পর',
//             method: 'জমিতে হালকা পানি রাখুন',
//             criticalStages: ['বপনের ৩০-৩৫ দিন পর', 'দ্রুত বাড়ন্ত অবস্থায়'],
//             tips: ['বপনের পর হালকা সেচ দিন', 'বর্ধনশীল পর্যায়ে পর্যাপ্ত পানি সরবরাহ করুন'],
//             waterSaving: 'বৃষ্টির পানির সর্বোত্তম ব্যবহার করুন'
//         },
//         'ভুট্টা': {
//             varieties: {
//                 'বারি ভুট্টা ৯': { waterRequirement: 18, duration: 100, season: 'রবি' },
//                 'পায়রা': { waterRequirement: 19, duration: 95, season: 'খারিফ' },
//                 'সুপার হাইব্রিড': { waterRequirement: 20, duration: 105, season: 'রবি' }
//             },
//             defaultWater: 20,
//             frequency: '৬-৮ দিন পর পর',
//             method: 'ফুরো বা স্প্রিংকলার পদ্ধতি',
//             criticalStages: ['বপনের ২০-২৫ দিন পর', 'ফুল আসার সময়', 'দানা গঠনের সময়'],
//             tips: ['পরাগায়ন সময়ে সেচ গুরুত্বপূর্ণ', 'দানা পূর্ণতা পর্যায়ে সেচ কমিয়ে দিন'],
//             waterSaving: 'মালচিং ব্যবহার করুন'
//         },
//         'টমেটো': {
//             varieties: {
//                 'বারি টমেটো ৪': { waterRequirement: 22, duration: 90, season: 'রবি' },
//                 'বারি টমেটো ১৪': { waterRequirement: 24, duration: 95, season: 'খারিফ' },
//                 'হাইব্রিড': { waterRequirement: 23, duration: 85, season: 'সারা বছর' }
//             },
//             defaultWater: 24,
//             frequency: '৪-৫ দিন পর পর',
//             method: 'ড্রিপ ইরিগেশন',
//             criticalStages: ['চারা রোপণের পর', 'ফুল আসার সময়', 'ফল ধারণের সময়'],
//             tips: ['ফল ধারণের সময় সুষম সেচ দিন', 'অতিরিক্ত সেচে রোগের প্রকোপ বাড়ে'],
//             waterSaving: 'ড্রিপ ইরিগেশন সবচেয়ে কার্যকর'
//         }
//     };

//     const soilWaterCapacity = {
//         'বেলে': 15,
//         'দোআঁশ': 25,
//         'এটেল': 35,
//         'পডল মাটি': 30
//     };

//     // Convert acres to bigha (1 acre = 3.025 bigha in Bangladesh)
//     const convertToBigha = (acres) => {
//         return (acres * 3.025).toFixed(2);
//     };

//     // Get area display text
//     const getAreaDisplay = (acres) => {
//         if (!acres || acres === 0) return 'আকার নির্ধারণ করুন';
//         const bigha = convertToBigha(acres);
//         return `${acres} একর (${bigha} বিঘা)`;
//     };

//     // Get status suggestions
//     const getStatusSuggestions = (farm) => {
//         const suggestions = [];
        
//         if (!farm.sizeAcre || farm.sizeAcre === 0) {
//             suggestions.push('ফার্মের আকার যোগ করুন');
//         }
        
//         if (!farm.cropDetails?.type) {
//             suggestions.push('ফসল নির্বাচন করুন');
//         }
        
//         if (!farm.soilDetails?.type) {
//             suggestions.push('মাটির ধরন নির্ধারণ করুন');
//         }
        
//         if (!farm.irrigation?.source) {
//             suggestions.push('সেচের উৎস যোগ করুন');
//         }
        
//         if (suggestions.length === 0) {
//             suggestions.push('ফার্মের তথ্য সম্পূর্ণ। সেচ পরামর্শ পাওয়া যাচ্ছে।');
//         }
        
//         return suggestions;
//     };

//     // Fetch farms data
//     useEffect(() => {
//         const fetchFarms = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://agri-smart-server.vercel.app/api/farms/${userEmail}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch farm data');
//                 }
//                 const data = await response.json();
                
//                 const farmsData = data.data?.farms || [];
//                 setFarms(farmsData);
//                 console.log('Fetched farms data:', farmsData);
//                 if (farmsData.length > 0) {
//                     const farmWithCrop = farmsData.find(farm => farm.cropDetails?.type) || farmsData[0];
//                     setSelectedFarm(farmWithCrop);
//                 }
//             } catch (err) {
//                 setError(err.message);
//                 console.error('Error fetching farms:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userEmail) {
//             fetchFarms();
//         }
//     }, [userEmail]);

//     // Get water requirement based on crop variety
//     const getWaterRequirement = () => {
//         if (!selectedFarm?.cropDetails?.type || !cropsData[selectedFarm.cropDetails.type]) 
//             return 0;
        
//         const cropType = selectedFarm.cropDetails.type;
//         const variety = selectedFarm.cropDetails.variety;
        
//         if (variety && cropsData[cropType].varieties[variety]) {
//             return cropsData[cropType].varieties[variety].waterRequirement;
//         }
//         return cropsData[cropType].defaultWater;
//     };

//     const calculateIrrigation = () => {
//         if (!selectedFarm?.cropDetails?.type || !cropsData[selectedFarm.cropDetails.type]) {
//             return {
//                 requiredWater: 0,
//                 timing: 'ফসল নির্বাচন করুন',
//                 duration: 0,
//                 nextIrrigation: 'নির্ধারণ করুন',
//                 efficiency: 'N/A',
//                 waterSource: 'নির্ধারণ করুন',
//                 hasCompleteData: false
//             };
//         }

//         const waterRequirement = getWaterRequirement();
//         const soilType = selectedFarm.soilDetails?.type || 'দোআঁশ';
//         const soilCapacity = soilWaterCapacity[soilType] || 25;
//         const currentMoisture = 45;
//         const waterDeficit = soilCapacity - currentMoisture;
        
//         let efficiency = 'মধ্যম';
//         if (soilType === 'এটেল') efficiency = 'উচ্চ';
//         if (soilType === 'বেলে') efficiency = 'নিম্ন';
//         if (soilType === 'পডল মাটি') efficiency = 'ভাল';
        
//         let nextIrrigation = 'আজ';
//         let daysUntilNext = 0;
//         if (selectedFarm?.irrigation?.lastDate) {
//             const lastDate = new Date(selectedFarm.irrigation.lastDate);
//             const today = new Date();
//             const daysSinceLast = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
            
//             const cropType = selectedFarm.cropDetails.type;
//             const frequencyDays = cropType === 'ধান' ? 4 : cropType === 'গম' ? 8 : 5;
//             daysUntilNext = Math.max(0, frequencyDays - daysSinceLast);
            
//             if (daysUntilNext === 0) {
//                 nextIrrigation = 'আজ';
//             } else if (daysUntilNext === 1) {
//                 nextIrrigation = 'আগামীকাল';
//             } else {
//                 nextIrrigation = `${daysUntilNext} দিন পর`;
//             }
//         }
        
//         const area = selectedFarm?.sizeAcre || 1;
//         const requiredWater = Math.max(waterRequirement, waterDeficit);
//         const duration = area > 0 ? Math.round((area * requiredWater * 60) / 10) : 0;
        
//         return {
//             requiredWater: requiredWater,
//             timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 
//                    currentMoisture < 40 ? 'শীঘ্রই সেচ দিন' : 'নিয়মিত সেচ',
//             duration: duration,
//             nextIrrigation: nextIrrigation,
//             efficiency: efficiency,
//             waterSource: selectedFarm.irrigation?.source || 'নির্ধারিত হয়নি',
//             tubeWellDepth: selectedFarm.irrigation?.tubeWellDepth,
//             daysUntilNext: daysUntilNext,
//             hasCompleteData: true
//         };
//     };

//     const irrigationAdvice = calculateIrrigation();
//     const statusSuggestions = selectedFarm ? getStatusSuggestions(selectedFarm) : [];

//     // Get planting info for selected farm
//     const getPlantingInfo = () => {
//         if (!selectedFarm?.cropDetails?.plantingDate) return null;
        
//         const plantingDate = new Date(selectedFarm.cropDetails.plantingDate);
//         const today = new Date();
//         const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
        
//         let growthStage = 'অঙ্কুরোদগম';
//         let stageProgress = 0;
        
//         if (selectedFarm.cropDetails?.type && cropsData[selectedFarm.cropDetails.type]) {
//             const cropType = selectedFarm.cropDetails.type;
//             const variety = selectedFarm.cropDetails.variety;
//             const cropDuration = variety && cropsData[cropType].varieties[variety] 
//                 ? cropsData[cropType].varieties[variety].duration 
//                 : cropsData[cropType].defaultWater * 5;
            
//             stageProgress = Math.min(100, (daysSincePlanting / cropDuration) * 100);
            
//             if (daysSincePlanting < cropDuration * 0.3) {
//                 growthStage = 'বর্ধনশীল পর্যায়';
//             } else if (daysSincePlanting < cropDuration * 0.7) {
//                 growthStage = 'ফুল/ফল ধারণ';
//             } else {
//                 growthStage = 'পরিপক্বতা';
//             }
//         }
        
//         return {
//             plantingDate: plantingDate.toLocaleDateString('bn-BD'),
//             daysSincePlanting: daysSincePlanting,
//             growthStage: growthStage,
//             stageProgress: stageProgress
//         };
//     };

//     const plantingInfo = getPlantingInfo();

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">ফার্ম ডেটা লোড হচ্ছে...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center">
//                 <div className="text-center text-red-600">
//                     <p>ত্রুটি: {error}</p>
//                     <button 
//                         onClick={() => window.location.reload()}
//                         className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg"
//                     >
//                         আবার চেষ্টা করুন
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 p-4">
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 shadow-lg">
//                         <span className="text-3xl">🚜</span>
//                     </div>
//                     <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
//                         স্মার্ট সেচ ব্যবস্থাপনা
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//                         আপনার ফার্মের তথ্য অনুযায়ী সঠিক সেচ পরামর্শ
//                     </p>
//                 </div>

//                 {farms.length === 0 ? (
//                     <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto border border-green-100">
//                         <div className="text-8xl mb-6">🌾</div>
//                         <h2 className="text-3xl font-bold text-gray-800 mb-4">কোন ফার্ম পাওয়া যায়নি</h2>
//                         <p className="text-gray-600 mb-8 text-lg">সেচ সুপারিশ পেতে প্রথমে একটি ফার্ম তৈরি করুন</p>
//                         <button 
//                             onClick={() => window.location.href = '/farms'}
//                             className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
//                         >
//                             ফার্ম তৈরি করুন
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        
//                         {/* Left Column - Farm Selection & Details */}
//                         <div className="space-y-8">
//                             {/* Farm Selection Card */}
//                             <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                         <span className="text-lg">🌾</span>
//                                     </div>
//                                     <h2 className="text-2xl font-bold text-gray-800">ফার্ম নির্বাচন</h2>
//                                 </div>

//                                 <div className="mb-6">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                                         আপনার ফার্ম নির্বাচন করুন
//                                     </label>
//                                     <select 
//                                         value={selectedFarm?.id || ''}
//                                         onChange={(e) => {
//                                             const farm = farms.find(f => f.id === e.target.value);
//                                             setSelectedFarm(farm);
//                                         }}
//                                         className="w-full p-4 border-2 border-green-200 rounded-xl focus:ring-3 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-700 font-medium"
//                                     >
//                                         {farms.map(farm => (
//                                             <option key={farm.id} value={farm.id}>
//                                                 {farm.name} - {getAreaDisplay(farm.sizeAcre)}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Status & Suggestions */}
//                                 {selectedFarm && (
//                                     <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                                         <div className="flex items-center gap-2 mb-3">
//                                             <span className="text-lg">📋</span>
//                                             <h4 className="font-bold text-blue-800 text-lg">ফার্ম স্ট্যাটাস</h4>
//                                         </div>
//                                         <div className="flex justify-between items-center mb-3">
//                                             <span className="text-blue-700 font-medium">বর্তমান অবস্থা:</span>
//                                             <span className={`font-bold px-3 py-1 rounded-full text-sm ${
//                                                 selectedFarm.status === 'পরিকল্পনাধীন' 
//                                                     ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//                                                     : selectedFarm.status === 'চলমান'
//                                                     ? 'bg-green-100 text-green-700 border border-green-300'
//                                                     : 'bg-gray-100 text-gray-700 border border-gray-300'
//                                             }`}>
//                                                 {selectedFarm.status}
//                                             </span>
//                                         </div>
                                        
//                                         <div className="mt-3">
//                                             <h5 className="font-semibold text-blue-700 mb-2 text-sm">সুপারিশসমূহ:</h5>
//                                             <ul className="space-y-2">
//                                                 {statusSuggestions.map((suggestion, index) => (
//                                                     <li key={index} className="flex items-start gap-2 text-sm text-blue-600">
//                                                         <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
//                                                         {suggestion}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Farm Details */}
//                                 {selectedFarm && (
//                                     <div className="space-y-4">
//                                         <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                                             <h4 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
//                                                 <span>🏠</span> ফার্ম তথ্য
//                                             </h4>
//                                             <div className="space-y-2">
//                                                 <div className="flex justify-between">
//                                                     <span className="text-green-700 font-medium">নাম:</span>
//                                                     <span className="text-green-900 font-semibold">{selectedFarm.name}</span>
//                                                 </div>
//                                                 <div className="flex justify-between">
//                                                     <span className="text-green-700 font-medium">অবস্থান:</span>
//                                                     <span className="text-green-900 font-semibold">{selectedFarm.location}</span>
//                                                 </div>
//                                                 <div className="flex justify-between">
//                                                     <span className="text-green-700 font-medium">আকার:</span>
//                                                     <span className="text-green-900 font-semibold">{getAreaDisplay(selectedFarm.sizeAcre)}</span>
//                                                 </div>
//                                                 <div className="flex justify-between">
//                                                     <span className="text-green-700 font-medium">স্ট্যাটাস:</span>
//                                                     <span className={`font-semibold ${
//                                                         selectedFarm.status === 'পরিকল্পনাধীন' 
//                                                             ? 'text-yellow-600'
//                                                             : selectedFarm.status === 'চলমান'
//                                                             ? 'text-green-600'
//                                                             : 'text-gray-600'
//                                                     }`}>
//                                                         {selectedFarm.status}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {selectedFarm.cropDetails?.type && (
//                                             <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
//                                                 <h4 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2">
//                                                     <span>🌱</span> ফসল তথ্য
//                                                 </h4>
//                                                 <div className="space-y-2">
//                                                     <div className="flex justify-between">
//                                                         <span className="text-blue-700 font-medium">ফসল:</span>
//                                                         <span className="text-blue-900 font-semibold">{selectedFarm.cropDetails.type}</span>
//                                                     </div>
//                                                     {selectedFarm.cropDetails.variety && (
//                                                         <div className="flex justify-between">
//                                                             <span className="text-blue-700 font-medium">ভ্যারাইটি:</span>
//                                                             <span className="text-blue-900 font-semibold">{selectedFarm.cropDetails.variety}</span>
//                                                         </div>
//                                                     )}
//                                                     {plantingInfo && (
//                                                         <div className="flex justify-between">
//                                                             <span className="text-blue-700 font-medium">রোপণ:</span>
//                                                             <span className="text-blue-900 font-semibold">{plantingInfo.plantingDate}</span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {selectedFarm.irrigation?.source && (
//                                             <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
//                                                 <h4 className="font-bold text-purple-800 mb-3 text-lg flex items-center gap-2">
//                                                     <span>💧</span> সেচ সুবিধা
//                                                 </h4>
//                                                 <div className="space-y-2">
//                                                     <div className="flex justify-between">
//                                                         <span className="text-purple-700 font-medium">পানির উৎস:</span>
//                                                         <span className="text-purple-900 font-semibold">{selectedFarm.irrigation.source}</span>
//                                                     </div>
//                                                     {selectedFarm.irrigation.tubeWellDepth && (
//                                                         <div className="flex justify-between">
//                                                             <span className="text-purple-700 font-medium">টিউবওয়েল গভীরতা:</span>
//                                                             <span className="text-purple-900 font-semibold">{selectedFarm.irrigation.tubeWellDepth} ফুট</span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {selectedFarm.soilDetails?.type && (
//                                             <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
//                                                 <h4 className="font-bold text-amber-800 mb-3 text-lg flex items-center gap-2">
//                                                     <span>🌿</span> মাটির তথ্য
//                                                 </h4>
//                                                 <div className="space-y-2">
//                                                     <div className="flex justify-between">
//                                                         <span className="text-amber-700 font-medium">মাটির ধরন:</span>
//                                                         <span className="text-amber-900 font-semibold">{selectedFarm.soilDetails.type}</span>
//                                                     </div>
//                                                     {selectedFarm.soilDetails.pH && (
//                                                         <div className="flex justify-between">
//                                                             <span className="text-amber-700 font-medium">পিএইচ মান:</span>
//                                                             <span className={`font-semibold ${
//                                                                 selectedFarm.soilDetails.pH < 5.5 || selectedFarm.soilDetails.pH > 7.5 
//                                                                     ? 'text-red-600' 
//                                                                     : 'text-amber-900'
//                                                             }`}>
//                                                                 {selectedFarm.soilDetails.pH}
//                                                             </span>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Tips & Guidelines */}
//                             <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-6 border border-yellow-200">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
//                                         <span className="text-lg">⚠️</span>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-yellow-800">গুরুত্বপূর্ণ নির্দেশনা</h2>
//                                 </div>
//                                 <ul className="space-y-3 text-yellow-700">
//                                     <li className="flex items-start gap-2">
//                                         <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
//                                         <span>মাটির আর্দ্রতা ৩০% এর নিচে না যেতে দিন</span>
//                                     </li>
//                                     <li className="flex items-start gap-2">
//                                         <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
//                                         <span>বৃষ্টির পূর্বাভাসে সেচ কমিয়ে দিন</span>
//                                     </li>
//                                     <li className="flex items-start gap-2">
//                                         <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
//                                         <span>ক্রিটিক্যাল স্টেজে নিয়মিত সেচ দিন</span>
//                                     </li>
//                                     <li className="flex items-start gap-2">
//                                         <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
//                                         <span>পানির উৎসের গুণগত মান পরীক্ষা করুন</span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* Middle Column - Main Content */}
//                         <div className="xl:col-span-2 space-y-8">
//                             {/* Irrigation Advice Card */}
//                             <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-300">
//                                 <div className="flex items-center gap-3 mb-6">
//                                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                                         <span className="text-2xl">💧</span>
//                                     </div>
//                                     <div>
//                                         <h2 className="text-2xl font-bold text-gray-800">আজকের সেচ সুপারিশ</h2>
//                                         <p className="text-gray-600">বুদ্ধিমান সেচ ব্যবস্থাপনা</p>
//                                     </div>
//                                 </div>

//                                 {selectedFarm?.cropDetails?.type && irrigationAdvice.hasCompleteData ? (
//                                     <div className="space-y-6">
//                                         <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
//                                             irrigationAdvice.timing.includes('জরুরি') 
//                                                 ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg' 
//                                                 : irrigationAdvice.timing.includes('শীঘ্রই')
//                                                 ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-lg'
//                                                 : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg'
//                                         }`}>
//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                 <div className="space-y-4">
//                                                     <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
//                                                         <span className="font-semibold text-gray-700">সেচের অবস্থা:</span>
//                                                         <span className={`font-bold text-lg px-4 py-2 rounded-full ${
//                                                             irrigationAdvice.timing.includes('জরুরি') 
//                                                                 ? 'bg-red-100 text-red-700 border border-red-200' 
//                                                                 : irrigationAdvice.timing.includes('শীঘ্রই')
//                                                                 ? 'bg-orange-100 text-orange-700 border border-orange-200'
//                                                                 : 'bg-green-100 text-green-700 border border-green-200'
//                                                         }`}>
//                                                             {irrigationAdvice.timing}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
//                                                         <span className="font-semibold text-gray-700">পানির পরিমাণ:</span>
//                                                         <span className="font-bold text-blue-600 text-xl">{irrigationAdvice.requiredWater} mm</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="space-y-4">
//                                                     <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
//                                                         <span className="font-semibold text-gray-700">সময়:</span>
//                                                         <span className="font-bold text-purple-600 text-xl">{irrigationAdvice.duration} মিনিট</span>
//                                                     </div>
//                                                     <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
//                                                         <span className="font-semibold text-gray-700">পরবর্তী সেচ:</span>
//                                                         <span className="font-bold text-orange-600 text-xl">{irrigationAdvice.nextIrrigation}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
//                                             <h4 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
//                                                 <span>🕒</span> উপযুক্ত সময়
//                                             </h4>
//                                             <div className="flex items-center justify-center gap-8">
//                                                 <div className="text-center bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100">
//                                                     <div className="text-3xl font-bold text-blue-600 mb-1">সকাল</div>
//                                                     <div className="text-blue-700 font-semibold text-lg">৬-৮টা</div>
//                                                 </div>
//                                                 <div className="text-blue-600 font-bold text-xl">বা</div>
//                                                 <div className="text-center bg-white px-6 py-4 rounded-xl shadow-sm border border-blue-100">
//                                                     <div className="text-3xl font-bold text-blue-600 mb-1">বিকাল</div>
//                                                     <div className="text-blue-700 font-semibold text-lg">৫-৭টা</div>
//                                                 </div>
//                                             </div>
//                                             <p className="text-blue-700 text-center mt-4 font-medium">
//                                                 💡 বাতাস কম থাকা অবস্থায় সেচ দিন
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
//                                         <div className="text-6xl mb-4">🌱</div>
//                                         <p className="text-gray-600 text-lg font-medium">সেচ পরামর্শের জন্য ফার্মের তথ্য প্রয়োজন</p>
//                                         <p className="text-gray-500 mt-2 mb-4">নিম্নলিখিত তথ্য যোগ করুন:</p>
//                                         <ul className="text-gray-600 space-y-2 text-left max-w-md mx-auto">
//                                             <li className="flex items-center gap-2">
//                                                 <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//                                                 ফসলের ধরন
//                                             </li>
//                                             <li className="flex items-center gap-2">
//                                                 <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//                                                 ফার্মের আকার (একর/বিঘা)
//                                             </li>
//                                             <li className="flex items-center gap-2">
//                                                 <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//                                                 মাটির ধরন
//                                             </li>
//                                         </ul>
//                                         <button 
//                                             onClick={() => window.location.href = `/farms/${selectedFarm?.id}/edit`}
//                                             className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg font-medium"
//                                         >
//                                             ফার্ম আপডেট করুন
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Grid of Additional Cards */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                 {/* Crop Growth Progress */}
//                                 {plantingInfo && (
//                                     <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100 hover:shadow-2xl transition-all duration-300">
//                                         <div className="flex items-center gap-3 mb-6">
//                                             <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
//                                                 <span className="text-lg">📈</span>
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-800">ফসলের অগ্রগতি</h2>
//                                         </div>
                                        
//                                         <div className="space-y-6">
//                                             <div>
//                                                 <div className="flex justify-between mb-3">
//                                                     <span className="text-sm font-semibold text-gray-700">বৃদ্ধির পর্যায়</span>
//                                                     <span className="text-lg font-bold text-emerald-600">{Math.round(plantingInfo.stageProgress)}%</span>
//                                                 </div>
//                                                 <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
//                                                     <div 
//                                                         className="bg-gradient-to-r from-emerald-400 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-md"
//                                                         style={{ width: `${plantingInfo.stageProgress}%` }}
//                                                     ></div>
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="space-y-4">
//                                                 <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
//                                                     <span className="font-medium text-emerald-700">রোপণের তারিখ:</span>
//                                                     <span className="font-semibold text-emerald-900">{plantingInfo.plantingDate}</span>
//                                                 </div>
//                                                 <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
//                                                     <span className="font-medium text-blue-700">রোপণের পর দিন:</span>
//                                                     <span className="font-semibold text-blue-900">{plantingInfo.daysSincePlanting} দিন</span>
//                                                 </div>
//                                                 <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
//                                                     <span className="font-medium text-purple-700">বর্তমান পর্যায়:</span>
//                                                     <span className="font-semibold text-purple-900">{plantingInfo.growthStage}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Water Efficiency */}
//                                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100 hover:shadow-2xl transition-all duration-300">
//                                     <div className="flex items-center gap-3 mb-6">
//                                         <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                                             <span className="text-lg">💎</span>
//                                         </div>
//                                         <h2 className="text-xl font-bold text-gray-800">পানি দক্ষতা</h2>
//                                     </div>
//                                     <div className="space-y-4">
//                                         <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span className="font-semibold text-indigo-700">দক্ষতা রেটিং:</span>
//                                                 <span className="font-bold text-indigo-900 text-lg">{irrigationAdvice.efficiency}</span>
//                                             </div>
//                                             <p className="text-indigo-700 text-sm">
//                                                 {irrigationAdvice.efficiency === 'উচ্চ' 
//                                                     ? 'আপনার মাটি পানির ভাল দক্ষতা রাখে'
//                                                     : irrigationAdvice.efficiency === 'ভাল'
//                                                     ? 'মধ্যম দক্ষতা, নিয়মিত মনিটরিং করুন'
//                                                     : 'নিম্ন দক্ষতা, ঘন ঘন সেচ প্রয়োজন'}
//                                             </p>
//                                         </div>
//                                         <div className="p-4 bg-green-50 rounded-xl border border-green-200">
//                                             <h4 className="font-semibold text-green-800 mb-2">পানি সাশ্রয় টিপস</h4>
//                                             <ul className="text-green-700 space-y-2 text-sm">
//                                                 <li className="flex items-center gap-2">
//                                                     <span>💧</span>
//                                                     সকাল বা বিকালে সেচ দিন
//                                                 </li>
//                                                 <li className="flex items-center gap-2">
//                                                     <span>🌿</span>
//                                                     মালচিং ব্যবহার করুন
//                                                 </li>
//                                                 <li className="flex items-center gap-2">
//                                                     <span>🔄</span>
//                                                     ড্রিপ ইরিগেশন ব্যবহার করুন
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Crop Details */}
//                                 {selectedFarm?.cropDetails?.type && cropsData[selectedFarm.cropDetails.type] && (
//                                     <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-amber-100 hover:shadow-2xl transition-all duration-300">
//                                         <div className="flex items-center gap-3 mb-6">
//                                             <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                                                 <span className="text-lg">📝</span>
//                                             </div>
//                                             <h2 className="text-xl font-bold text-gray-800">
//                                                 {selectedFarm.cropDetails.type} এর সেচ নির্দেশিকা
//                                             </h2>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                             <div className="space-y-4">
//                                                 <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
//                                                     <div className="flex justify-between items-center mb-2">
//                                                         <span className="font-semibold text-blue-700">পানির প্রয়োজন:</span>
//                                                         <span className="font-bold text-blue-900 text-lg">{getWaterRequirement()} mm/সপ্তাহ</span>
//                                                     </div>
//                                                     <div className="flex justify-between items-center">
//                                                         <span className="font-semibold text-blue-700">সেচের ফ্রিকোয়েন্সি:</span>
//                                                         <span className="font-bold text-blue-900">{cropsData[selectedFarm.cropDetails.type].frequency}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="p-4 bg-green-50 rounded-xl border border-green-200">
//                                                     <h4 className="font-semibold text-green-800 mb-2">সেচ পদ্ধতি</h4>
//                                                     <p className="text-green-700">{cropsData[selectedFarm.cropDetails.type].method}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="space-y-4">
//                                                 <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
//                                                     <h4 className="font-semibold text-amber-800 mb-2">সমালোচনামূলক পর্যায়</h4>
//                                                     <ul className="text-amber-700 space-y-2">
//                                                         {cropsData[selectedFarm.cropDetails.type].criticalStages.map((stage, index) => (
//                                                             <li key={index} className="flex items-center gap-2">
//                                                                 <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
//                                                                 {stage}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Weekly Schedule */}
//                 {selectedFarm?.cropDetails?.type && cropsData[selectedFarm.cropDetails.type] && irrigationAdvice.hasCompleteData && (
//                     <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-green-100">
//                         <div className="flex items-center gap-3 mb-8">
//                             <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                                 <span className="text-2xl">🗓️</span>
//                             </div>
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-800">
//                                     {selectedFarm.cropDetails.type} এর সাপ্তাহিক সেচ শিডিউল
//                                 </h2>
//                                 <p className="text-gray-600">সপ্তাহের সেরা সময়ে সেচ দিন</p>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
//                             {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'].map((day, index) => (
//                                 <div key={day} className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
//                                     index === 0 || index === 4 
//                                         ? 'bg-gradient-to-b from-green-100 to-emerald-100 border-green-300 shadow-lg transform hover:-translate-y-1' 
//                                         : 'bg-gray-50 border-gray-200'
//                                 }`}>
//                                     <div className={`font-bold text-lg mb-2 ${
//                                         index === 0 || index === 4 ? 'text-green-700' : 'text-gray-600'
//                                     }`}>
//                                         {day}
//                                     </div>
//                                     <div className={`text-sm font-semibold ${
//                                         index === 0 || index === 4 ? 'text-green-600' : 'text-gray-500'
//                                     }`}>
//                                         {index === 0 || index === 4 ? 'সেচ দিন' : 'বিশ্রাম'}
//                                     </div>
//                                     {index === 0 || index === 4 && (
//                                         <div className="text-xs text-blue-600 mt-2 font-medium bg-blue-100 px-2 py-1 rounded-full">
//                                             ৬-৮ AM
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Irrigation;