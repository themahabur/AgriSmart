import React, { Suspense, use } from "react";
import QuickStatsCard from "./QuickStatsCard";
import { FaSeedling } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const statsData = fetch(
  "https://agri-smart-server.vercel.app/api/dashboard/user/mdanayet.dev@gmail.com"
).then((res) => res.json());

const QuickStat = () => {
  // Fetch the data
  const data = use(statsData);

  // Prepare quick stats data
  const quickStats = [
    {
      title: "মোট ফসল",
      value: data?.farmCount || "০টি",
      icon: FaSeedling,
      color: "bg-green-500",
      change: "+২",
      changeType: "positive",
    },
    {
      title: "আজকের কাজ",
      value: data?.taskCount || "০টি",
      icon: IoMdCheckmark,
      color: "bg-blue-500",
      change: "১ সম্পূর্ণ",
      changeType: "neutral",
    },
  ];
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {quickStats.map((stat, index) => (
          <QuickStatsCard key={index} stat={stat} />
        ))}
      </Suspense>
    </>
  );
};

export default QuickStat;
