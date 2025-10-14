import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import {
  FaRobot,
  FaMicrophone,
  FaStop,
  FaPaperPlane,
  FaHistory,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import AiResponse from "./AiResponse";

const AIAdviceEngine = ({ onAdviceGenerated, isLoading, setIsLoading }) => {
  const [question, setQuestion] = useState("");

  const [symptomArea, setSymptomArea] = useState("");
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const symptomAreas = ["পাতা", "কান্ড", "শিকড়", "ফুল", "ফল", "সম্পূর্ণ গাছ"];

  const severityLevels = [
    "হালকা (১০-২৫%)",
    "মাধ্যম (২৫-৫০%)",
    "গুরুতর (৫০-৭৫%)",
    "অত্যন্ত গুরুতর (৭৫%+)",
  ];

  const handleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      if ("webkitSpeechRecognition" in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "bn-BD";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuestion((prev) => prev + " " + transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        alert("আপনার ব্রাউজার ভয়েস রিকগনিশন সাপোর্ট করে না");
      }
    } else {
      setIsListening(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cropType = e.target.cropType.value;
    if (!question.trim()) return;

    setIsLoading(true);
    setAiResponse("");

    // Construct detailed prompt
    const detailedPrompt = `
    ফসলের তথ্য: ${cropType || "উল্লেখ করা হয়নি"}
    সমস্যার এলাকা: ${symptomArea || "উল্লেখ করা হয়নি"}
    তীব্রতা: ${severity || "উল্লেখ করা হয়নি"}
    সমস্যার সময়কাল: ${duration || "উল্লেখ করা হয়নি"}

    সমস্যার বিবরণ: ${question}

    দয়া করে এই কৃষি সমস্যার জন্য একটি বিস্তারিত সমাধান দিন যাতে রয়েছে:
    1. সমস্যা চিহ্নিতকরণ
    2. সম্ভাব্য কারণ
    3. তাৎক্ষণিক ব্যবস্থা
    4. দীর্ঘমেয়াদী সমাধান
    5. প্রতিরোধমূলক ব্যবস্থা
    `;

    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: detailedPrompt }),
      });

      const data = await response.json();
      const aiAnswer = data.answer || "দুঃখিত, এই মুহূর্তে AI সেবা উপলব্ধ নেই।";

      setAiResponse(aiAnswer);

      // Save to history
      const adviceData = {
        id: Date.now(),
        question: question,
        answer: aiAnswer,
        cropType, //
        symptomArea,
        severity,
        duration,
        timestamp: new Date().toISOString(),
        type: "ai-diagnosis",
        solved: false,
      };
      setQuestion("");
      e.target.cropType.value = "";
      setSymptomArea("");
      setSeverity("");
      setDuration("");

      console.log(adviceData);
      onAdviceGenerated(adviceData);
    } catch (error) {
      console.error("AI request failed:", error);
      setAiResponse(
        "দুঃখিত, AI সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <FaRobot className="text-2xl text-green-600 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              AI কৃষি বিশেষজ্ঞ
            </h2>
            <p className="text-gray-600 text-sm">
              আপনার ফসলের সমস্যা বর্ণনা করুন, AI আপনাকে সমাধান দেবে
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🌱 ফসলের ধরন
              </label>
              <input
                type="text"
                name="cropType"
                placeholder="ধান, ডাল, গম, ভুট্টা..."
                className="w-full px-4 py-[13px] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📍 সমস্যার এলাকা
              </label>
              <select
                value={symptomArea}
                onChange={(e) => setSymptomArea(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">এলাকা নির্বাচন করুন</option>
                {symptomAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ⚠️ সমস্যার তীব্রতা
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">তীব্রতা নির্বাচন করুন</option>
                {severityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ⏱️ সমস্যার সময়কাল
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">সময়কাল নির্বাচন করুন</option>
                <option value="১-২ দিন">১-২ দিন</option>
                <option value="৩-৭ দিন">৩-৭ দিন</option>
                <option value="১-২ সপ্তাহ">১-২ সপ্তাহ</option>
                <option value="১ মাসের বেশি">১ মাসের বেশি</option>
              </select>
            </div>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 সমস্যার বিস্তারিত বর্ণনা
            </label>
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="আপনার ফসলের সমস্যা বিস্তারিত লিখুন... যেমন: পাতায় দাগ, রঙ পরিবর্তন, পোকামাকড়, ফলন কম ইত্যাদি"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none pr-12"
                required
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isListening ? <FaStop /> : <FaMicrophone />}
              </button>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-1">🎤 বলুন... শুনছি</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>AI বিশ্লেষণ করছে...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>AI এর কাছে প্রশ্ন করুন</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          {/* //   <div className="flex items-center mb-4">
        //     <FaRobot className="text-2xl text-green-600 mr-3" />
        //     <h3 className="text-lg font-bold text-green-800">
        //       AI বিশেষজ্ঞের পরামর্শ
        //     </h3>
        //   </div>
        //   <div className="bg-white rounded-lg p-4 border border-green-100">
        //     <div className="prose prose-sm max-w-none">
        //       <ReactMarkdown>{aiResponse}</ReactMarkdown>
        //     </div>
        //   </div>
        //   <div className="mt-4 flex flex-wrap gap-2">
        //     <span className="px-3 py-1 inline-flex items-center bg-green-100 text-green-700 rounded-full text-sm">
        //       <BiCheck size={25} /> AI বিশ্লেষণ সম্পূর্ণ
        //     </span>
        //     <span className="px-3 py-1 inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        //       <FaHistory size={20} /> ইতিহাসে সংরক্ষিত
        //     </span>
        //   </div> */}
          <AiResponse aiResponse={aiResponse} />
        </div>
      )}
    </div>
  );
};

export default AIAdviceEngine;
