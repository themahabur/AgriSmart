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
//     const [selectedCrop, setSelectedCrop] = useState('');

//     const [weatherData, setWeatherData] = useState({
//         temperature: 32,
//         humidity: 65,
//         rainProbability: 30,
//         soilMoisture: 45,
//         windSpeed: 12,
//         lastRain: '২ দিন আগে'
//     });

//     const [soilType, setSoilType] = useState('দোআঁশ');
//     const [area, setArea] = useState(1);

//     const cropsData = {
//         'ধান': {
//             waterRequirement: 25,
//             frequency: '৩-৪ দিন পর পর',
//             method: 'জমিতে ২-৩ ইঞ্চি পানি রাখুন',
//             criticalStages: ['বীজ বপনের ২৫-৩০ দিন', 'ফুল আসার সময়', 'দানা গঠনের সময়']
//         },
//         'গম': {
//             waterRequirement: 18,
//             frequency: '৭-১০ দিন পর পর',
//             method: 'হালকা থেকে মাঝারি সেচ',
//             criticalStages: ['বপনের ২০-২৫ দিন পর', 'কাইচ থোর আসার সময়', 'দানা গঠনের সময়']
//         },
//         'আলু': {
//             waterRequirement: 22,
//             frequency: '৫-৭ দিন পর পর',
//             method: 'ফুরো পদ্ধতিতে সেচ',
//             criticalStages: ['গাছ ১৫-২০ সেমি হলে', 'কন্দ গঠনের সময়', 'কন্দ বড় হওয়ার সময়']
//         },
//         'পাট': {
//             waterRequirement: 28,
//             frequency: '৪-৬ দিন পর পর',
//             method: 'জমিতে হালকা পানি রাখুন',
//             criticalStages: ['বপনের ৩০-৩৫ দিন পর', 'দ্রুত বাড়ন্ত অবস্থায়']
//         },
//         'ভুট্টা': {
//             waterRequirement: 20,
//             frequency: '৬-৮ দিন পর পর',
//             method: 'ফুরো বা স্প্রিংকলার পদ্ধতি',
//             criticalStages: ['বপনের ২০-২৫ দিন পর', 'ফুল আসার সময়', 'দানা গঠনের সময়']
//         },
//         'টমেটো': {
//             waterRequirement: 24,
//             frequency: '৪-৫ দিন পর পর',
//             method: 'ড্রিপ ইরিগেশন',
//             criticalStages: ['চারা রোপণের পর', 'ফুল আসার সময়', 'ফল ধারণের সময়']
//         }
//     };

//     const soilWaterCapacity = {
//         'বেলে': 15,
//         'দোআঁশ': 25,
//         'এটেল': 35
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
//                 console.log('Farms data:', data); // Debug log
                
//                 // Access the farms array from the correct path
//                 const farmsData = data.data?.farms || [];
//                 setFarms(farmsData);
                
//                 // Auto-select first farm and its crop if available
//                 if (farmsData.length > 0) {
//                     const firstFarm = farmsData[0];
//                     setSelectedFarm(firstFarm);
                    
//                     // Get crop from cropDetails.type
//                     const farmCrop = firstFarm.cropDetails?.type || '';
//                     setSelectedCrop(farmCrop);
                    
//                     setArea(firstFarm.sizeAcre || 1);
//                     setSoilType(firstFarm.soilDetails?.type || 'দোআঁশ');
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

//     // Get unique crops from all farms
//     const getAllUserCrops = () => {
//         const allCrops = new Set();
//         farms.forEach(farm => {
//             if (farm.cropDetails?.type) {
//                 allCrops.add(farm.cropDetails.type);
//             }
//         });
//         return Array.from(allCrops);
//     };

//     const calculateIrrigation = () => {
//         if (!selectedCrop || !cropsData[selectedCrop]) {
//             return {
//                 requiredWater: 0,
//                 timing: 'ফসল নির্বাচন করুন',
//                 duration: 0,
//                 nextIrrigation: 'নির্ধারণ করুন'
//             };
//         }

//         const crop = cropsData[selectedCrop];
//         const soilCapacity = soilWaterCapacity[soilType] || 25;
//         const currentMoisture = weatherData.soilMoisture;
//         const waterDeficit = soilCapacity - currentMoisture;
        
//         // Calculate next irrigation date based on last irrigation
//         let nextIrrigation = 'আজ';
//         if (selectedFarm?.irrigation?.lastDate) {
//             const lastDate = new Date(selectedFarm.irrigation.lastDate);
//             const nextDate = new Date(lastDate);
//             nextDate.setDate(nextDate.getDate() + 4); // Default 4 days later
//             nextIrrigation = nextDate.toLocaleDateString('bn-BD');
//         }
        
