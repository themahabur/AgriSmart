import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const QuickStatsCard = ({ stat }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`${stat.color} p-3 rounded-lg text-white text-xl`}>
          <stat.icon />
        </div>
        <div
          className={`text-sm px-2 py-1 rounded-full ${
            stat.changeType === "positive"
              ? "bg-green-100 text-green-700"
              : stat.changeType === "negative"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {stat.changeType === "positive" && (
            <FaArrowUp className="inline mr-1" />
          )}
          {stat.changeType === "negative" && (
            <FaArrowDown className="inline mr-1" />
          )}
          {stat.change}
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
    </div>
  );
};

export default QuickStatsCard;
