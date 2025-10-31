import axiosInstance from "@/lib/axios";

export const getDashboardCardData = async (userEmail) => {
  try {
    if (!userEmail) {
      console.warn("No user email provided");
      return { farmCount: "০", taskCount: "০" };
    }
    
    // Fetch farms data
    const farmsResponse = await axiosInstance.get(`/farms/${userEmail}`);
    const farmsData = farmsResponse.data;
    const farmCount = farmsData?.data?.farms?.length || farmsData?.data?.length || 0;
    
    // Fetch tasks data
    const tasksResponse = await axiosInstance.get(`/farm-tasks/${userEmail}`);
    const tasksData = tasksResponse.data;
    const taskCount = tasksData?.tasks?.length || 0;
    
    // Format numbers in Bangla
    const formatter = new Intl.NumberFormat('bn-BD');
    const formattedFarmCount = formatter.format(farmCount);
    const formattedTaskCount = formatter.format(taskCount);
    
    return {
      farmCount: formattedFarmCount,
      taskCount: formattedTaskCount
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { farmCount: "০", taskCount: "০" };
  }
};