"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaSeedling,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaPause,
  FaCalendarAlt as FaPlanning,
} from "react-icons/fa";

const FarmCard = ({ farm, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "চলমান":
        return "bg-green-100 text-green-800";
      case "পরিকল্পনাধীন":
        return "bg-blue-100 text-blue-800";
      case "সম্পন্ন":
        return "bg-gray-100 text-gray-800";
      case "বিলম্বিত":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "চলমান":
        return <FaCheckCircle className="w-3 h-3" />;
      case "পরিকল্পনাধীন":
        return <FaPlanning className="w-3 h-3" />;
      case "সম্পন্ন":
        return <FaPause className="w-3 h-3" />;
      case "বিলম্বিত":
        return <FaClock className="w-3 h-3" />;
      default:
        return <FaClock className="w-3 h-3" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Farm Name */}
          <h3 className="font-bold text-lg text-gray-800 mb-2">{farm.name}</h3>

          {/* Location */}
          <p className="text-gray-600 flex items-center mb-3">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {farm.location}
          </p>

          {/* Farm Details Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              <FaRulerCombined className="mr-1" />
              {farm.size}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              <FaSeedling className="mr-1" />
              {farm.crop}
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded flex items-center ${getStatusColor(
                farm.status
              )}`}
            >
              {getStatusIcon(farm.status)}
              <span className="ml-1">{farm.status}</span>
            </span>
            {farm.pestAlert && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                <FaExclamationTriangle className="mr-1" />
                সতর্কতা
              </span>
            )}
            {farm.organicPractices && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                অর্গানিক
              </span>
            )}
          </div>

          {/* Additional Info */}
          {farm.cropDetails && (
            <div className="bg-gray-50 rounded-md p-3 mb-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {farm.cropDetails.variety && (
                  <div>
                    <span className="text-gray-600">জাত:</span>
                    <span className="ml-1 font-medium">
                      {farm.cropDetails.variety}
                    </span>
                  </div>
                )}
                {farm.cropDetails.plantingDate && (
                  <div>
                    <span className="text-gray-600">রোপণ:</span>
                    <span className="ml-1 font-medium">
                      {new Date(
                        farm.cropDetails.plantingDate
                      ).toLocaleDateString("bn-BD")}
                    </span>
                  </div>
                )}
                {farm.soilDetails?.type && (
                  <div>
                    <span className="text-gray-600">মাটি:</span>
                    <span className="ml-1 font-medium">
                      {farm.soilDetails.type}
                    </span>
                  </div>
                )}
                {farm.irrigation?.source && (
                  <div>
                    <span className="text-gray-600">সেচ:</span>
                    <span className="ml-1 font-medium">
                      {farm.irrigation.source}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Last Update */}
          <div className="text-sm text-gray-500 flex items-center">
            <FaClock className="mr-1" />
            শেষ আপডেট: {farm.lastUpdate}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 ml-4">
          <button
            title="সম্পাদনা করুন"
            onClick={() => onEdit && onEdit(farm)}
            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-md transition-colors"
          >
            <FaEdit />
          </button>
          <button
            title="মুছে ফেলুন"
            onClick={() => onDelete && onDelete(farm.id)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-md transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