//         return {
//             requiredWater: Math.max(crop.waterRequirement, waterDeficit),
//             timing: currentMoisture < 30 ? 'জরুরি সেচ প্রয়োজন' : 'নিয়মিত সেচ',
//             duration: Math.round((area * crop.waterRequirement * 60) / 10),
//             nextIrrigation: nextIrrigation
//         };
//     };

//     const irrigationAdvice = calculateIrrigation();
//     const userCrops = getAllUserCrops();

//     // Get planting info for selected farm
//     const getPlantingInfo = () => {
//         if (!selectedFarm?.cropDetails?.plantingDate) return null;
        
//         const plantingDate = new Date(selectedFarm.cropDetails.plantingDate);
//         const today = new Date();
//         const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
        
//         return {
//             plantingDate: plantingDate.toLocaleDateString('bn-BD'),
//             daysSincePlanting: daysSincePlanting,
//             growthStage: daysSincePlanting < 30 ? 'প্রারম্ভিক পর্যায়' : 
//                         daysSincePlanting < 60 ? 'বর্ধনশীল পর্যায়' : 'পরিপক্ব পর্যায়'
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
//                         className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
//                     >
//                         আবার চেষ্টা করুন
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 p-4">
//             <div className="max-w-6xl mx-auto">
                
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
//                         🚜 স্মার্ট সেচ ব্যবস্থাপনা
//                     </h1>
//                     <p className="text-gray-600">আপনার ফসলের জন্য সঠিক সময়ে সঠিক পরিমাণ সেচ</p>
//                 </div>

//                 {farms.length === 0 ? (
//                     <div className="text-center bg-white rounded-xl shadow-lg p-8">
//                         <div className="text-6xl mb-4">🌾</div>
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-4">কোন ফার্ম পাওয়া যায়নি</h2>
//                         <p className="text-gray-600 mb-6">সেচ সুপারিশ পেতে প্রথমে একটি ফার্ম তৈরি করুন</p>
//                         <button 
//                             onClick={() => window.location.href = '/farms'}
//                             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                         >
//             ফার্ম তৈরি করুন
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
//                         {/* Left Column */}
//                         <div className="space-y-6">
//                             {/* Farm and Crop Selection */}
//                             <div className="bg-white rounded-xl shadow-lg p-6">
//                                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                                     🌾 আপনার ফার্ম ও ফসল
//                                 </h2>

//                                 {/* Farm Selection */}
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         ফার্ম নির্বাচন করুন
//                                     </label>
//                                     <select 
//                                         value={selectedFarm?.id || ''}
//                                         onChange={(e) => {
//                                             const farm = farms.find(f => f.id === e.target.value);
//                                             setSelectedFarm(farm);
//                                             const farmCrop = farm?.cropDetails?.type || '';
//                                             setSelectedCrop(farmCrop);
//                                             setArea(farm?.sizeAcre || 1);
//                                             setSoilType(farm?.soilDetails?.type || 'দোআঁশ');
//                                         }}
//                                         className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                     >
//                                         {farms.map(farm => (
//                                             <option key={farm.id} value={farm.id}>
//                                                 {farm.name} - {farm.sizeAcre} একর
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Crop Selection */}
//                                 {userCrops.length > 0 ? (
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             ফসল নির্বাচন করুন
//                                         </label>
//                                         <select 
//                                             value={selectedCrop}
//                                             onChange={(e) => setSelectedCrop(e.target.value)}
//                                             className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                         >
//                                             <option value="">ফসল নির্বাচন করুন</option>
//                                             {userCrops.map(crop => (
//                                                 <option key={crop} value={crop}>
//                                                     {crop}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                                         <p className="text-yellow-700">কোন ফসল পাওয়া যায়নি। ফার্মে ফসলের তথ্য যোগ করুন।</p>
//                                     </div>
//                                 )}

