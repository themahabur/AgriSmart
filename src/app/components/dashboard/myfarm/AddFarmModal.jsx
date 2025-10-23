"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";

const Step1Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          ফার্মের সাধারণ তথ্য
        </h3>
        <p className="text-gray-600 text-sm mt-1">মৌলিক তথ্য প্রদান করুন</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ফার্মের নাম *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="ফার্মের নাম লিখুন"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            অবস্থান *
          </label>
          <input
            type="text"
            value={formData.location || ""}
            onChange={(e) => onFieldChange("location", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="গ্রাম/উপজেলা/জেলা"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ফার্মের আকার *
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.size || ""}
              onChange={(e) => onFieldChange("size", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="আকার"
              min="0.1"
              step="0.1"
              required
            />
            <select
              value={formData.sizeUnit || "একর"}
              onChange={(e) => onFieldChange("sizeUnit", e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="একর">একর</option>
              <option value="বিঘা">বিঘা</option>
              <option value="হেক্টর">হেক্টর</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});

const Step2Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">ফসলের বিবরণ</h3>
        <p className="text-gray-600 text-sm mt-1">
          ফসল সম্পর্কিত তথ্য প্রদান করুন
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ফসলের প্রকার *
          </label>
          <input
            type="text"
            value={formData.cropType || ""}
            onChange={(e) => onFieldChange("cropType", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="ধান, গম, আলু ইত্যাদি"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            জাত (Variety)
          </label>
          <input
            type="text"
            value={formData.cropVariety || ""}
            onChange={(e) => onFieldChange("cropVariety", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="BRRI Dhan-29, BARI Alu-41"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            রোপণের তারিখ
          </label>
          <input
            type="date"
            value={formData.plantingDate || ""}
            onChange={(e) => onFieldChange("plantingDate", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>
    </div>
  );
});

const Step3Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          মাটি ও সেচ ব্যবস্থা
        </h3>
        <p className="text-gray-600 text-sm mt-1">মাটির গুণাগুণ ও সেচের তথ্য</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            মাটির প্রকার
          </label>
          <select
            value={formData.soilType || ""}
            onChange={(e) => onFieldChange("soilType", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">মাটির ধরন নির্বাচন করুন</option>
            <option value="দোআঁশ মাটি">দোআঁশ মাটি</option>
            <option value="এঁটেল মাটি">এঁটেল মাটি</option>
            <option value="বেলে মাটি">বেলে মাটি</option>
            <option value="পডল মাটি">পডল মাটি</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            মাটির pH মান
          </label>
          <input
            type="number"
            value={formData.soilPH || ""}
            onChange={(e) => onFieldChange("soilPH", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="6.5"
            min="1"
            max="14"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            সেচের উৎস
          </label>
          <select
            value={formData.irrigationSource || ""}
            onChange={(e) => onFieldChange("irrigationSource", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">সেচের উৎস নির্বাচন করুন</option>
            <option value="নলকূপ">নলকূপ</option>
            <option value="বৃষ্টি">বৃষ্টি</option>
            <option value="খাল">খাল</option>
            <option value="নদী">নদী</option>
            <option value="পুকুর">পুকুর</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            নলকূপের গভীরতা (ফুট)
          </label>
          <input
            type="number"
            value={formData.tubeWellDepth || ""}
            onChange={(e) => onFieldChange("tubeWellDepth", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="120"
            min="0"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.organicPractices || false}
            onChange={(e) =>
              onFieldChange("organicPractices", e.target.checked)
            }
            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            অর্গানিক চাষ পদ্ধতি ব্যবহার করা হচ্ছে
          </label>
        </div>
      </div>
    </div>
  );
});

const Step4Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">প্লট তথ্য</h3>
        <p className="text-gray-600 text-sm mt-1">
          প্লট সম্পর্কিত তথ্য যোগ করুন
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            প্লটের নাম
          </label>
          <input
            type="text"
            value={formData.plotName || ""}
            onChange={(e) => onFieldChange("plotName", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="পূর্বপারের ক্ষেত"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            প্লটের আকার
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.plotSize || ""}
              onChange={(e) => onFieldChange("plotSize", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="প্লটের আকার"
              min="0.1"
              step="0.1"
            />
            <select
              value={formData.plotSizeUnit || "বিঘা"}
              onChange={(e) => onFieldChange("plotSizeUnit", e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="বিঘা">বিঘা</option>
              <option value="একর">একর</option>
              <option value="হেক্টর">হেক্টর</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ফসলের অবস্থা
          </label>
          <select
            value={formData.cropStatus || ""}
            onChange={(e) => onFieldChange("cropStatus", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="পরিকল্পনাধীন">পরিকল্পনাধীন</option>
            <option value="চলমান">চলমান</option>
            <option value="সম্পন্ন">সম্পন্ন</option>
          </select>
        </div>
      </div>
    </div>
  );
});

const Step5Form = React.memo(({ formData, onFieldChange }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">আর্থিক তথ্য</h3>
        <p className="text-gray-600 text-sm mt-1">
          খরচ ও বিক্রয় সম্পর্কিত তথ্য
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            মোট খরচ
          </label>
          <input
            type="number"
            value={formData.totalCost || ""}
            onChange={(e) => onFieldChange("totalCost", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="মোট খরচের পরিমাণ"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            বিক্রয়ের পরিমাণ
          </label>
          <input
            type="number"
            value={formData.salesAmount || ""}
            onChange={(e) => onFieldChange("salesAmount", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="বিক্রয়ের পরিমাণ"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            উৎপাদন (Yield)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.yield || ""}
              onChange={(e) => onFieldChange("yield", e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="উৎপাদনের পরিমাণ"
              min="0"
            />
            <select
              value={formData.yieldUnit || "মন"}
              onChange={(e) => onFieldChange("yieldUnit", e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="মন">মন</option>
              <option value="কেজি">কেজি</option>
              <option value="টন">টন</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});

const Step6Review = React.memo(({ formData, editingFarm }) => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">পর্যালোচনা করুন</h3>
        <p className="text-gray-600 text-sm mt-1">সমস্ত তথ্য পরীক্ষা করুন</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">সাধারণ তথ্য</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">নাম:</span> {formData.name}
            </p>
            <p>
              <span className="font-medium">অবস্থান:</span> {formData.location}
            </p>
            <p>
              <span className="font-medium">আকার:</span> {formData.size}{" "}
              {formData.sizeUnit}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">ফসল বিবরণ</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">প্রকার:</span> {formData.cropType}
            </p>
            <p>
              <span className="font-medium">জাত:</span>{" "}
              {formData.cropVariety || "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">রোপণ তারিখ:</span>{" "}
              {formData.plantingDate || "নির্ধারিত নয়"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">মাটি ও সেচ</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">মাটির প্রকার:</span>{" "}
              {formData.soilType || "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">pH মান:</span>{" "}
              {formData.soilPH || "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">সেচের উৎস:</span>{" "}
              {formData.irrigationSource || "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">নলকূপ গভীরতা:</span>{" "}
              {formData.tubeWellDepth
                ? `${formData.tubeWellDepth} ফুট`
                : "প্রযোজ্য নয়"}
            </p>
            <p>
              <span className="font-medium">অর্গানিক চাষ:</span>{" "}
              {formData.organicPractices ? "হ্যাঁ" : "না"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">প্লট তথ্য</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">প্লটের নাম:</span>{" "}
              {formData.plotName || "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">প্লটের আকার:</span>{" "}
              {formData.plotSize
                ? `${formData.plotSize} ${formData.plotSizeUnit}`
                : "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">অবস্থা:</span>{" "}
              {formData.cropStatus || "নির্ধারিত নয়"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">আর্থিক তথ্য</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">মোট খরচ:</span>{" "}
              {formData.totalCost
                ? `${formData.totalCost} টাকা`
                : "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">বিক্রয়:</span>{" "}
              {formData.salesAmount
                ? `${formData.salesAmount} টাকা`
                : "নির্ধারিত নয়"}
            </p>
            <p>
              <span className="font-medium">উৎপাদন:</span>{" "}
              {formData.yield
                ? `${formData.yield} ${formData.yieldUnit}`
                : "নির্ধারিত নয়"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const AddFarmModal = ({
  isOpen,
  onClose,
  onAddFarm,
  onUpdateFarm,
  editingFarm = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
    sizeUnit: "একর",
    cropType: "",
    cropVariety: "",
    plantingDate: "",
    soilType: "",
    soilPH: "",
    irrigationSource: "",
    tubeWellDepth: "",
    organicPractices: false,
    plotName: "",
    plotSize: "",
    plotSizeUnit: "বিঘা",
    cropStatus: "পরিকল্পনাধীন",
    totalCost: "",
    salesAmount: "",
    yield: "",
    yieldUnit: "মন",
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (!isOpen) return;

    if (editingFarm) {
      setFormData({
        name: editingFarm.name || "",
        location: editingFarm.location || "",
        size: editingFarm.sizeAcre?.toString() || "",
        sizeUnit: "একর",
        cropType: editingFarm.crop || editingFarm.cropDetails?.type || "",
        cropVariety: editingFarm.cropDetails?.variety || "",
        plantingDate: editingFarm.cropDetails?.plantingDate || "",
        soilType: editingFarm.soilDetails?.type || "",
        soilPH: editingFarm.soilDetails?.pH?.toString() || "",
        irrigationSource: editingFarm.irrigation?.source || "",
        tubeWellDepth: editingFarm.irrigation?.tubeWellDepth?.toString() || "",
        organicPractices: editingFarm.organicPractices || false,
        plotName: "",
        plotSize: "",
        plotSizeUnit: "বিঘা",
        cropStatus: editingFarm.status || "পরিকল্পনাধীন",
        totalCost: "",
        salesAmount: "",
        yield: "",
        yieldUnit: "মন",
      });
    } else {
      setFormData({
        name: "",
        location: "",
        size: "",
        sizeUnit: "একর",
        cropType: "",
        cropVariety: "",
        plantingDate: "",
        soilType: "",
        soilPH: "",
        irrigationSource: "",
        tubeWellDepth: "",
        organicPractices: false,
        plotName: "",
        plotSize: "",
        plotSizeUnit: "বিঘা",
        cropStatus: "পরিকল্পনাধীন",
        totalCost: "",
        salesAmount: "",
        yield: "",
        yieldUnit: "মন",
      });
    }

    setCurrentStep(1);
  }, [isOpen, editingFarm]);

  const handleFieldChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const steps = useMemo(
    () => [
      { number: 1, title: "সাধারণ তথ্য" },
      { number: 2, title: "ফসল বিবরণ" },
      { number: 3, title: "মাটি ও সেচ" },
      { number: 4, title: "প্লট তথ্য" },
      { number: 5, title: "আর্থিক তথ্য" },
      { number: 6, title: "পর্যালোচনা" },
    ],
    []
  );

  const ProgressBar = useMemo(
    () => () =>
      (
        <div className="mb-6 px-4">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1"
              >
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep >= step.number
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      } transition-all duration-300`}
                    />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      currentStep >= step.number
                        ? "bg-gray-600 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    } transition-all duration-300 text-sm`}
                  >
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep > step.number
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      } transition-all duration-300`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    currentStep >= step.number
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    [currentStep, steps]
  );

  const handleNext = () => {
    if (currentStep < 6) {
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
    if (currentStep === 6) {
      const userEmail = session?.user?.email;

      try {
        const formattedData = {
          name: formData.name.trim(),
          location: formData.location.trim(),
          sizeAcre: parseFloat(formData.size) || 0,
          crop: formData.cropType.trim(),
          status: formData.cropStatus || "পরিকল্পনাধীন",
          cropDetails: {
            type: formData.cropType.trim(),
            variety: formData.cropVariety.trim(),
            plantingDate: formData.plantingDate || null,
          },
          soilDetails: {
            type: formData.soilType || null,
            pH: formData.soilPH ? parseFloat(formData.soilPH) : null,
          },
          irrigation: {
            source: formData.irrigationSource || null,
            tubeWellDepth: formData.tubeWellDepth
              ? parseFloat(formData.tubeWellDepth)
              : null,
          },
          organicPractices: formData.organicPractices || false,
          coordinates: {
            latitude: 24.4365,
            longitude: 88.9741,
          },
          userEmail: userEmail || "",
        };

        console.log("Sending data to backend:", formattedData);

        if (editingFarm) {
          await onUpdateFarm(editingFarm.id || editingFarm._id, formattedData);
        } else {
          await onAddFarm(formattedData);
        }
        handleClose();
      } catch (error) {
        console.error("Submit error:", error);
        alert("ডেটা সেভ করতে সমস্যা হচ্ছে। দয়া করে আবার চেষ্টা করুন।");
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
      sizeUnit: "একর",
      cropType: "",
      cropVariety: "",
      plantingDate: "",
      soilType: "",
      soilPH: "",
      irrigationSource: "",
      tubeWellDepth: "",
      organicPractices: false,
      plotName: "",
      plotSize: "",
      plotSizeUnit: "বিঘা",
      cropStatus: "পরিকল্পনাধীন",
      totalCost: "",
      salesAmount: "",
      yield: "",
      yieldUnit: "মন",
    });
    setCurrentStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 rounded-t-lg border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingFarm ? "ফার্ম সম্পাদনা করুন" : "নতুন ফার্ম যুক্ত করুন"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          <div className="px-4 pb-4">
            <ProgressBar />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {currentStep === 1 && (
              <Step1Form
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            )}
            {currentStep === 2 && (
              <Step2Form
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            )}
            {currentStep === 3 && (
              <Step3Form
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            )}
            {currentStep === 4 && (
              <Step4Form
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            )}
            {currentStep === 5 && (
              <Step5Form
                formData={formData}
                onFieldChange={handleFieldChange}
              />
            )}
            {currentStep === 6 && (
              <Step6Review formData={formData} editingFarm={editingFarm} />
            )}
          </div>

          <div className="flex justify-between p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={currentStep === 1 ? handleClose : handlePrev}
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {currentStep === 1 ? "বাতিল করুন" : "পিছনে"}
            </button>

            <button
              type="submit"
              disabled={!isStepValid()}
              className={`flex items-center px-4 py-2 text-white rounded-lg transition-colors ${
                isStepValid()
                  ? "bg-gray-700 hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {currentStep === 6 ? (
                <>{editingFarm ? "আপডেট করুন" : "ফার্ম যুক্ত করুন"}</>
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
