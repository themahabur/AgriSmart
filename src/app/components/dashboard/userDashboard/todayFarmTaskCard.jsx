import React, { useState } from "react";
import { FaClock, FaLeaf } from "react-icons/fa";

const TodayFarmTaskCard = ({ task }) => {
  const [status, setStatus] = useState(task.status);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 ${
        task.status === "completed"
          ? "bg-green-50 border-green-200 opacity-75"
          : "bg-white border-gray-200 hover:border-green-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`font-medium ${
              status === "completed"
                ? "line-through text-green-700"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{task.des}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm text-gray-600">
              <FaClock className="inline mr-1" />
              {new Date(task.date).toLocaleTimeString()}
            </span>
            <span className="text-sm text-gray-600">
              <FaLeaf className="inline mr-1" />
              {task.farmName}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className={`p-2 rounded-md text-sm ${
              status === "completed"
                ? "bg-green-500 text-white"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodayFarmTaskCard;
