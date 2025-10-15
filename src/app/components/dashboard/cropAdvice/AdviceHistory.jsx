import React from "react";
import { FaHistory, FaTrash, FaEye, FaRobot, FaCamera } from "react-icons/fa";

const AdviceHistory = ({ history, onClearHistory }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("history", history);

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <FaHistory className="text-4xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          কোনো পরামর্শের ইতিহাস নেই
        </h3>
        <p className="text-gray-500">
          AI দিয়ে প্রশ্ন করুন বা ছবি বিশ্লেষণ করুন
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaHistory className="text-2xl text-green-600 mr-3" />
            <div>
              <h2 className="text-xl font-bold inline-flex items-center text-gray-800">
                <FaHistory className="mr-1" /> পরামর্শের ইতিহাস
              </h2>
              <p className="text-gray-600 text-sm">আপনার আগের সব AI পরামর্শ</p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaTrash />
              <span>সব মুছুন</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {item.type === "ai-diagnosis" ? (
                    <FaRobot className="text-green-600" />
                  ) : (
                    <FaCamera className="text-blue-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {item.type === "ai-diagnosis"
                      ? "AI ডায়াগনসিস"
                      : "ছবি বিশ্লেষণ"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.timestamp)}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.solved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.solved ? "সমাধানকৃত" : "অমীমাংসিত"}
                </span>
              </div>

              {/* Question/Description */}
              {item.question && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 mb-1">প্রশ্ন:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">
                    {item.question}
                  </p>
                </div>
              )}

              {item.description && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 mb-1">বর্ণনা:</h4>
                  <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Image if available */}
              {item.imageUrl && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 mb-1">ছবি:</h4>
                  <img
                    src={item.imageUrl}
                    alt="Crop issue"
                    className="max-h-32 rounded border"
                  />
                </div>
              )}

              {/* AI Response */}
              <div className="mb-3">
                <h4 className="font-semibold text-gray-800 mb-1">
                  AI পরামর্শ:
                </h4>
                <div className="bg-green-50 p-3 rounded border border-green-100">
                  <p className="text-gray-700 text-sm">
                    {(
                      item.answer ||
                      item.diagnosis ||
                      "কোনো উত্তর নেই"
                    ).substring(0, 200)}
                    {(item.answer || item.diagnosis || "").length > 200 &&
                      "..."}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {(item.cropType || item.severity) && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {item.cropType && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      🌱 {item.cropType}
                    </span>
                  )}
                  {item.severity && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      ⚠️ {item.severity}
                    </span>
                  )}
                  {item.symptomArea && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                      📍 {item.symptomArea}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdviceHistory;
