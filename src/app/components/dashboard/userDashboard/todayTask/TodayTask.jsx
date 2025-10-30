import React from "react";
import TodayFarmTaskCard from "./todayFarmTaskCard";
import { FaClock } from "react-icons/fa";
import Link from "next/link";

const TodayTask = ({ farmTasks }) => {
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
