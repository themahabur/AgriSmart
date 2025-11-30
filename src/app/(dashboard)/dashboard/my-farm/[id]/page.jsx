"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaSeedling,
  FaTractor,
  FaCheckCircle,
  FaClock,
  FaLeaf,
  FaWater,
  FaThermometerHalf,
  FaLightbulb,
  FaSpinner,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const FarmDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [farm, setFarm] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        setLoading(true);
        // Fetch farm details
        const farmResponse = await axiosInstance.get(
          `/farms/${session?.user?.email}`
        );

        const farms = farmResponse.data.data?.farms || farmResponse.data.data || [];
        const currentFarm = farms.find(
          (f) => f._id === params.id || f.id === params.id
        );

        if (!currentFarm) {
          toast.error("ফার্ম খুঁজে পাওয়া যায়নি");
          router.push("/dashboard/my-farm");
          return;
        }

        setFarm(currentFarm);

        // Fetch completed tasks
        const tasksResponse = await axiosInstance.get(
          `/farm-tasks/${session?.user?.email}`
        );

        const allTasks = tasksResponse.data?.tasks || [];
        const farmCompletedTasks = allTasks.filter(
          (task) =>
            task.status === "completed" &&
            (task.farmId === params.id || task.farmId === currentFarm._id)
        );

        setCompletedTasks(farmCompletedTasks);
      } catch (error) {
        console.error("Error fetching farm details:", error);
        toast.error("ফার্মের তথ্য লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email && params.id) {
      fetchFarmDetails();
    }
  }, [params.id, session?.user?.email, router]);

  const handleGetAISuggestion = async () => {
    if (!farm) return;

    try {
      setLoadingAI(true);
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `আমার ফার্ম সম্পর্কে পরামর্শ দিন`,
          farmDetails: {
            name: farm.name,
            location: farm.location,
            size: farm.sizeAcre || farm.size,
            crop: farm.cropDetails?.type || farm.crop,
            variety: farm.cropDetails?.variety,
            plantingDate: farm.cropDetails?.plantingDate,
            soilType: farm.soilDetails?.type,
            soilPH: farm.soilDetails?.pH,
            irrigationSource: farm.irrigation?.source,
            organicPractices: farm.organicPractices,
          },
          completedTasks: completedTasks.map((task) => ({
            title: task.title,
            description: task.des,
            date: task.date,
            priority: task.priority,
          })),
        }),
      });

      const data = await response.json();
      setAiSuggestion(data.answer || "কোন পরামর্শ পাওয়া যায়নি");
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
      toast.error("AI পরামর্শ পেতে সমস্যা হয়েছে");
    } finally {
      setLoadingAI(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 font-hind">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 font-hind">ফার্ম পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-hind p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/my-farm")}
          className="flex items-center text-green-700 hover:text-green-900 mb-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span className="font-medium">ফিরে যান</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaTractor className="mr-3 text-green-600" />
          {farm.name}
        </h1>
        <p className="text-gray-600 mt-2 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {farm.location}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Details Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaSeedling className="mr-2 text-green-600" />
            ফার্মের বিস্তারিত তথ্য
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaRulerCombined className="mr-2 text-blue-600" />
                মৌলিক তথ্য
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">আকার:</span>{" "}
                  <span className="font-medium">{farm.sizeAcre || farm.size} একর</span>
                </p>
                <p>
                  <span className="text-gray-600">ফসল:</span>{" "}
                  <span className="font-medium">{farm.cropDetails?.type || farm.crop}</span>
                </p>
                {farm.cropDetails?.variety && (
                  <p>
                    <span className="text-gray-600">জাত:</span>{" "}
                    <span className="font-medium">{farm.cropDetails.variety}</span>
                  </p>
                )}
                {farm.cropDetails?.plantingDate && (
                  <p>
                    <span className="text-gray-600">রোপণের তারিখ:</span>{" "}
                    <span className="font-medium">
                      {new Date(farm.cropDetails.plantingDate).toLocaleDateString("bn-BD")}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Soil Info */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaLeaf className="mr-2 text-amber-600" />
                মাটির তথ্য
              </h3>
              <div className="space-y-2 text-sm">
                {farm.soilDetails?.type && (
                  <p>
                    <span className="text-gray-600">মাটির ধরন:</span>{" "}
                    <span className="font-medium">{farm.soilDetails.type}</span>
                  </p>
                )}
                {farm.soilDetails?.pH && (
                  <p>
                    <span className="text-gray-600">pH লেভেল:</span>{" "}
                    <span className="font-medium">{farm.soilDetails.pH}</span>
                  </p>
                )}
                {farm.soilDetails?.nutrients && (
                  <p>
                    <span className="text-gray-600">পুষ্টি উপাদান:</span>{" "}
                    <span className="font-medium">{farm.soilDetails.nutrients}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Irrigation Info */}
            <div className="bg-cyan-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaWater className="mr-2 text-cyan-600" />
                সেচ ব্যবস্থা
              </h3>
              <div className="space-y-2 text-sm">
                {farm.irrigation?.source && (
                  <p>
                    <span className="text-gray-600">সেচের উৎস:</span>{" "}
                    <span className="font-medium">{farm.irrigation.source}</span>
                  </p>
                )}
                {farm.irrigation?.tubeWellDepth && (
                  <p>
                    <span className="text-gray-600">নলকূপের গভীরতা:</span>{" "}
                    <span className="font-medium">{farm.irrigation.tubeWellDepth} ফুট</span>
                  </p>
                )}
                {farm.irrigation?.lastDate && (
                  <p>
                    <span className="text-gray-600">শেষ সেচ:</span>{" "}
                    <span className="font-medium">
                      {new Date(farm.irrigation.lastDate).toLocaleDateString("bn-BD")}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaThermometerHalf className="mr-2 text-green-600" />
                অতিরিক্ত তথ্য
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-600">অর্গানিক চাষ:</span>{" "}
                  <span className="font-medium">
                    {farm.organicPractices ? "হ্যাঁ" : "না"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">স্ট্যাটাস:</span>{" "}
                  <span className="font-medium">{farm.status || "চলমান"}</span>
                </p>
                <p>
                  <span className="text-gray-600">সর্বশেষ আপডেট:</span>{" "}
                  <span className="font-medium">
                    {farm.updatedAt
                      ? new Date(farm.updatedAt).toLocaleDateString("bn-BD")
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" />
            AI পরামর্শ
          </h2>

          {!aiSuggestion ? (
            <button
              onClick={handleGetAISuggestion}
              disabled={loadingAI}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loadingAI ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  লোড হচ্ছে...
                </>
              ) : (
                <>
                  <FaLightbulb className="mr-2" />
                  পরামর্শ পান
                </>
              )}
            </button>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {aiSuggestion}
              </p>
              <button
                onClick={handleGetAISuggestion}
                disabled={loadingAI}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-sm flex items-center"
              >
                {loadingAI ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    লোড হচ্ছে...
                  </>
                ) : (
                  "নতুন পরামর্শ পান"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaCheckCircle className="mr-2 text-green-600" />
          সম্পন্ন কাজসমূহ ({completedTasks.length})
        </h2>

        {completedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task) => (
              <div
                key={task._id}
                className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-600" />
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{task.des}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <FaClock className="mr-1" />
                    {task.date}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {task.priority === "high"
                      ? "উচ্চ"
                      : task.priority === "medium"
                      ? "মাধ্যমিক"
                      : "নিম্ন"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaCheckCircle className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">এই ফার্মে এখনও কোন কাজ সম্পন্ন হয়নি</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmDetailsPage;
