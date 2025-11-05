import React, { useEffect, useState, useCallback } from "react";
import TodayFarmTaskCard from "./todayFarmTaskCard";
import { FaClock } from "react-icons/fa";
import Link from "next/link";
import EmptyFarmTasks from "./EmptyFarmTasks";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import TodayFarmTaskCardSkeleton from "./TodayFarmTaskCardSkeleton";

const TodayTask = () => {
  const [farmTasks, setFarmTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  // Cache key for storing tasks
  const CACHE_KEY = `todayFarmTasks_${session?.user?.email}`;
  const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

  // Function to get cached data
  const getCachedData = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Check if cache is still valid
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        } else {
          // Remove expired cache
          localStorage.removeItem(CACHE_KEY);
        }
      }
      return null;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }, [CACHE_KEY]);

  // Function to set cached data
  const setCachedData = useCallback((data) => {
    try {
      const cacheEntry = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
    } catch (error) {
      console.error("Error writing to cache:", error);
    }
  }, [CACHE_KEY]);

  // Fetch today's farm tasks
  useEffect(() => {
    const fetchFarmTasks = async () => {
      setLoading(true);
      setError(null);
      
      // Try to get cached data first
      const cachedData = getCachedData();
      if (cachedData) {
        setFarmTasks(cachedData);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/farm-tasks/${session?.user?.email}`, {
          params: {
            status: "in-progress",
            page: 1,
            limit: 10
          }
        });
        
        if (response.data?.tasks) {
          setFarmTasks(response.data.tasks);
          // Cache the data
          setCachedData(response.data.tasks);
        }
        setLoading(false);
      } catch (error) {
        console.error("Farm tasks fetch error:", error);
        setError(error.message || "Failed to fetch tasks");
        // Try to use cached data even if API fails
        const cachedData = getCachedData();
        if (cachedData) {
          setFarmTasks(cachedData);
        }
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchFarmTasks();
    }
  }, [session?.user?.email, getCachedData, setCachedData]);

  if (loading) {
    return <TodayFarmTaskCardSkeleton />;
  }

  // Check if there are no tasks
  if (!farmTasks || (farmTasks.length === 0 && !loading)) {
    return <EmptyFarmTasks />;
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FaClock className="mr-2 text-green-600" />
            আজকের কাজ
          </h2>
          <Link
            href="/dashboard/my-farm"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="space-y-4">
          {farmTasks?.map((task) => (
            <TodayFarmTaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayTask;