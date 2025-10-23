"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaTractor,
  FaSeedling,
  FaPlus,
  FaEdit,
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

const Step1Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <FaTractor className="text-5xl text-emerald-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-900">
          ফার্মের সাধারণ তথ্য
        </h3>
        <p className="text-gray-500 text-sm mt-1">আপনার ফার্মের মৌলিক তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaTractor className="inline mr-2 text-emerald-600" />
            ফার্মের নাম *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
            placeholder="যেমন: প্রধান ধানের জমি, সবজি বাগান"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-rose-500" />
            অবস্থান *
          </label>
          <input
            type="text"
            value={formData.location || ""}
            onChange={(e) => onFieldChange("location", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
            placeholder="গ্রাম/উপজেলা/জেলা"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaRulerCombined className="inline mr-2 text-indigo-500" />
            ফার্মের আকার *
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.size || ""}
              onChange={(e) => onFieldChange("size", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-16 transition-all duration-300 ease-in-out hover:shadow-md"
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
});

const Step2Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <FaSeedling className="text-5xl text-emerald-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-900">ফসলের বিবরণ</h3>
        <p className="text-gray-500 text-sm mt-1">আপনার ফসল সম্পর্কিত তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ফসলের প্রকার *
          </label>
          <input
            type="text"
            value={formData.cropType || ""}
            onChange={(e) => onFieldChange("cropType", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
            placeholder="যেমন: ধান, গম, পটল, পিয়াজ..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            জাত (Variety)
          </label>
          <input
            type="text"
            value={formData.cropVariety || ""}
            onChange={(e) => onFieldChange("cropVariety", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
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
            value={formData.plantingDate || ""}
            onChange={(e) => onFieldChange("plantingDate", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
          />
        </div>
      </div>
    </div>
  );
});

const Step3Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <FaFlask className="text-5xl text-emerald-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-900">মাটি ও সেচ ব্যবস্থা</h3>
        <p className="text-gray-500 text-sm mt-1">মাটির গুণাগুণ ও সেচের তথ্য প্রদান করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            মাটির প্রকার
          </label>
          <select
            value={formData.soilType || ""}
            onChange={(e) => onFieldChange("soilType", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
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
            value={formData.soilPH || ""}
            onChange={(e) => onFieldChange("soilPH", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
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
            value={formData.irrigationSource || ""}
            onChange={(e) => onFieldChange("irrigationSource", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out hover:shadow-md"
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
              value={formData.tubeWellDepth || ""}
              onChange={(e) => onFieldChange("tubeWellDepth", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-16 transition-all duration-300 ease-in-out hover:shadow-md"
              placeholder="120"
              min="0"
            />
            <span className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 font-medium">
              ফুট
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors duration-300">
            <input
              type="checkbox"
              checked={formData.organicPractices || false}
              onChange={(e) => onFieldChange("organicPractices", e.target.checked)}
              className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <span className="ml-3">
              <FaLeaf className="inline mr-2 text-emerald-600" />
              অর্গানিক চাষ পদ্ধতি ব্যবহার করা হচ্ছে
            </span>
          </label>
        </div>
      </div>
    </div>
  );
});

const Step4Review = React.memo(({ formData, editingFarm, showAllData, onToggleShowAllData }) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <FaTasks className="text-5xl text-emerald-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-900">পর্যালোচনা করুন</h3>
        <p className="text-gray-500 text-sm mt-1">আপনার প্রদানকৃত তথ্য পরীক্ষা করুন</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">সাধারণ তথ্য</h4>
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">নাম:</span> {formData.name}</p>
              <p><span className="font-medium">অবস্থান:</span> {formData.location}</p>
              <p><span className="font-medium">আকার:</span> {formData.size} একর</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">ফসল বিবরণ</h4>
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">প্রকার:</span> {formData.cropType}</p>
              <p><span className="font-medium">জাত:</span> {formData.cropVariety || "নির্ধারিত নয়"}</p>
              <p><span className="font-medium">রোপণ তারিখ:</span> {formData.plantingDate || "নির্ধারিত নয়"}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">মাটির তথ্য</h4>
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">প্রকার:</span> {formData.soilType || "নির্ধারিত নয়"}</p>
              <p><span className="font-medium">pH মান:</span> {formData.soilPH || "নির্ধারিত নয়"}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">সেচ ব্যবস্থা</h4>
            <div className="space-y-3 text-sm">
              <p><span className="font-medium">উৎস:</span> {formData.irrigationSource || "নির্ধারিত নয়"}</p>
              <p><span className="font-medium">নলকূপ গভীরতা:</span> {formData.tubeWellDepth ? `${formData.tubeWellDepth} ফুট` : "প্রযোজ্য নয়"}</p>
              <p><span className="font-medium">অর্গানিক:</span> {formData.organicPractices ? "হ্যাঁ" : "না"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-start">
          <FaInfoCircle className="text-indigo-600 mt-1 mr-3 flex-shrink-0 text-xl" />
          <div>
            <h4 className="font-semibold text-indigo-800 text-lg">মনে রাখুন</h4>
            <p className="text-indigo-700 text-sm mt-1">
              {editingFarm
                ? "ফার্ম আপডেট করার পর আপনি যেকোন সময় এই তথ্য পুনরায় সম্পাদনা করতে পারবেন"
                : "ফার্ম যুক্ত করার পর আপনি যেকোন সময় এই তথ্য সম্পাদনা করতে পারবেন"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          type="button"
          onClick={onToggleShowAllData}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 flex items-center mx-auto shadow-md"
        >
          <FaEye className="mr-2" />
          {showAllData ? "লুকান" : "সব ডেটা দেখুন"}
        </button>
      </div>

      {showAllData && (
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-4 text-center text-xl">সম্পূর্ণ ডেটা</h4>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3 text-lg">সাধারণ তথ্য</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><span className="font-medium">নাম:</span> {formData.name || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">অবস্থান:</span> {formData.location || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">আকার:</span> {formData.size ? `${formData.size} একর` : "নির্ধারিত নয়"}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3 text-lg">ফসল বিবরণ</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><span className="font-medium">প্রকার:</span> {formData.cropType || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">জাত:</span> {formData.cropVariety || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">রোপণ তারিখ:</span> {formData.plantingDate || "নির্ধারিত নয়"}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3 text-lg">মাটি ও সেচ</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><span className="font-medium">মাটির প্রকার:</span> {formData.soilType || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">pH মান:</span> {formData.soilPH || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">সেচের উৎস:</span> {formData.irrigationSource || "নির্ধারিত নয়"}</p>
                <p><span className="font-medium">নলকূপ গভীরতা:</span> {formData.tubeWellDepth ? `${formData.tubeWellDepth} ফুট` : "প্রযোজ্য নয়"}</p>
                <p><span className="font-medium">অর্গানিক চাষ:</span> {formData.organicPractices ? "হ্যাঁ" : "না"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const AddFarmModal = ({
  isOpen,
  onClose,
  onAddFarm,
  onUpdateFarm,
  editingFarm = null
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllData, setShowAllData] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (!isOpen) return;

    if (editingFarm && Object.keys(editingFarm).length > 0) {
      setFormData({
        name: editingFarm.name || "",
        location: editingFarm.location || "",
        size: editingFarm.sizeAcre?.toString() || "",
        cropType: editingFarm.cropDetails?.type || "",
        cropVariety: editingFarm.cropDetails?.variety || "",
        plantingDate: editingFarm.cropDetails?.plantingDate || "",
        soilType: editingFarm.soilDetails?.type || "",
        soilPH: editingFarm.soilDetails?.pH?.toString() || "",
        irrigationSource: editingFarm.irrigation?.source || "",
        tubeWellDepth: editingFarm.irrigation?.tubeWellDepth?.toString() || "",
        organicPractices: editingFarm.organicPractices || false,
      });
    } else {
      setFormData({
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
      });
    }

    setCurrentStep(1);
    setShowAllData(false);
  }, [isOpen, editingFarm]);

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const steps = useMemo(() => [
    { number: 1, title: "সাধারণ তথ্য", icon: "📋" },
    { number: 2, title: "ফসল বিবরণ", icon: "🌱" },
    { number: 3, title: "মাটি ও সেচ", icon: "🌊" },
    { number: 4, title: "পর্যালোচনা", icon: "👁️‍🗨️" },
  ], []);

  const ProgressBar = useMemo(() => () => (
    <div className="mb-10 px-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div
                  className={`flex-1 h-1.5 rounded-full ${currentStep > step.number ? "bg-emerald-500" : "bg-gray-200"} transition-all duration-300`}
                />
              )}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-md ${currentStep >= step.number
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white border-gray-200 text-gray-500"
                } transition-all duration-300`}
              >
                {currentStep > step.number ? (
                  <span className="text-white text-lg">✓</span>
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1.5 rounded-full ${currentStep > step.number ? "bg-emerald-500" : "bg-gray-200"} transition-all duration-300`}
                />
              )}
            </div>
            <span
              className={`text-xs mt-3 text-center font-medium ${currentStep >= step.number
                ? "text-emerald-600"
                : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  ), [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 4) {
      try {
        if (editingFarm) {
          await onUpdateFarm(editingFarm.id || editingFarm._id, formData);
        } else {
          await onAddFarm(formData);
        }
        handleClose();
      } catch (error) {
        console.error("Submit error:", error);
      }
    } else {
      handleNext();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.location && formData.size;
      case 2:
        return formData.cropType;
      default:
        return true;
    }
  };

  const handleClose = () => {
    setFormData({
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
    });
    setCurrentStep(1);
    setShowAllData(false);
    onClose();
  };

  const toggleShowAllData = () => {
    setShowAllData(!showAllData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-gradient-to-r from-emerald-50 to-indigo-50 z-10 rounded-t-2xl border-b border-gray-200">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              {editingFarm ? (
                <>
                  <FaEdit className="mr-3 text-indigo-600" />
                  ফার্ম সম্পাদনা করুন
                </>
              ) : (
                <>
                  <FaPlus className="mr-3 text-emerald-600" />
                  নতুন ফার্ম যুক্ত করুন
                </>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-900 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              ×
            </button>
          </div>

          <div className="px-6 pb-4">
            <ProgressBar />
          </div>
        </div>

        <div className="p-6">
          {currentStep === 1 && <Step1Form formData={formData} onFieldChange={handleFieldChange} />}
          {currentStep === 2 && <Step2Form formData={formData} onFieldChange={handleFieldChange} />}
          {currentStep === 3 && <Step3Form formData={formData} onFieldChange={handleFieldChange} />}
          {currentStep === 4 && <Step4Review 
            formData={formData} 
            editingFarm={editingFarm} 
            showAllData={showAllData} 
            onToggleShowAllData={toggleShowAllData} 
          />}

          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={currentStep === 1 ? handleClose : handlePrev}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-xl transition-colors duration-300 flex items-center shadow-sm hover:shadow-md"
            >
              {currentStep === 1 ? "বাতিল করুন" : "পিছনে"}
            </button>

            <button
              type="submit"
              disabled={!isStepValid()}
              onClick={handleSubmit}
              className={`${isStepValid()
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } font-semibold py-3 px-8 rounded-xl transition-colors duration-300 flex items-center shadow-md hover:shadow-lg`}
            >
              {currentStep === 4 ? (
                <>
                  {editingFarm ? (
                    <>
                      <FaEdit className="mr-2" />
                      আপডেট করুন
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" />
                      ফার্ম যুক্ত করুন
                    </>
                  )}
                </>
              ) : (
                <>
                  পরবর্তী
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFarmModal;