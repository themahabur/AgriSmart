"use client";
import { useState, useRef } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

const ImageUploader = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelect(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {!preview ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 font-hind">
            ছবি আপলোড করতে এখানে ক্লিক করুন
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={preview}
            alt="Featured preview"
            className="w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
            <button
              onClick={removeImage}
              type="button"
              className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-all transform hover:scale-110"
              aria-label="Remove image"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
