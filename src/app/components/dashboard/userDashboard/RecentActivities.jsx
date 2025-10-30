"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTractor,
  FaTasks,
  FaCheckCircle,
  FaBookOpen,
  FaPencilAlt,
  FaSeedling,
  FaTrashAlt,
} from "react-icons/fa";
import { MdDelete, MdEdit, MdAddCircle } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import axiosInstance from "@/lib/axios";

// Helper function to get icon based on activity type
const getActivityIcon = (activityType) => {
  const icons = {
    // Farm Activities
    farm_create: FaTractor,
    farm_update: FaEdit,
    farm_delete: FaTrash,

    // Task Activities
    task_create: FaTasks,
    task_update: FaCheckCircle,
    task_delete: FaTrashAlt,

    // Knowledge Hub Activities
    create_knowledge_hub_content: FaBookOpen,
    update_knowledge_hub_content: FaPencilAlt,
    delete_knowledge_hub_content: MdDelete,
  };

  return icons[activityType] || FaFileAlt;
};

// Helper function to get background color based on activity type
const getActivityColor = (activityType) => {
  const colors = {
    // Farm Activities - Green theme
    farm_create: "bg-green-100",
    farm_update: "bg-blue-100",
    farm_delete: "bg-red-100",

    // Task Activities - Purple theme
    task_create: "bg-purple-100",
    task_update: "bg-teal-100",
    task_delete: "bg-orange-100",

    // Knowledge Hub Activities - Indigo theme
    create_knowledge_hub_content: "bg-indigo-100",
    update_knowledge_hub_content: "bg-yellow-100",
    delete_knowledge_hub_content: "bg-pink-100",
  };

  return colors[activityType] || "bg-gray-100";
};

// Helper function to get icon color based on activity type
const getIconColor = (activityType) => {
  const colors = {
    // Farm Activities
    farm_create: "text-green-600",
    farm_update: "text-blue-600",
    farm_delete: "text-red-600",

    // Task Activities
    task_create: "text-purple-600",
    task_update: "text-teal-600",
    task_delete: "text-orange-600",

    // Knowledge Hub Activities
    create_knowledge_hub_content: "text-indigo-600",
    update_knowledge_hub_content: "text-yellow-600",
    delete_knowledge_hub_content: "text-pink-600",
  };

  return colors[activityType] || "text-gray-600"; // Default fallback
};

// Helper function to format timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return `এইমাত্র`;
  if (minutes < 60) return `${minutes} মিনিট আগে`;
  if (hours < 24) return `${hours} ঘণ্টা আগে`;
  return `${days} দিন আগে`;
};

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/recent-activity");
        setActivities(response.data);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FaBell className="mr-2 text-orange-600" />
          সাম্প্রতিক কার্যক্রম
        </h2>
        <p className="text-center text-red-500 py-4">
          তথ্য লোড করতে সমস্যা হয়েছে
        </p>
      </div>
    );
  }

  // Empty state
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FaBell className="mr-2 text-orange-600" />
          সাম্প্রতিক কার্যক্রম
        </h2>
        <p className="text-center text-gray-500 py-8">কোনো কার্যক্রম নেই</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 ">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <FaBell className="mr-2 text-orange-600" />
        সাম্প্রতিক কার্যক্রম
      </h2>
      <div className="space-y-4 pr-2 md:h-[200px] overflow-y-auto scrollbar-hide">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.activityType);
          const bgColor = getActivityColor(activity.activityType);
          const iconColor = getIconColor(activity.activityType);

          return (
            <div key={activity._id} className="flex items-start space-x-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}
              >
                <IconComponent className={`${iconColor} text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium">
                  {activity.details}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Link
        href="/dashboard/community"
        className="block mt-4 text-center text-green-600 hover:text-green-700 text-sm font-medium"
      >
        সব কার্যক্রম দেখন →
      </Link> */}
    </div>
  );
};

export default RecentActivities;
