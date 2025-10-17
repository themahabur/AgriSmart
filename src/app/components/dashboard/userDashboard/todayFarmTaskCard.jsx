import React from "react";

const todayFarmTaskCard = ({ task }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3
          className={`font-medium ${
            task.status === "completed"
              ? "line-through text-green-700"
              : "text-gray-800"
          }`}
        >
          {task.task}
        </h3>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-600">
            <FaClock className="inline mr-1" />
            {task.time}
          </span>
          <span className="text-sm text-gray-600">
            <FaLeaf className="inline mr-1" />
            {task.crop}
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
      <button
        className={`ml-4 p-2 rounded-full transition-colors ${
          task.status === "completed"
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
        }`}
      >
        <FaCheck className="text-sm" />
      </button>
    </div>
  );
};

export default todayFarmTaskCard;
