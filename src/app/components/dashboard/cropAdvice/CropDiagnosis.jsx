import React, { useState, useRef } from "react";
import { FaCamera, FaUpload, FaRobot, FaTrash } from "react-icons/fa";

const CropDiagnosis = ({ onDiagnosisComplete, isLoading, setIsLoading }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnosis = async () => {
    if (!selectedImage && !description.trim()) {
      alert("অনুগ্রহ করে একটি ছবি আপলোড করুন অথবা সমস্যার বর্ণনা দিন");
      return;
    }

    setIsLoading(true);
    const prompt = `ছবি বিশ্লেষণ: "${description}"\n\nফসলের সমস্যা চিহ্নিত করে সমাধান দিন।`;

    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
      });

      const data = await response.json();
      const aiDiagnosis = data.answer || "বিশ্লেষণ সেবা উপলব্ধ নেই।";
      setDiagnosis(aiDiagnosis);

      onDiagnosisComplete({
        id: Date.now(),
        type: "image-analysis",
        image: imagePreview,
        description,
        diagnosis: aiDiagnosis,
        timestamp: new Date().toISOString(),
        solved: false,
      });
    } catch (error) {
      setDiagnosis("বিশ্লেষণ করতে সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">📸 ছবি দিয়ে ফসল নির্ণয়</h2>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors mb-4"
        >
          <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
          <span>ছবি আপলোড করুন</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Crop"
              className="max-h-64 mx-auto rounded-lg"
            />
          </div>
        )}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="সমস্যার বর্ণনা দিন..."
          rows={3}
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleDiagnosis}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {isLoading ? "বিশ্লেষণ করছে..." : "AI বিশ্লেষণ করুন"}
        </button>
      </div>

      {diagnosis && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold mb-4">🔬 AI বিশ্লেষণ রিপোর্ট</h3>
          <div className="bg-white rounded-lg p-4">
            {diagnosis.split("\n").map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDiagnosis;