//                                 <div className="mt-4 space-y-3">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             মাটির ধরন
//                                         </label>
//                                         <select 
//                                             value={soilType}
//                                             onChange={(e) => setSoilType(e.target.value)}
//                                             className="w-full p-2 border border-gray-300 rounded-lg"
//                                         >
//                                             <option value="বেলে">বেলে মাটি</option>
//                                             <option value="দোআঁশ">দোআঁশ মাটি</option>
//                                             <option value="এটেল">এটেল মাটি</option>
//                                         </select>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             জমির পরিমাণ (একর)
//                                         </label>
//                                         <input 
//                                             type="number" 
//                                             value={area}
//                                             onChange={(e) => setArea(parseFloat(e.target.value))}
//                                             className="w-full p-2 border border-gray-300 rounded-lg"
//                                             min="0.1"
//                                             step="0.1"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Selected Farm Info */}
//                                 {selectedFarm && (
//                                     <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                                         <h4 className="font-semibold text-blue-800 mb-2">বর্তমান ফার্ম তথ্য:</h4>
//                                         <p className="text-blue-700"><strong>নাম:</strong> {selectedFarm.name}</p>
//                                         <p className="text-blue-700"><strong>অবস্থান:</strong> {selectedFarm.location}</p>
//                                         <p className="text-blue-700"><strong>আকার:</strong> {selectedFarm.sizeAcre} একর</p>
//                                         <p className="text-blue-700"><strong>স্ট্যাটাস:</strong> {selectedFarm.status}</p>
//                                         {selectedFarm.cropDetails?.variety && (
//                                             <p className="text-blue-700"><strong>প্রজাতি:</strong> {selectedFarm.cropDetails.variety}</p>
//                                         )}
//                                         {plantingInfo && (
//                                             <p className="text-blue-700"><strong>রোপণের তারিখ:</strong> {plantingInfo.plantingDate}</p>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Weather Info */}
//                             <div className="bg-white rounded-xl shadow-lg p-6">
//                                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                                     📊 বর্তমান অবস্থা
//                                 </h2>
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                                         <span>তাপমাত্রা</span>
//                                         <span className="font-bold text-blue-800">{weatherData.temperature}°C</span>
//                                     </div>
//                                     <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                                         <span>মাটির আর্দ্রতা</span>
//                                         <span className="font-bold text-green-800">{weatherData.soilMoisture}%</span>
//                                     </div>
//                                     <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//                                         <span>বৃষ্টির সম্ভাবনা</span>
//                                         <span className="font-bold text-yellow-800">{weatherData.rainProbability}%</span>
//                                     </div>
//                                     <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//                                         <span>সর্বশেষ বৃষ্টি</span>
//                                         <span className="font-bold text-purple-800">{weatherData.lastRain}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Middle Column */}
//                         <div className="space-y-6">
//                             {/* Irrigation Advice */}
//                             <div className="bg-white rounded-xl shadow-lg p-6">
//                                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                                     💧 আজকের সেচ সুপারিশ
//                                 </h2>
//                                 {selectedCrop && cropsData[selectedCrop] ? (
//                                     <div className="space-y-4">
//                                         <div className={`p-4 rounded-lg ${
//                                             irrigationAdvice.timing.includes('জরুরি') 
//                                                 ? 'bg-red-50 border border-red-200' 
//                                                 : 'bg-green-50 border border-green-200'
//                                         }`}>
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span className="font-semibold">সেচের অবস্থা:</span>
//                                                 <span className={`font-bold ${
//                                                     irrigationAdvice.timing.includes('জরুরি') 
//                                                         ? 'text-red-600' 
//                                                         : 'text-green-600'
//                                                 }`}>
//                                                     {irrigationAdvice.timing}
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span>পানির পরিমাণ:</span>
//                                                 <span className="font-bold text-blue-600">{irrigationAdvice.requiredWater} mm</span>
//                                             </div>
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span>সময়:</span>
//                                                 <span className="font-bold text-purple-600">{irrigationAdvice.duration} মিনিট</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span>পরবর্তী সেচ:</span>
//                                                 <span className="font-bold text-orange-600">{irrigationAdvice.nextIrrigation}</span>
//                                             </div>
//                                         </div>

//                                         <div className="bg-blue-50 p-4 rounded-lg">
//                                             <h4 className="font-semibold text-blue-800 mb-2">🕒 উপযুক্ত সময়</h4>
//                                             <p className="text-blue-700">সকাল ৬-৮টা বা বিকাল ৫-৭টা</p>
//                                         </div>

