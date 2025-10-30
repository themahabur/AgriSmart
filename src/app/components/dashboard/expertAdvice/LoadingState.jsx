"use client";

import React from "react";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
        >
          {/* Header skeleton */}
          <div className="bg-gray-100 p-6 border-b border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            </div>
            <div className="text-center">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>

          {/* Body skeleton */}
          <div className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="px-6 pb-6">
            <div className="h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
