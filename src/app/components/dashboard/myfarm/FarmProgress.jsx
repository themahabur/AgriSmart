"use client";
import React, { useState } from "react";
import {
  FaTasks,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaLightbulb,
  FaWater,
  FaSeedling,
  FaFlask,
  FaTractor,
  FaArrowRight,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

const FarmProgress = ({
  activities,
  suggestions,
  onAddActivity,
  onUpdateActivity,
}) => {
  const [activeTab, setActiveTab] = useState("activities");
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    priority: "মাধ্যমিক",
    category: "সাধারণ",
  });

  // Generate smart suggestions based on farm data
  const generateSuggestions = () => {
    const currentMonth = new Date().getMonth();
    const defaultSuggestions = [
      {
        id: 1,
        type: "irrigation",
        title: "সেচ প্রদানের সময়",
        message: "আবহাওয়ার উপর ভিত্তি করে আজ সেচ দেওয়া প্রয়োজন হতে পারে।",
        priority: "উচ্চ",
        icon: FaWater,
        color: "blue",
        action: "সেচ দিন",
      },
      {
        id: 2,
        type: "fertilizer",
        title: "সার প্রয়োগের সময়",
        message: "ইউরিয়া সার প্রয়োগের উপযুক্ত সময় এসেছে।",
        priority: "মাধ্যমিক",
        icon: FaFlask,
        color: "green",
        action: "সার দিন",
      },
      {
        id: 3,
        type: "pest",
        title: "কীটপতঙ্গ নিয়ন্ত্রণ",
        message: "এই সময়ে মাজরা পোকার আক্রমণের সম্ভাবনা রয়েছে।",
        priority: "উচ্চ",
        icon: FaExclamationTriangle,
        color: "red",
        action: "পরিদর্শন করুন",
      },
      {
        id: 4,
        type: "harvest",
        title: "ফসল কাটার প্রস্তুতি",
        message: "আগামী ২ সপ্তাহে ফসল কাটার প্রস্তুতি নিন।",
        priority: "মাধ্যমিক",
        icon: FaTractor,
        color: "yellow",
        action: "প্রস্তুতি নিন",
      },
    ];

    return suggestions || defaultSuggestions;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "উচ্চ":
        return "bg-red-100 text-red-800 border-red-200";
      case "মাধ্যমিক":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "নিম্ন":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "সম্পন্ন":
        return "bg-green-100 text-green-800";
      case "চলমান":
        return "bg-blue-100 text-blue-800";
      case "পরবর্তী":
        return "bg-gray-100 text-gray-800";
      case "বিলম্বিত":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    const activity = {
      id: Date.now(),
      ...newActivity,
      status: "পরবর্তী",
      createdAt: new Date().toISOString(),
    };

    if (onAddActivity) {
      onAddActivity(activity);
    }

    setNewActivity({
      title: "",
      description: "",
      date: "",
      priority: "মাধ্যমিক",
      category: "সাধারণ",
    });
    setShowAddActivityForm(false);
  };

  const handleSuggestionAction = (suggestion) => {
    const activity = {
      id: Date.now(),
      title: suggestion.action,
      description: suggestion.message,
      date: new Date().toISOString().split("T")[0],
      priority: suggestion.priority,
      category: suggestion.type,
      status: "পরবর্তী",
      createdAt: new Date().toISOString(),
    };

    if (onAddActivity) {
      onAddActivity(activity);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("activities")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "activities"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaTasks className="inline mr-2" />
              পরবর্তী কাজসমূহ
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "suggestions"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaLightbulb className="inline mr-2" />
              স্মার্ট পরামর্শ
            </button>
          </div>

          {activeTab === "activities" && (
            <button
              onClick={() => setShowAddActivityForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              কাজ যোগ করুন
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Activities Tab */}
        {activeTab === "activities" && (
          <div>
            {activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-1" />
                            {activity.date}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${getPriorityColor(
                              activity.priority
                            )}`}
                          >
                            {activity.priority}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          title="সম্পাদনা করুন"
                          className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                        <button
                          title="সম্পন্ন করুন"
                          className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
                          onClick={() =>
                            onUpdateActivity &&
                            onUpdateActivity(activity.id, { status: "সম্পন্ন" })
                          }
                        >
                          <FaCheckCircle className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaTasks className="text-4xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">কোন নির্ধারিত কাজ নেই</p>
                <button
                  onClick={() => setShowAddActivityForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
                >
                  <FaPlus className="mr-2" />
                  প্রথম কাজ যোগ করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === "suggestions" && (
          <div className="space-y-4">
            {generateSuggestions().map((suggestion) => {
              const IconComponent = suggestion.icon;
              return (
                <div
                  key={suggestion.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          suggestion.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : suggestion.color === "green"
                            ? "bg-green-100 text-green-600"
                            : suggestion.color === "red"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {suggestion.message}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${getPriorityColor(
                            suggestion.priority
                          )}`}
                        >
                          {suggestion.priority} অগ্রাধিকার
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleSuggestionAction(suggestion)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
                      >
                        {suggestion.action}
                        <FaArrowRight className="ml-1 w-3 h-3" />
                      </button>
                      <button
                        title="বিস্তারিত দেখুন"
                        className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddActivityForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                নতুন কাজ যোগ করুন
              </h2>
              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    কাজের নাম *
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="যেমন: সেচ প্রদান"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিবরণ
                  </label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="কাজের বিস্তারিত বিবরণ..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      তারিখ *
                    </label>
                    <input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) =>
                        setNewActivity({ ...newActivity, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      অগ্রাধিকার
                    </label>
                    <select
                      value={newActivity.priority}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          priority: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="নিম্ন">নিম্ন</option>
                      <option value="মাধ্যমিক">মাধ্যমিক</option>
                      <option value="উচ্চ">উচ্চ</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddActivityForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmProgress;
