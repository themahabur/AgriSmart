import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";

export const getDashboardCardData = async (userEmail) => {
  try {
    if (!userEmail) {
      console.warn("No user email provided");
      return { farmCount: 0, taskCount: 0 };
    }
    
    // Fetch farms data
    const farmsResponse = await axiosInstance.get(`/farms/${userEmail}`);
    const farmsData = farmsResponse.data;
    const farmCount = farmsData?.data?.farms?.length || farmsData?.data?.length || 0;
    
    // Fetch tasks data
    const tasksResponse = await axiosInstance.get(`/farm-tasks/${userEmail}`);
    const tasksData = tasksResponse.data;
    const taskCount = tasksData?.tasks?.length || 0;
    
    return {
      farmCount,
      taskCount
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { farmCount: 0, taskCount: 0 };
  }
};