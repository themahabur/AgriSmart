import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageAnalysis from "./ImageAnalysis";
import { FaInfoCircle } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { useSession } from "next-auth/react";

const CropDiagnosis = ({ isLoading, setIsLoading }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const handleImageUploaded = (cloudinaryUrl, previewUrl) => {
    setUploadedImageUrl(cloudinaryUrl);
    setImagePreview(previewUrl);
  };

  const handleImageRemoved = () => {
    setUploadedImageUrl(null);
    setImagePreview(null);
  };

  const handleAnalysisComplete = async (analysisData) => {
    // Add description and preview image to the analysis data
    const completeData = {
      ...analysisData,
      description,
      email: session?.user?.email || "guest",

      // imagePreview,
    };

    const response = await fetch("http://localhost:5000/api/ai-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completeData),
    });

    const result = await response.json();

    // onDiagnosisComplete(completeData);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center">
          <IoImage className="mr-2 " /> AI চালিত ছবি বিশ্লেষণ
        </h2>
        <p className="text-green-700 mb-4">
          উন্নত কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে আপনার ফসলের ছবি বিশ্লেষণ করুন
          এবং রোগ নির্ণয়, পুষ্টি মূল্যায়ন ও চিকিৎসার পরামর্শ পান।
        </p>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex justify-between space-x-2">
            <div>
              <h4 className="font-medium inline-flex items-center text-blue-800 mb-1">
                <FaInfoCircle className="text-blue -500 mt-0.5 flex-shrink-0 mr-1" />
                কিভাবে কাজ করে:
              </h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>আপনার ফসলের স্পষ্ট ছবি আপলোড করুন</li>
                <li>বিশ্লেষণের ধরন নির্বাচন করুন (রোগ, পুষ্টি, বৃদ্ধি)</li>
                <li>AI আপনার ছবি বিশ্লেষণ করে বিস্তারিত রিপোর্ট দেবে</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">
                <IoImage className="inline-flex items-center mr-1 " /> ভালো ছবির
                জন্য টিপস:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• দিনের স্বাভাবিক আলোতে ছবি তুলুন</li>
                <li>• পাতার উপর এবং নিচ থেকে আলাদা ছবি নিন</li>
                <li>
                  • সমস্যাগ্রস্ত অংশ স্পষ্ট ভাবে দেখা যায় এমন দূরত্ব রাখুন
                </li>
                <li>• ঝাপসা বা অস্পষ্ট ছবি এড়িয়ে চলুন</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ধাপ ১: ছবি আপলোড করুন
        </h3>
        <ImageUploader
          onImageUploaded={handleImageUploaded}
          onImageRemoved={handleImageRemoved}
          disabled={isLoading}
        />
      </div>

      {/* Description Section */}
      {uploadedImageUrl && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ধাপ ২: অতিরিক্ত তথ্য (ঐচ্ছিক)
          </h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="আপনার ফসল সম্পর্কে অতিরিক্ত তথ্য দিন... যেমন: কখন সমস্যা শুরু হয়েছে, আবহাওয়ার অবস্থা, ব্যবহৃত সার বা কীটনাশক ইত্যাদি।"
            rows={4}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* Analysis Section */}
      {uploadedImageUrl && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ধাপ ৩: AI বিশ্লেষণ
          </h3>
          <ImageAnalysis
            imageUrl={uploadedImageUrl}
            onAnalysisComplete={handleAnalysisComplete}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default CropDiagnosis;
