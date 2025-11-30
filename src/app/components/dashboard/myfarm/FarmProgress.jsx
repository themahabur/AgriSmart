"use client";
import React, { useState, useEffect } from "react";
import {
  FaTasks,
  FaCalendarAlt,
  FaPlus,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import AddActivityModal from "./AddActivityModal";
import axiosInstance from "@/lib/axios";

const priorityMap = { low: "নিম্ন", medium: "মাধ্যমিক", high: "উচ্চ" };
const priorityIcons = {
  low: FaClock,
  medium: FaTasks,
  high: FaExclamationTriangle,
};

const FarmProgress = ({ farms = [] }) => {
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("activities");
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    priority: "medium",
    farmName: "",
    farmId: "",
  });
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || "";

  // Store completed task IDs in state
  const [completedTaskIds, setCompletedTaskIds] = useState(new Set());

  useEffect(() => {
    if (!userEmail) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`/farm-tasks/${userEmail}`);

        const data = res.data;

        setActivities(data.tasks || []);

        // Initialize completed tasks from the fetched data
        const completedIds = new Set();
        (data.tasks || []).forEach((task) => {
          if (task.status === "completed") {
            completedIds.add(task._id);
          }
        });
        setCompletedTaskIds(completedIds);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("ফার্ম কাজ লোড করতে সমস্যা হয়েছে");
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userEmail]);

  const handleCompleteTask = async (activity) => {
    const taskId = activity._id;
    const isCurrentlyCompleted = completedTaskIds.has(taskId);

    try {
      // Toggle the completed state
      const newCompletedState = !isCurrentlyCompleted;

      // Update the task status in the backend
      const updatedTaskData = {
        ...activity,
        status: newCompletedState ? "completed" : "in-progress",
      };

      const res = await axiosInstance.put(
        `/farm-tasks/${taskId}`,
        updatedTaskData
      );

      // Update local state
      if (res.data.task) {
        setActivities((prevActivities) =>
          prevActivities.map((task) =>
            task._id === taskId ? res.data.task : task
          )
        );
      }

      // Update completed tasks set
      setCompletedTaskIds((prev) => {
        const newSet = new Set(prev);
        if (newCompletedState) {
          newSet.add(taskId);
        } else {
          newSet.delete(taskId);
        }
        return newSet;
      });

      // Show appropriate toast message
      if (newCompletedState) {
        toast.success(`"${activity.title}" কাজটি সম্পন্ন হয়েছে!`);
      } else {
        toast.success(
          `"${activity.title}" কাজটি আবার অসম্পন্ন তালিকায় যুক্ত হয়েছে!`
        );
      }
    } catch (err) {
      console.error("Update task error:", err);
      toast.error("কাজটি আপডেট করতে সমস্যা হয়েছে");
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!userEmail) return;

    const activityPayload = {
      email: userEmail,
      title: newActivity.title,
      des: newActivity.description,
      priority: newActivity.priority,
      date: newActivity.date,
      farmName: newActivity.farmName,
      farmId: newActivity.farmId,
    };

    try {
      setLoading(true);
      const ress = await axiosInstance.post("/farm-tasks", activityPayload);
      const addedTask = ress.data;
      setActivities((prev) => [...prev, addedTask.task]);
      toast.success("নতুন কাজ যুক্ত হয়েছে!");

      setShowAddActivityForm(false);

      setNewActivity({
        title: "",
        description: "",
        date: "",
        priority: "medium",
        farmName: "",
      });
    } catch (err) {
      console.error("Add activity error:", err);
      toast.error("কাজ যোগ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-blue-500";
      case "pending":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center py-4 text-gray-600 text-sm">
        লগইন তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <button
            onClick={() => setActiveTab("activities")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors w-full sm:w-auto text-center flex items-center justify-center ${
              activeTab === "activities"
                ? "bg-green-800 text-white"
                : "text-gray-600 hover:text-green-800 hover:bg-gray-200"
            }`}
          >
            <FaTasks className="inline mr-2" /> পরবর্তী কাজসমূহ
          </button>
          {activeTab === "activities" && (
            <button
              onClick={() => setShowAddActivityForm(true)}
              className="mt-2 sm:mt-0 bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center w-full sm:w-auto justify-center transition-colors"
            >
              <FaPlus className="mr-2" /> কাজ যোগ
            </button>
          )}
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-600 text-sm">
            লোড হচ্ছে...
          </div>
        ) : activities.length > 0 ? (
          <div className="grid gap-3 max-h-[300px] overflow-y-auto scrollbar-hide">
            {activities.map((activity) => {
              const PriorityIcon = priorityIcons[activity.priority];
              // Check if task is completed using the Set
              const isCompleted = completedTaskIds.has(activity._id);

              return (
                <div
                  key={activity._id}
                  className={`bg-white rounded-lg p-4 border transition-all ${
                    isCompleted
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className={`text-lg mt-1 ${
                            isCompleted
                              ? "text-green-500"
                              : getPriorityColor(activity.priority)
                          }`}
                        >
                          {isCompleted ? <FaCheck /> : <PriorityIcon />}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-base mb-1 ${
                              isCompleted
                                ? "text-green-700 line-through"
                                : "text-gray-800"
                            }`}
                          >
                            {activity.title}
                          </h3>
                          <p
                            className={`text-sm mb-2 ${
                              isCompleted ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            {activity.des}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span
                              className={`flex items-center ${
                                isCompleted ? "text-green-500" : "text-gray-500"
                              }`}
                            >
                              <FaCalendarAlt className="mr-1.5" />
                              {activity.date}
                            </span>

                            {!isCompleted && (
                              <span
                                className={`flex items-center ${getPriorityColor(
                                  activity.priority
                                )}`}
                              >
                                <PriorityIcon className="mr-1.5" />
                                {priorityMap[activity.priority] || "মাধ্যমিক"}
                              </span>
                            )}

                            <span
                              className={`flex items-center ${
                                isCompleted
                                  ? "text-green-900"
                                  : getStatusColor(activity.status)
                              }`}
                            >
                              <FaClock className="mr-1.5" />
                              {isCompleted ? "সম্পন্ন" : activity.status}
                            </span>

                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {activity.farmName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleCompleteTask(activity)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto flex items-center justify-center ${
                          isCompleted
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                        disabled={isCompleted}
                      >
                        <FaCheck className="mr-2" />
                        {isCompleted ? "সম্পন্ন" : "সম্পন্ন করুন"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <FaTasks className="text-2xl text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">কোন নির্ধারিত কাজ নেই</p>
            <p className="text-gray-400 text-xs mt-1">
              নতুন কাজ যোগ করতে উপরের বাটন ক্লিক করুন
            </p>
          </div>
        )}
      </div>

      {/* Activity Modal */}
      <AddActivityModal
        show={showAddActivityForm}
        onClose={() => setShowAddActivityForm(false)}
        onSubmit={handleAddActivity}
        newActivity={newActivity}
        setNewActivity={setNewActivity}
        farms={farms}
        loading={loading}
      />
    </div>
  );
};

export default FarmProgress;
