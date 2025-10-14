import React, { useState } from "react";
import { FaRobot, FaEye, FaLeaf, FaBug, FaClipboardList } from "react-icons/fa";

const ImageAnalysis = ({ imageUrl, onAnalysisComplete, disabled = false }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedPromptType, setSelectedPromptType] = useState("general");

  const promptTemplates = {
    general: {
      title: "সাধারণ বিশ্লেষণ",
      icon: <FaEye />,
      prompt:
        "এই কৃষি ছবিটি বিশ্লেষণ করুন এবং ফসলের স্বাস্থ্য, রোগ সনাক্তকরণ এবং চিকিৎসার সুপারিশ বাংলায় প্রদান করুন।",
    },
    disease: {
      title: "রোগ নির্ণয়",
      icon: <FaBug />,
      prompt:
        "এই ফসলের ছবিতে কোন রোগ বা কীটপতঙ্গের আক্রমণ আছে কিনা তা চিহ্নিত করুন। রোগের নাম, কারণ, লক্ষণ এবং চিকিৎসার উপায় বাংলায় বলুন।",
    },
    nutrition: {
      title: "পুষ্টি বিশ্লেষণ",
      icon: <FaLeaf />,
      prompt:
        "এই ফসলের পুষ্টিগত অবস্থা বিশ্লেষণ করুন। কোন পুষ্টি উপাদানের ঘাটতি বা বেশি মাত্রা আছে কিনা এবং সার প্রয়োগের পরামর্শ বাংলায় দিন।",
    },
    growth: {
      title: "বৃদ্ধি মূল্যায়ন",
      icon: <FaClipboardList />,
      prompt:
        "এই ফসলের বৃদ্ধির অবস্থা মূল্যায়ন করুন। বয়স অনুযায়ী বৃদ্ধি স্বাভাবিক কিনা এবং আরও ভালো ফলন পেতে কী করণীয় তা বাংলায় বলুন।",
    },
    custom: {
      title: "কাস্টম প্রশ্ন",
      icon: <FaRobot />,
      prompt: "",
    },
  };

  const handleAnalyze = async () => {
    if (!imageUrl) {
      alert("প্রথমে একটি ছবি আপলোড করুন");
      return;
    }

    const promptToUse =
      selectedPromptType === "custom"
        ? customPrompt.trim()
        : promptTemplates[selectedPromptType].prompt;

    if (!promptToUse) {
      alert("অনুগ্রহ করে একটি প্রশ্ন লিখুন");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis("");

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt: promptToUse,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      const analysisResult = data.analysis || "বিশ্লেষণ সেবা উপলব্ধ নেই।";

      setAnalysis(analysisResult);

      // Notify parent component
      onAnalysisComplete?.({
        id: Date.now(),
        type: "image-analysis",
        imageUrl: imageUrl,
        promptType: selectedPromptType,
        prompt: promptToUse,
        analysis: analysisResult,
        timestamp: new Date().toISOString(),
        solved: false,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis(
        "দুঃখিত, বিশ্লেষণ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FaRobot className="mr-2 text-green-500" />
          বিশ্লেষণের ধরন নির্বাচন করুন
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {Object.entries(promptTemplates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedPromptType(key)}
              disabled={disabled || isAnalyzing}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPromptType === key
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              } ${
                disabled || isAnalyzing
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex items-center space-x-2">
                {template.icon}
                <span className="font-medium">{template.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Prompt Input */}
        {selectedPromptType === "custom" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              আপনার প্রশ্ন লিখুন:
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="এই ফসলের ছবি সম্পর্কে আপনার নির্দিষ্ট প্রশ্ন লিখুন..."
              rows={3}
              disabled={disabled || isAnalyzing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={disabled || isAnalyzing || !imageUrl}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>AI বিশ্লেষণ করছে...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <FaRobot />
              <span>AI দিয়ে বিশ্লেষণ করুন</span>
            </div>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <FaEye className="mr-2" />
            🔬 AI বিশ্লেষণ রিপোর্ট
          </h3>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="prose prose-sm max-w-none">
              {analysis.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => navigator.clipboard.writeText(analysis)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              📋 কপি করুন
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              🖨️ প্রিন্ট করুন
            </button>
          </div>
        </div>
      )}

      {/* Analysis Tips */}
      {!analysis && !isAnalyzing && (
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">
            💡 বিশ্লেষণের টিপস:
          </h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• স্পষ্ট এবং উচ্চ মানের ছবি ব্যবহার করুন</li>
            <li>• সমস্যাগ্রস্ত এলাকা ফোকাসে রাখুন</li>
            <li>• বিভিন্ন কোণ থেকে একাধিক ছবি বিশ্লেষণ করুন</li>
            <li>• প্রয়োজনে কাস্টম প্রশ্ন ব্যবহার করুন</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
