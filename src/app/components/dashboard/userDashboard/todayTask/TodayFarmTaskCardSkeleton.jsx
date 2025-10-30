import React from "react";

const TodayFarmTaskCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 bg-white border-gray-200 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>

          {/* Description skeleton */}
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>

          {/* Meta info skeleton */}
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="ml-4">
          <div className="h-10 w-24 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default TodayFarmTaskCardSkeleton;
