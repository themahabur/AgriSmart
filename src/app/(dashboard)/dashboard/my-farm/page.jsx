'use client';
import React, { useState } from 'react';
import {
  FaTractor,
  FaSeedling,
  FaCalendarAlt,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCloudSun,
  FaTint,
  FaLeaf,
  FaTasks,
  FaHistory,
  FaFlask,
  FaRulerCombined,
  FaArrowRight,
  FaInfoCircle,
} from 'react-icons/fa';

const AddFarmModal = ({ isOpen, onClose, onAddFarm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const initialNewFarmState = {
    name: '',
    location: '',
    size: '',
    cropType: '',
    cropVariety: '',
    plantingDate: '',
    soilType: '',
    soilPH: '',
    irrigationSource: '',
    tubeWellDepth: '',
    organicPractices: false,
  };

  const [newFarm, setNewFarm] = useState(initialNewFarmState);

  const steps = [
    { number: 1, title: "সাধারণ তথ্য", icon: "📋" },
    { number: 2, title: "ফসল বিবরণ", icon: "🌱" },
    { number: 3, title: "মাটি ও সেচ", icon: "🌊" },
    { number: 4, title: "পর্যালোচনা", icon: "👁️" }
  ];

  // Handle input changes for new farm
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setNewFarm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div
                  className={`flex-1 h-1 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {currentStep > step.number ? <span className="text-white">✓</span> : <span>{step.icon}</span>}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
            </div>
            <span
              className={`text-xs mt-2 text-center ${
                currentStep >= step.number ? 'text-green-600 font-semibold' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <FaTractor className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">ফার্মের সাধারণ তথ্য</h3>
        <p className="text-gray-600">আপনার ফার্মের মৌলিক তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaTractor className="inline mr-2 text-green-500" />
            ফার্মের নাম *
          </label>
          <input
            type="text"
            name="name"
            value={newFarm.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="যেমন: প্রধান ধানের জমি, সবজি বাগান"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-red-500" />
            অবস্থান *
          </label>
          <input
            type="text"
            name="location"
            value={newFarm.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="গ্রাম/উপজেলা/জেলা"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaRulerCombined className="inline mr-2 text-blue-500" />
            ফার্মের আকার *
          </label>
          <div className="relative">
            <input
              type="number"
              name="size"
              value={newFarm.size}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-16"
              placeholder="2.5"
              min="0.1"
              step="0.1"
              required
            />
            <span className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 font-medium">
              একর
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <FaSeedling className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">ফসলের বিবরণ</h3>
        <p className="text-gray-600">আপনার ফসল সম্পর্কিত তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ফসলের প্রকার *
          </label>
          <select
            name="cropType"
            value={newFarm.cropType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">ফসল নির্বাচন করুন</option>
            <option value="ধান">ধান</option>
            <option value="গম">গম</option>
            <option value="ভুট্টা">ভুট্টা</option>
            <option value="সবজি">সবজি</option>
            <option value="ফল">ফল</option>
            <option value="ডাল">ডাল</option>
            <option value="অন্যান্য">অন্যান্য</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            জাত (Variety)
          </label>
          <input
            type="text"
            name="cropVariety"
            value={newFarm.cropVariety}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="যেমন: BRRI Dhan-29"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaCalendarAlt className="inline mr-2 text-purple-500" />
            রোপণের তারিখ
          </label>
          <input
            type="date"
            name="plantingDate"
            value={newFarm.plantingDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <FaFlask className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">মাটি ও সেচ ব্যবস্থা</h3>
        <p className="text-gray-600">মাটির গুণাগুণ ও সেচের তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            মাটির প্রকার
          </label>
          <select
            name="soilType"
            value={newFarm.soilType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">মাটির ধরন</option>
            <option value="দোআঁশ মাটি">দোআঁশ মাটি</option>
            <option value="এঁটেল মাটি">এঁটেল মাটি</option>
            <option value="বেলে মাটি">বেলে মাটি</option>
            <option value="পডল মাটি">পডল মাটি</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            মাটির pH মান
          </label>
          <input
            type="number"
            name="soilPH"
            value={newFarm.soilPH}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="6.5"
            min="1"
            max="14"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            সেচের উৎস
          </label>
          <select
            name="irrigationSource"
            value={newFarm.irrigationSource}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">সেচের উৎস</option>
            <option value="নলকূপ">নলকূপ</option>
            <option value="বৃষ্টি">বৃষ্টি</option>
            <option value="খাল">খাল</option>
            <option value="নদী">নদী</option>
            <option value="পুকুর">পুকুর</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            নলকূপের গভীরতা
          </label>
          <div className="relative">
            <input
              type="number"
              name="tubeWellDepth"
              value={newFarm.tubeWellDepth}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-16"
              placeholder="120"
              min="0"
            />
            <span className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 font-medium">
              ফুট
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer p-3 bg-green-50 rounded-lg border border-green-200">
            <input
              type="checkbox"
              name="organicPractices"
              checked={newFarm.organicPractices}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
            />
            <span className="ml-3">
              <FaLeaf className="inline mr-2 text-green-500" />
              অর্গানিক চাষ পদ্ধতি ব্যবহার করা হচ্ছে
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FaTasks className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">পর্যালোচনা করুন</h3>
        <p className="text-gray-600">আপনার প্রদানকৃত তথ্য পরীক্ষা করুন</p>
      </div>
      {/* ... rest of Step4 remains unchanged ... */}
    </div>
  );

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      onAddFarm(newFarm);
      setNewFarm(initialNewFarmState);
      setCurrentStep(1);
    } else {
      handleNext();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return newFarm.name && newFarm.location && newFarm.size;
      case 2:
        return newFarm.cropType;
      default:
        return true;
    }
  };

  const handleClose = () => {
    setNewFarm(initialNewFarmState);
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 rounded-t-xl border-b border-gray-200">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaPlus className="mr-3 text-green-500" />
              নতুন ফার্ম যুক্ত করুন
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              &times;
            </button>
          </div>
          <div className="px-6 pb-4">
            <ProgressBar />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}

          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={currentStep === 1 ? handleClose : handlePrev}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
            >
              {currentStep === 1 ? 'বাতিল করুন' : 'পিছনে'}
            </button>

            <button
              type="submit"
              disabled={!isStepValid()}
              className={`${
                isStepValid()
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } font-semibold py-3 px-8 rounded-lg transition-colors flex items-center`}
            >
              {currentStep === totalSteps ? (
                <>
                  <FaPlus className="mr-2" />
                  ফার্ম যুক্ত করুন
                </>
              ) : (
                <>
                  পরবর্তী
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---
const MyFarmPage = () => {
  // Initial farm data
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: 'আমার প্রধান ফার্ম',
      location: 'সিলেট, বাংলাদেশ',
      size: '২.৫ একর',
      crop: 'ধান',
      status: 'চলমান',
      lastUpdate: '২ দিন আগে',
      coordinates: { latitude: 24.8917, longitude: 91.8833 },
      cropDetails: { type: 'ধান', variety: 'BRRI Dhan-29', plantingDate: '2025-09-20' },
      soilDetails: { type: 'দোআঁশ মাটি', pH: 6.5, nutrients: 'মাধ্যমিক' },
      irrigation: { source: 'নলকূপ', lastDate: '2025-10-08' },
      pestAlert: false,
    },
    {
      id: 2,
      name: 'আমার বাগান',
      location: 'সিলেট, বাংলাদেশ',
      size: '০.৫ একর',
      crop: 'সবজি',
      status: 'পরিকল্পনাধীন',
      lastUpdate: '৫ দিন আগে',
      coordinates: { latitude: 24.8917, longitude: 91.8833 },
      cropDetails: { type: 'সবজি', variety: 'টমেটো', plantingDate: '2025-10-01' },
      soilDetails: { type: 'এঁটেল মাটি', pH: 7.0, nutrients: 'উচ্চ' },
      irrigation: { source: 'বৃষ্টি', lastDate: '2025-10-05' },
      pestAlert: true,
    },
  ]);

  // Activities data
  const [activities] = useState([
    {
      id: 1,
      title: 'সেচ প্রদান',
      date: '২০২৫-১০-১০',
      status: 'সম্পন্ন',
      priority: 'উচ্চ',
    },
    {
      id: 2,
      title: 'সার প্রয়োগ',
      date: '২০২৫-১০-১২',
      status: 'চলমান',
      priority: 'মাধ্যমিক',
    },
    {
      id: 3,
      title: 'ফসল কাটা',
      date: '২০২৫-১১-১৫',
      status: 'পরবর্তী',
      priority: 'উচ্চ',
    },
  ]);

  const [weatherData] = useState({
    temperature: '২৮°C',
    humidity: '৬৫%',
    condition: 'সূর্যোজ্জ্বল',
    forecast: 'গত ২ দিনের মধ্যে বৃষ্টির সম্ভাবনা নেই',
  });

  const [soilData] = useState({
    pH: '৬.৫',
    moisture: '৬০%',
    nutrients: 'মাধ্যমিক',
  });

  // State for modal
  const [showAddFormModal, setShowAddFormModal] = useState(false);

  // Handle adding a new farm
  const handleAddFarm = (farmData) => {
    const farm = {
      id: farms.length + 1,
      name: farmData.name,
      location: farmData.location,
      size: farmData.size + ' একর',
      crop: farmData.cropType,
      status: 'পরিকল্পনাধীন',
      lastUpdate: 'এই মুহূর্তে',
      coordinates: { latitude: 0, longitude: 0 },
      cropDetails: { 
        type: farmData.cropType, 
        variety: farmData.cropVariety, 
        plantingDate: farmData.plantingDate 
      },
      soilDetails: { 
        type: farmData.soilType, 
        pH: parseFloat(farmData.soilPH) || 0, 
        nutrients: 'অজানা' 
      },
      irrigation: { 
        source: farmData.irrigationSource, 
        lastDate: 'আজ' 
      },
      pestAlert: false,
      organicPractices: farmData.organicPractices
    };
    setFarms([...farms, farm]);
  };

  // Handle deleting a farm
  const handleDeleteFarm = id => {
    setFarms(farms.filter(farm => farm.id !== id));
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

      {/* Multi-step Modal */}
      <AddFarmModal
        isOpen={showAddFormModal}
        onClose={() => setShowAddFormModal(false)}
        onAddFarm={handleAddFarm}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Farms List & Info Cards */}
        <div className="lg:col-span-2">
          {/* Weather & Soil Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Weather Card */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCloudSun className="text-blue-600 mr-2" />
                আবহাওয়া
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {weatherData.temperature}
                  </p>
                  <p className="text-gray-600">{weatherData.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">
                    <FaTint className="inline mr-1 text-blue-500" />
                    {weatherData.humidity}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {weatherData.forecast}
                  </p>
                </div>
              </div>
            </div>

            {/* Soil Health Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="text-green-600 mr-2" />
                মাটির স্বাস্থ্য
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">পিএইচ মান</span>
                  <span className="font-semibold">{soilData.pH}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">আর্দ্রতা</span>
                  <span className="font-semibold">{soilData.moisture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">পুষ্টি মাত্রা</span>
                  <span className="font-semibold">{soilData.nutrients}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Farms List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTractor className="text-green-600 mr-2" />
                আমার ফার্মসমূহ
              </h2>
            </div>
            <div className="p-4">
              {farms.length === 0 ? (
                <div className="text-center py-8">
                  <FaTractor className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    এখনও কোন ফার্ম যুক্ত করা হয়নি
                  </p>
                  <button
                    onClick={() => setShowAddFormModal(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    প্রথম ফার্ম যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {farms.map(farm => (
                    <div
                      key={farm.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {farm.name}
                          </h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1 text-red-500" />
                            {farm.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              <FaRulerCombined className="inline mr-1" />
                              {farm.size}
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              <FaSeedling className="inline mr-1" />
                              {farm.crop}
                            </span>
                            <span
                              className={`${
                                farm.status === 'চলমান'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              } text-xs font-medium px-2.5 py-0.5 rounded`}
                            >
                              {farm.status}
                            </span>
                            {farm.pestAlert && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                সতর্কতা
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            title="সম্পাদনা করুন"
                            className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="মুছে ফেলুন"
                            onClick={() => handleDeleteFarm(farm.id)}
                            className="text-red-600 hover:text-red-800 p-2 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        শেষ আপডেট: {farm.lastUpdate}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Activities & Quick Actions */}
        <div className="lg:col-span-1">
          {/* Upcoming Activities */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6 shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTasks className="text-green-600 mr-2" />
                পরবর্তী কাজসমূহ 📝
              </h2>
            </div>
            <div className="p-4">
              {activities.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোন নির্ধারিত কাজ নেই
                </p>
              ) : (
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div
                      key={activity.id}
                      className="border-l-4 border-green-500 pl-4 py-1 bg-gray-50 rounded-md"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {activity.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            activity.priority === 'উচ্চ'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {activity.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        <FaCalendarAlt className="inline mr-1" />{' '}
                        {activity.date}
                      </p>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                          activity.status === 'সম্পন্ন'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'চলমান'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaHistory className="text-green-600 mr-2" />
                দ্রুত কাজ
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors border border-gray-100 hover:border-green-300">
                  <FaSeedling className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    ফসল উপদেশ
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors border border-gray-100 hover:border-green-300">
                  <FaCalendarAlt className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    কৃষি ক্যালেন্ডার
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors border border-gray-100 hover:border-green-300">
                  <FaChartLine className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    বাজার দাম
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors border border-gray-100 hover:border-green-300">
                  <FaCloudSun className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    আবহাওয়া
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFarmPage;
