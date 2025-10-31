import React, { useEffect, useState } from "react";
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

  // Fetch today's farm tasks
  useEffect(() => {
    setLoading(true);
    setError(null);
    const farmTask = async () => {
      try {
        const res = await axiosInstance.get(
          `/farm-tasks/${session?.user?.email}`,
          {
            params: {
              status: "in-progress",
              page: 2,
              limit: 10,
            },
          }
        );
        setFarmTasks(res.data.tasks);
        setLoading(false);
        // console.log("Today's farm tasks:", res.data.tasks);
      } catch (error) {
        console.error("Farm tasks fetch error:", error);
      }
    };
    farmTask();
  }, []);
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
