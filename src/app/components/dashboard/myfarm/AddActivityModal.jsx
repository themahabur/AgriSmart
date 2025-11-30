"use client";
import React from "react";

const AddActivityModal = ({
  show,
  onClose,
  onSubmit,
  newActivity,
  setNewActivity,
  farms,
  loading,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-800 rounded-lg w-full max-w-md border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            নতুন কাজ যোগ করুন
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* কাজের নাম */}
            <div>
              <input
                type="text"
                placeholder="কাজের নাম *"
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, title: e.target.value })
                }
                required
                className="w-full px-3 py-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 focus:bg-white transition-colors"
              />
            </div>

            {/* বিবরণ */}
            <div>
              <textarea
                placeholder="বিবরণ"
                value={newActivity.description}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    description: e.target.value,
                  })
                }
                rows="3"
                className="w-full px-3 py-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* তারিখ */}
            <div>
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, date: e.target.value })
                }
                required
                className="w-full px-3 py-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 focus:bg-white transition-colors"
              />
            </div>

            {/* ফার্ম নির্বাচন */}
            <div>
              <select
                value={newActivity.farmId}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedFarm = farms.find(
                    (farm) => farm.id === selectedId
                  );
                  setNewActivity({
                    ...newActivity,
                    farmId: selectedId,
                    farmName: selectedFarm?.name || "",
                  });
                }}
                required
                className="w-full px-3 py-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 focus:bg-white transition-colors"
              >
                <option value="">ফার্ম নির্বাচন করুন</option>
                {farms.length > 0 ? (
                  farms.map((farm) => (
                    <option
                      key={farm._id || farm.id}
                      value={farm.id || farm._id}
                    >
                      {farm.name}
                    </option>
                  ))
                ) : (
                  <option disabled>কোন ফার্ম পাওয়া যায়নি</option>
                )}
              </select>
            </div>

            {/* Priority */}
            <div>
              <select
                value={newActivity.priority}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, priority: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 focus:bg-white transition-colors"
              >
                <option value="low">নিম্ন</option>
                <option value="medium">মাধ্যমিক</option>
                <option value="high">উচ্চ</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
              >
                {loading ? "যোগ হচ্ছে..." : "যোগ করুন"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
