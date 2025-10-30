import React, { Suspense } from "react";
import QuickStatsCard from "./QuickStatsCard";
import { FaSeedling } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { getDashboardCardData } from "../../utils/homeCardUtils";
import { useSession } from "next-auth/react";

// Create a function to fetch data
const fetchDashboardData = async (userEmail) => {
  if (!userEmail) {
    return { farmCount: 0, taskCount: 0 };
  }
  
  try {
    const data = await getDashboardCardData(userEmail);
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { farmCount: 0, taskCount: 0 };
  }
};

const QuickStat = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  
  // Since we're in a client component, we'll use a simpler approach
  // In a real implementation, you might want to use SWR or React Query for data fetching
  const [quickStats, setQuickStats] = React.useState([
    {
      title: "মোট ফসল",
      value: "০টি",
      icon: FaSeedling,
      color: "bg-green-500",
      change: "+০",
      changeType: "positive",
    },
    {
      title: "আজকের কাজ",
      value: "০টি",
      icon: IoMdCheckmark,
      color: "bg-blue-500",
      change: "০ সম্পূর্ণ",
      changeType: "neutral",
    },
  ]);

  React.useEffect(() => {
    if (userEmail) {
      fetchDashboardData(userEmail).then(data => {
        setQuickStats([
          {
            title: "মোট ফসল",
            value: `${data.farmCount || 0}টি`,
            icon: FaSeedling,
            color: "bg-green-500",
            change: `+${data.farmCount || 0}`,
            changeType: "positive",
          },
          {
            title: "আজকের কাজ",
            value: `${data.taskCount || 0}টি`,
            icon: IoMdCheckmark,
            color: "bg-blue-500",
            change: `${data.taskCount || 0} সম্পূর্ণ`,
            changeType: "neutral",
          },
        ]);
      });
    }
  }, [userEmail]);

  return (
    <>
      {quickStats.map((stat, index) => (
        <QuickStatsCard key={index} stat={stat} />
      ))}
    </>
  );
};

export default QuickStat;