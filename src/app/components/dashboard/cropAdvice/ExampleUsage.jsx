import React, { useState } from "react";
import {
  ImageUploader,
  ImageAnalysis,
} from "@/app/components/dashboard/cropAdvice";

const ExampleImageAnalysis = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [analysisResults, setAnalysisResults] = useState([]);

  const handleImageUploaded = (cloudinaryUrl, previewUrl) => {
    setImageUrl(cloudinaryUrl);
    console.log("Image uploaded:", { cloudinaryUrl, previewUrl });
  };

  const handleImageRemoved = () => {
    setImageUrl(null);
    console.log("Image removed");
  };

  const handleAnalysisComplete = (analysisData) => {
    setAnalysisResults((prev) => [analysisData, ...prev]);
    console.log("Analysis completed:", analysisData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Image Analysis Example</h1>

      {/* Image Upload */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Step 1: Upload Image</h2>
        <ImageUploader
          onImageUploaded={handleImageUploaded}
          onImageRemoved={handleImageRemoved}
        />
      </div>

      {/* Image Analysis */}
      {imageUrl && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Step 2: Analyze Image</h2>
          <ImageAnalysis
            imageUrl={imageUrl}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      )}

      {/* Analysis History */}
      {analysisResults.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Analysis History</h2>
          <div className="space-y-4">
            {analysisResults.map((result, index) => (
              <div key={result.id || index} className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
                <div className="text-sm">
                  <strong>Type:</strong> {result.promptType}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {result.analysis}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleImageAnalysis;
