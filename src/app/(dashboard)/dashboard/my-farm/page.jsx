"use client";
import React, { useState, useEffect } from "react";
import { FaTractor, FaPlus, FaChevronDown } from "react-icons/fa";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
// const API_BASE_URL = "https://agri-smart-server.vercel.app";

import AddFarmModal from "../../../components/dashboard/myfarm/AddFarmModal";
import FarmCard from "../../../components/dashboard/myfarm/FarmCard";
import FarmProgress from "../../../components/dashboard/myfarm/FarmProgress";
import QuickActions from "../../../components/dashboard/myfarm/QuickActions";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

const MyFarmPage = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFarm, setEditingFarm] = useState(null);
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [lastSubmittedFarm, setLastSubmittedFarm] = useState(null);
  const [showSubmittedData, setShowSubmittedData] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const { data: session, status } = useSession();

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "সেচ প্রদান",
      description: "প্রধান ফার্মে সেচ দেওয়া প্রয়োজন",
      date: "২০২৫-১০-১০",
      status: "সম্পন্ন",
      priority: "উচ্চ",
      category: "irrigation",
    },
    {
      id: 2,
      title: "সার প্রয়োগ",
      description: "ইউরিয়া সার প্রয়োগ করতে হবে",
      date: "২০২৫-১০-১২",
      status: "চলমান",
      priority: "মাধ্যমিক",
      category: "fertilizer",
    },
    {
      id: 3,
      title: "ফসল কাটা",
      description: "ধান কাটার জন্য প্রস্তুতি নিতে হবে",
      date: "২০২৫-১১-১৫",
      status: "পরবর্তী",
      priority: "উচ্চ",
      category: "harvest",
    },
  ]);

  // Fetch farms
  useEffect(() => {
    // Don't fetch if user is not authenticated
    if (status === "loading") return;
    
    if (!session?.user?.email) {
      setLoading(false);
      setError("ব্যবহারকারী নথিভুক্ত করা হয়নি। অনুগ্রহ করে লগইন করুন।");
      return;
    }

    const fetchFarms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using axiosInstance for better error handling
        const response = await axiosInstance.get(`/farms/${session.user.email}`);
        
        if (response.data.status && response.data.data) {
          setFarms(response.data.data.farms || response.data.data);
        } else {
          setFarms([]);
        }
      } catch (err) {
        console.error("Error fetching farms:", err);
        const errorMessage = err.response?.data?.message || 
                            err.message || 
                            "ফার্ম ডেটা লোড করতে সমস্যা হয়েছে";
        setError(errorMessage);
        toast.error(errorMessage);
        setFarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, [session?.user?.email, status]);

  const displayedFarms = selectedFarmId
    ? farms.filter(
        (farm) => farm._id === selectedFarmId || farm.id === selectedFarmId
      )
    : farms;

  // Add farm
  const handleAddFarm = async (farmData) => {
    try {
      setLoading(true);

      const farmPayload = {
        userEmail: session?.user?.email,
        name: farmData.name,
        location: farmData.location,
        sizeAcre: parseFloat(farmData.size) || 0,
        coordinates: { latitude: 0, longitude: 0 },
        cropDetails: {
          type: farmData.cropType,
          variety: farmData.cropVariety,
          plantingDate: farmData.plantingDate,
        },
        soilDetails: {
          type: farmData.soilType,
          pH: parseFloat(farmData.soilPH) || 0,
          nutrients: "অজানা",
        },
        irrigation: {
          source: farmData.irrigationSource,
          lastDate: new Date().toISOString().split("T")[0],
          tubeWellDepth: parseInt(farmData.tubeWellDepth) || null,
        },
        pestAlert: false,
        organicPractices: farmData.organicPractices,
      };

      if (!farmPayload?.userEmail) throw new Error("User email missing");

      const res = await axiosInstance.post("/farms", farmPayload);
      const newFarm = res.data.data || res.data;
      setFarms([newFarm, ...farms]);
      setLastSubmittedFarm(farmData);
      setShowSubmittedData(true);
      toast.success("নতুন ফার্ম সফলভাবে যুক্ত হয়েছে! 🎉");
      setShowAddFormModal(false);
      setEditingFarm(null);
      setError(null);

      setTimeout(() => setShowSubmittedData(false), 10000);
    } catch (err) {
      console.error("Error adding farm:", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "ফার্ম যোগ করতে সমস্যা হয়েছে";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update farm
  const handleUpdateFarm = async (farmId, updatedData) => {
    try {
      setLoading(true);

      const updatePayload = {
        name: updatedData.name,
        location: updatedData.location,
        sizeAcre: parseFloat(updatedData.size) || 0,
        cropDetails: {
          type: updatedData.cropType,
          variety: updatedData.cropVariety,
          plantingDate: updatedData.plantingDate,
        },
        soilDetails: {
          type: updatedData.soilType,
          pH: parseFloat(updatedData.soilPH) || 0,
          nutrients: "অজানা",
        },
        irrigation: {
          source: updatedData.irrigationSource,
          lastDate: new Date().toISOString().split("T")[0],
          tubeWellDepth: parseInt(updatedData.tubeWellDepth) || null,
        },
        organicPractices: updatedData.organicPractices,
      };

      const response = await axiosInstance.put(`/farms/${farmId}`, updatePayload);

      const updatedFarm = response.data.data || response.data;

      setFarms(
        farms.map((farm) =>
          farm.id === farmId || farm._id === farmId ? updatedFarm : farm
        )
      );

      toast.success("ফার্ম সফলভাবে আপডেট হয়েছে! ✅");
      setShowAddFormModal(false);
      setEditingFarm(null);
      setError(null);
    } catch (err) {
      console.error("Error updating farm:", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "ফার্ম আপডেট করতে সমস্যা হয়েছে";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Edit farm
  const handleEditFarm = (farm) => {
    setEditingFarm(farm);
    setShowAddFormModal(true);
  };

  // Delete farm (with toast confirmation)
  const handleDeleteFarm = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-3">
          <p className="font-semibold text-gray-800">
            আপনি কি নিশ্চিত এই ফার্মটি মুছে ফেলতে চান?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDeleteFarm(id);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              হ্যাঁ, মুছে ফেলুন
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400"
            >
              বাতিল
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  // Confirm delete
  const confirmDeleteFarm = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/farms/${id}`);

      setFarms(farms.filter((farm) => farm.id !== id && farm._id !== id));
      toast.success("ফার্ম সফলভাবে মুছে ফেলা হয়েছে");
      setError(null);
    } catch (err) {
      console.error("Error deleting farm:", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "ফার্ম ডিলিট করতে সমস্যা হয়েছে";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = (activity) =>
    setActivities([...activities, activity]);

  const handleUpdateActivity = (id, updates) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const handleQuickActionClick = (action) => {
    console.log("Quick action clicked:", action);
  };

  const handleCloseModal = () => {
    setShowAddFormModal(false);
    setEditingFarm(null);
    setLastSubmittedFarm(null);
    setShowSubmittedData(false);
  };

  return (
    <div className="flex flex-col font-hind px-1 sm:p-6 md:p-8 md:pb-0 md:max-h-screen bg-white overflow-y-auto scrollbar-hide ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-6 ">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-start">
            আমার ফার্ম পরিচালনা
          </h1>
          <p className="text-gray-600 mt-2">
            আপনার সব ফার্ম এবং কৃষি কাজের এককেন্দ্রিক পরিচালনা
          </p>
        </div>
        <button
          onClick={() => {
            setEditingFarm(null);
            setShowAddFormModal(true);
          }}
          className="mt-4 md:mt-0 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-md disabled:opacity-50"
          disabled={loading || !session?.user?.email}
        >
          <FaPlus className="mr-2" />
          নতুন ফার্ম যুক্ত করুন
        </button>
      </div>

      {/* Add Farm Modal */}
      <AddFarmModal
        isOpen={showAddFormModal}
        onClose={handleCloseModal}
        onAddFarm={handleAddFarm}
        onUpdateFarm={handleUpdateFarm}
        editingFarm={editingFarm}
      />

      {/* Submitted Data */}
      {showSubmittedData && lastSubmittedFarm && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                সফলভাবে সাবমিট হয়েছে! 🎉
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    সাধারণ তথ্য
                  </h3>
                  <p>
                    <b>নাম:</b> {lastSubmittedFarm.name}
                  </p>
                  <p>
                    <b>অবস্থান:</b> {lastSubmittedFarm.location}
                  </p>
                  <p>
                    <b>আকার:</b> {lastSubmittedFarm.size} একর
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSubmittedData(false)}
              className="text-green-600 hover:text-green-800 ml-4 p-2 hover:bg-green-100 rounded-full transition-colors"
            >
              <FaPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <p className="text-red-800 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Farms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTractor className="text-green-600 mr-2" />
                আমার ফার্মসমূহ ({displayedFarms.length}টি)
              </h2>
              <div className="mb-4 relative inline-block">
                <select
                  value={selectedFarmId}
                  onChange={(e) => setSelectedFarmId(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md pl-3 py-2 text-gray-700 pr-8 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors cursor-pointer"
                >
                  <option value="">সকল ফার্ম দেখান</option>
                  {farms.map((farm) => (
                    <option
                      key={farm._id || farm.id}
                      value={farm._id || farm.id}
                    >
                      {farm.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="p-4">
              {loading ? (
                <div className="text-center py-8">লোড হচ্ছে...</div>
              ) : displayedFarms.length === 0 ? (
                <div className="text-center py-8">
                  <FaTractor className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">
                    এখনও কোন ফার্ম যুক্ত করা হয়নি
                  </p>
                  <button
                    onClick={() => {
                      setEditingFarm(null);
                      setShowAddFormModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors disabled:opacity-50"
                    disabled={loading || !session?.user?.email}
                  >
                    <FaPlus className="mr-2" />
                    প্রথম ফার্ম যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:max-h-screen md:overflow-y-auto scrollbar-hide"> 
                  {displayedFarms.map((farm, index) => (
                    <FarmCard
                      key={farm.id || farm._id || `farm-${index}`}
                      farm={farm}
                      onEdit={handleEditFarm}
                      onDelete={handleDeleteFarm}
                      loading={loading}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6 ">
          <FarmProgress
            farms={farms}
            activities={activities}
            onAddActivity={handleAddActivity}
            onUpdateActivity={handleUpdateActivity}
          />
          <QuickActions onActionClick={handleQuickActionClick} />
        </div>
      </div>
    </div>
  );
};

export default MyFarmPage;