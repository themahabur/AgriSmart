"use client";
import React, { useState, useCallback } from "react";
import {
  FaTractor,
  FaSeedling,
  FaPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFlask,
  FaRulerCombined,
  FaArrowRight,
  FaInfoCircle,
  FaLeaf,
  FaTasks,
  FaEye,
} from "react-icons/fa";

const AddFarmModal = ({ isOpen, onClose, onAddFarm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllData, setShowAllData] = useState(false);
  const totalSteps = 4;

  const initialNewFarmState = {
    name: "",
    location: "",
    size: "",
    cropType: "",
    cropVariety: "",
    plantingDate: "",
    soilType: "",
    soilPH: "",
    irrigationSource: "",
    tubeWellDepth: "",
    organicPractices: false,
  };

  const [newFarm, setNewFarm] = useState(initialNewFarmState);

  const steps = [
    { number: 1, title: "সাধারণ তথ্য", icon: "📋" },
    { number: 2, title: "ফসল বিবরণ", icon: "🌱" },
    { number: 3, title: "মাটি ও সেচ", icon: "🌊" },
    { number: 4, title: "পর্যালোচনা", icon: "👁️" },
  ];

  // Handle input changes for new farm (use useCallback to prevent re-renders)
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setNewFarm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);
// console.log(newFarm);
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {/* Connecting Line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-1 ${
                    currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {currentStep > step.number ? (
                  <span className="text-white">✓</span>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
            <span
              className={`text-xs mt-2 text-center ${
                currentStep >= step.number
                  ? "text-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 1: Basic Information
  const Step1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <FaTractor className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          ফার্মের সাধারণ তথ্য
        </h3>
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

  // Step 2: Crop Details
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

  // Step 3: Soil & Irrigation
  const Step3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <FaFlask className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          মাটি ও সেচ ব্যবস্থা
        </h3>
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

  // Step 4: Review
  const Step4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FaTasks className="text-4xl text-green-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">পর্যালোচনা করুন</h3>
        <p className="text-gray-600">আপনার প্রদানকৃত তথ্য পরীক্ষা করুন</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">সাধারণ তথ্য</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">নাম:</span> {newFarm.name}
              </p>
              <p>
                <span className="font-medium">অবস্থান:</span> {newFarm.location}
              </p>
              <p>
                <span className="font-medium">আকার:</span> {newFarm.size} একর
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">ফসল বিবরণ</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">প্রকার:</span> {newFarm.cropType}
              </p>
              <p>
                <span className="font-medium">জাত:</span>{" "}
                {newFarm.cropVariety || "নির্ধারিত নয়"}
              </p>
              <p>
                <span className="font-medium">রোপণ তারিখ:</span>{" "}
                {newFarm.plantingDate || "নির্ধারিত নয়"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">মাটির তথ্য</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">প্রকার:</span>{" "}
                {newFarm.soilType || "নির্ধারিত নয়"}
              </p>
              <p>
                <span className="font-medium">pH মান:</span>{" "}
                {newFarm.soilPH || "নির্ধারিত নয়"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">সেচ ব্যবস্থা</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">উৎস:</span>{" "}
                {newFarm.irrigationSource || "নির্ধারিত নয়"}
              </p>
              <p>
                <span className="font-medium">নলকূপ গভীরতা:</span>{" "}
                {newFarm.tubeWellDepth
                  ? `${newFarm.tubeWellDepth} ফুট`
                  : "প্রযোজ্য নয়"}
              </p>
              <p>
                <span className="font-medium">অর্গানিক:</span>{" "}
                {newFarm.organicPractices ? "হ্যাঁ" : "না"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800">মনে রাখুন</h4>
            <p className="text-blue-700 text-sm mt-1">
              ফার্ম যুক্ত করার পর আপনি যেকোন সময় এই তথ্য সম্পাদনা করতে পারবেন
              এবং আরও বিস্তারিত তথ্য যোগ করতে পারবেন।
            </p>
          </div>
        </div>
      </div>

      {/* Show All Data Button */}
      <div className="text-center mb-4">
        <button
          type="button"
          onClick={() => setShowAllData(!showAllData)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center mx-auto"
        >
          <FaEye className="mr-2" />
          {showAllData ? "লুকান" : "সব ডেটা দেখুন"}
        </button>
      </div>

      {/* All Data Display */}
      {showAllData && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4">
          <h4 className="font-bold text-gray-800 mb-4 text-center">
            সম্পূর্ণ ডেটা
          </h4>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-700 mb-2">সাধারণ তথ্য</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium">নাম:</span>{" "}
                  {newFarm.name || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">অবস্থান:</span>{" "}
                  {newFarm.location || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">আকার:</span>{" "}
                  {newFarm.size ? `${newFarm.size} একর` : "নির্ধারিত নয়"}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-700 mb-2">ফসল বিবরণ</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium">প্রকার:</span>{" "}
                  {newFarm.cropType || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">জাত:</span>{" "}
                  {newFarm.cropVariety || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">রোপণ তারিখ:</span>{" "}
                  {newFarm.plantingDate || "নির্ধারিত নয়"}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold text-gray-700 mb-2">মাটি ও সেচ</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium">মাটির প্রকার:</span>{" "}
                  {newFarm.soilType || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">pH মান:</span>{" "}
                  {newFarm.soilPH || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">সেচের উৎস:</span>{" "}
                  {newFarm.irrigationSource || "নির্ধারিত নয়"}
                </p>
                <p>
                  <span className="font-medium">নলকূপ গভীরতা:</span>{" "}
                  {newFarm.tubeWellDepth
                    ? `${newFarm.tubeWellDepth} ফুট`
                    : "প্রযোজ্য নয়"}
                </p>
                <p>
                  <span className="font-medium">অর্গানিক চাষ:</span>{" "}
                  {newFarm.organicPractices ? "হ্যাঁ" : "না"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
              {currentStep === 1 ? "বাতিল করুন" : "পিছনে"}
            </button>

            <button
              type="submit"
              disabled={!isStepValid()}
              className={`${
                isStepValid()
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
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

export default AddFarmModal;
