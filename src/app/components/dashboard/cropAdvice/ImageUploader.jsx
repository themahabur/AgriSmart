import React, { useState, useRef } from "react";
import { FaCamera, FaUpload, FaTrash, FaSpinner } from "react-icons/fa";

const ImageUploader = ({
  onImageUploaded,
  onImageRemoved,
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("অনুগ্রহ করে শুধুমাত্র ছবি ফাইল আপলোড করুন");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ ৫ এমবি এর কম হতে হবে");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedImageUrl(data.url);

      // Notify parent component
      onImageUploaded?.(data.url, imagePreview);
    } catch (error) {
      console.error("Upload error:", error);
      alert("ছবি আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      handleRemoveImage();
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageRemoved?.();
  };

  const triggerFileSelect = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!imagePreview ? (
        <div
          onClick={triggerFileSelect}
          className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
            disabled || isUploading
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-green-300 bg-green-50 hover:border-green-400 hover:bg-green-100"
          }`}
        >
          <div className="text-center">
            {isUploading ? (
              <>
                <FaSpinner className="text-4xl text-green-500 mx-auto mb-3 animate-spin" />
                <p className="text-lg font-medium text-green-700 mb-2">
                  ছবি আপলোড হচ্ছে...
                </p>
                <p className="text-sm text-green-600">
                  অনুগ্রহ করে অপেক্ষা করুন
                </p>
              </>
            ) : (
              <>
                <FaCamera className="text-4xl text-green-500 mx-auto mb-3" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  ফসলের ছবি আপলোড করুন
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  JPG, PNG, বা WEBP ফরম্যাট (সর্বোচ্চ ৫ এমবি)
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <FaUpload />
                  <span>ক্লিক করুন অথবা ফাইল টেনে আনুন</span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Image Preview */
        <div className="relative bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-800">আপলোড করা ছবি</h3>
            <button
              onClick={handleRemoveImage}
              disabled={disabled || isUploading}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="ছবি মুছে দিন"
            >
              <FaTrash />
            </button>
          </div>

          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded crop"
              className="w-full max-h-64 object-contain rounded-lg bg-gray-50"
            />

            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <FaSpinner className="text-2xl mx-auto mb-2 animate-spin" />
                  <p>আপলোড হচ্ছে...</p>
                </div>
              </div>
            )}

            {uploadedImageUrl && !isUploading && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                ✓ আপলোড সম্পন্ন
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
};

export default ImageUploader;
