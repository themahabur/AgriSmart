import React from "react";
import QuickStatsCard from "./QuickStatsCard";
import { FaSeedling } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { getQuickStats } from "../../utils/homeCardUtils";
import { useSession } from "next-auth/react";

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
      getQuickStats(userEmail).then(data => {
        setQuickStats([
          {
            title: "মোট ফসল",
            value: `${data.farmCount}টি`,
            icon: FaSeedling,
            color: "bg-green-500",
            change: `+${data.farmCount}`,
            changeType: "positive",
          },
          {
            title: "আজকের কাজ",
            value: `${data.taskCount}টি`,
            icon: IoMdCheckmark,
            color: "bg-blue-500",
            change: `${data.taskCount} সম্পূর্ণ`,
            changeType: "neutral",
          },
        ]);
      }).catch(error => {
        console.error("Error fetching dashboard data:", error);
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