//                                         {plantingInfo && (
//                                             <div className="bg-purple-50 p-4 rounded-lg">
//                                                 <h4 className="font-semibold text-purple-800 mb-2">🌱 ফসলের পর্যায়</h4>
//                                                 <p className="text-purple-700"><strong>রোপণের তারিখ:</strong> {plantingInfo.plantingDate}</p>
//                                                 <p className="text-purple-700"><strong>রোপণের পর দিন:</strong> {plantingInfo.daysSincePlanting} দিন</p>
//                                                 <p className="text-purple-700"><strong>বর্তমান পর্যায়:</strong> {plantingInfo.growthStage}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className="text-center p-4 bg-gray-100 rounded-lg">
//                                         <p className="text-gray-600">সেচ সুপারিশ দেখতে ফসল নির্বাচন করুন</p>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Crop Details */}
//                             {selectedCrop && cropsData[selectedCrop] && (
//                                 <div className="bg-white rounded-xl shadow-lg p-6">
//                                     <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                                         📝 {selectedCrop} এর সেচ নির্দেশিকা
//                                     </h2>
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span>পানির প্রয়োজন:</span>
//                                             <span className="font-semibold">{cropsData[selectedCrop].waterRequirement} mm/সপ্তাহ</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span>সেচের ফ্রিকোয়েন্সি:</span>
//                                             <span className="font-semibold">{cropsData[selectedCrop].frequency}</span>
//                                         </div>
//                                         <div>
//                                             <span className="font-medium">সেচ পদ্ধতি:</span>
//                                             <p className="text-gray-700 mt-1">{cropsData[selectedCrop].method}</p>
//                                         </div>
//                                         <div>
//                                             <span className="font-medium">সমালোচনামূলক পর্যায়:</span>
//                                             <ul className="list-disc list-inside mt-1 text-gray-700">
//                                                 {cropsData[selectedCrop].criticalStages.map((stage, index) => (
//                                                     <li key={index}>{stage}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Right Column */}
//                         <div className="space-y-6">
//                             {/* জরুরি তথ্য */}
//                             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
//                                 <h2 className="text-xl font-semibold text-yellow-800 mb-3">
//                                     ⚠️ গুরুত্বপূর্ণ নির্দেশনা
//                                 </h2>
//                                 <ul className="space-y-2 text-yellow-700">
//                                     <li>• অতিরিক্ত সেচে ফসলের ক্ষতি হয়</li>
//                                     <li>• মাটির আর্দ্রতা পরীক্ষা করে সেচ দিন</li>
//                                     <li>• বৃষ্টির পূর্বাভাসে সেচ কমিয়ে দিন</li>
//                                     <li>• ড্রিপ ইরিগেশন ব্যবহার করুন</li>
//                                 </ul>
//                             </div>

//                             {/* দ্রুত টিপস */}
//                             <div className="bg-green-50 border border-green-200 rounded-xl p-6">
//                                 <h2 className="text-xl font-semibold text-green-800 mb-3">
//                                     💡 সেচ সংরক্ষণ টিপস
//                                 </h2>
//                                 <ul className="space-y-2 text-green-700">
//                                     <li>• সকাল-বিকাল সেচ দিন</li>
//                                     <li>• মালচিং ব্যবহার করুন</li>
//                                     <li>• ড্রিপ/স্প্রিংকলার ব্যবহার করুন</li>
//                                     <li>• মাটির স্বাস্থ্য উন্নত করুন</li>
//                                 </ul>
//                             </div>

//                             {/* User's All Crops */}
//                             {userCrops.length > 0 && (
//                                 <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
//                                     <h2 className="text-xl font-semibold text-purple-800 mb-3">
//                                         🌱 আপনার সকল ফসল
//                                     </h2>
//                                     <div className="space-y-2">
//                                         {userCrops.map((crop, index) => (
//                                             <div key={index} className={`flex justify-between items-center p-2 rounded ${
//                                                 crop === selectedCrop ? 'bg-white shadow-sm' : 'bg-purple-100'
//                                             }`}>
//                                                 <span className={`font-medium ${crop === selectedCrop ? 'text-green-600' : 'text-purple-700'}`}>
//                                                     {crop}
//                                                 </span>
//                                                 {crop === selectedCrop && (
//                                                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">বর্তমান</span>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Weekly Schedule */}
//                 {selectedCrop && cropsData[selectedCrop] && (
//                     <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                             🗓️ {selectedCrop} এর সাপ্তাহিক সেচ শিডিউল
//                         </h2>
//                         <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
//                             {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'].map((day, index) => (
//                                 <div key={day} className={`text-center p-3 rounded-lg ${
//                                     index === 0 || index === 4 ? 'bg-green-100 border border-green-300' : 'bg-gray-100'
//                                 }`}>
//                                     <div className="font-semibold">{day}</div>
//                                     <div className="text-sm mt-1">
//                                         {index === 0 || index === 4 ? 'সেচ দিন' : 'বিশ্রাম'}
//                                     </div>
//                                     {index === 0 || index === 4 && (
//                                         <div className="text-xs text-blue-600 mt-1">৬-৮ AM</div>
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