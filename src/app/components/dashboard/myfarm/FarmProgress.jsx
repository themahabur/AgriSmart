"use client";
import React, { useState, useEffect } from "react";
import { FaTasks, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const API_BASE_URL = "https://agri-smart-server.vercel.app/api";

const priorityMap = { low: "নিম্ন", medium: "মাধ্যমিক", high: "উচ্চ" };

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
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email || "";

  // Fetch tasks
  useEffect(() => {
    if (!userEmail) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/farm-tasks/${userEmail}`);
        if (!res.ok) {
          if (res.status === 404) {
            setActivities([]);
            return;
          }
          const text = await res.text();
          throw new Error(`Failed to fetch tasks: ${text}`);
        }
        const data = await res.json();
        setActivities(data.tasks || []);
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

  // Add new activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!userEmail) return;

    const activityPayload = {
      email: userEmail,
      title: newActivity.title,
      des: newActivity.description,
      priority: newActivity.priority,
      status: newActivity.status,
      date: newActivity.date,
      farmName: newActivity.farmName,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/farm-tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityPayload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add activity");
      }

      const addedTask = await res.json();
      // Add the task returned by backend
      setActivities((prev) => [...prev, addedTask.task]);
      toast.success("নতুন কাজ যুক্ত হয়েছে!");

      // Reset form
      setShowAddActivityForm(false);
      setNewActivity({
        title: "",
        description: "",
        date: "",
        priority: "medium",
        farmName: "",
        status: "pending",
      });
    } catch (err) {
      console.error("Add activity error:", err);
      toast.error("কাজ যোগ করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center py-8 text-gray-500">
        লগইন তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setActiveTab("activities")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "activities"
                ? "bg-green-100 text-green-800"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FaTasks className="inline mr-2" /> পরবর্তী কাজসমূহ
          </button>
          {activeTab === "activities" && (
            <button
              onClick={() => setShowAddActivityForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
            >
              <FaPlus className="mr-2" /> কাজ যোগ করুন
            </button>
          )}
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-8">লোড হচ্ছে...</div>
        ) : activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="border-l-4 border-green-500 pl-4 py-3 bg-gray-50 rounded-md mb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{activity.des}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-1" /> {activity.date}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                      {priorityMap[activity.priority] || "মাধ্যমিক"}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FaTasks className="text-4xl text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">কোন নির্ধারিত কাজ নেই</p>
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
                <input
                  type="text"
                  placeholder="কাজের নাম *"
                  value={newActivity.title}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="বিবরণ"
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, date: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={newActivity.farmName}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, farmName: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">ফার্ম নির্বাচন করুন</option>
                  {farms.length > 0 ? (
                    farms.map((farm) => (
                      <option key={farm._id || farm.id} value={farm.name}>
                        {farm.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>কোন ফার্ম পাওয়া যায়নি</option>
                  )}
                </select>
                <select
                  value={newActivity.priority}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="low">নিম্ন</option>
                  <option value="medium">মাধ্যমিক</option>
                  <option value="high">উচ্চ</option>
                </select>

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
