"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { FaCheckCircle, FaTimesCircle, FaLightbulb } from "react-icons/fa";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

const suggestionStyles = {
  Recommended: { icon: <FaCheckCircle />, color: "green" },
  Avoid: { icon: <FaTimesCircle />, color: "red" },
  ProTip: { icon: <FaLightbulb />, color: "yellow" },
};

const SuggestionCard = ({ suggestion }) => {
  const style = suggestionStyles[suggestion.type] || suggestionStyles.ProTip;
  const colors = {
    green: "bg-green-50 border-green-200 text-green-800",
    red: "bg-red-50 border-red-200 text-red-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };
  return (
    <div className={`p-4 rounded-2xl border ${colors[style.color]}`}>
      <div className="flex items-center font-bold">
        <span className="mr-2">{style.icon}</span>
        {suggestion.title}
      </div>
      <p className="text-sm mt-2 text-gray-700">{suggestion.suggestion}</p>
    </div>
  );
};

const AiSuggestions = ({ weatherData, farmId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noFarmFound, setNoFarmFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!weatherData.currentWeather) return;

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setNoFarmFound(false);
        setError("");

        const requestBody = { weatherData };
        if (farmId) {
          requestBody.farmId = farmId;
        }

        const res = await axiosInstance.post(
          "/api/ai-suggestions",
          requestBody
        );
        setSuggestions(res.data.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNoFarmFound(true);
        } else {
          setError("পরামর্শ তৈরি করতে ব্যর্থ হয়েছে।");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [weatherData, farmId]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">কৃষি পরামর্শ</h2>
        <div className="text-center p-8 bg-white rounded-2xl border">
          <ClipLoader color="#22c55e" />
          <p className="mt-4 text-gray-600">
            আপনার খামারের জন্য পরামর্শ তৈরি করা হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (noFarmFound) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">কৃষি পরামর্শ</h2>
        <div className="text-center p-8 bg-white rounded-2xl border">
          <h3 className="font-semibold text-gray-800">ব্যক্তিগত পরামর্শ পান</h3>
          <p className="text-gray-600 mt-2">
            আপনার খামারের তথ্য যোগ করে ব্যক্তিগত পরামর্শ পেতে পারেন।
          </p>
          <Link
            href="/dashboard/my-farm/create"
            className="mt-4 inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
          >
            খামার যোগ করুন
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">কৃষি পরামর্শ</h2>
        <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">কৃষি পরামর্শ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((sug, index) => (
          <SuggestionCard key={index} suggestion={sug} />
        ))}
      </div>
    </div>
  );
};

export default AiSuggestions;
