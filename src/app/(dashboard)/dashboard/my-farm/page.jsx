'use client';
import React, { useState } from 'react';
import {
  FaTractor,
  FaSeedling,
  FaCalendarAlt,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCloudSun,
  FaTint,
  FaLeaf,
  FaTasks,
  FaHistory,
} from 'react-icons/fa';

const MyFarmPage = () => {
  // State for farm data
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: 'আমার প্রধান ফার্ম',
      location: 'সিলেট, বাংলাদেশ',
      size: '২.৫ একর',
      crop: 'ধান',
      status: 'চলমান',
      lastUpdate: '২ দিন আগে',
    },
    {
      id: 2,
      name: 'আমার বাগান',
      location: 'সিলেট, বাংলাদেশ',
      size: '০.৫ একর',
      crop: 'সবজি',
      status: 'পরিকল্পনাধীন',
      lastUpdate: '৫ দিন আগে',
    },
  ]);

  // State for activities
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'সেচ প্রদান',
      date: '২০২৫-১০-১০',
      status: 'সম্পন্ন',
      priority: 'উচ্চ',
    },
    {
      id: 2,
      title: 'সার প্রয়োগ',
      date: '২০২৫-১০-১২',
      status: 'চলমান',
      priority: 'মাধ্যমিক',
    },
    {
      id: 3,
      title: 'ফসল কাটা',
      date: '২০২৫-১১-১৫',
      status: 'পরবর্তী',
      priority: 'উচ্চ',
    },
  ]);

  // State for weather data
  const [weatherData] = useState({
    temperature: '২৮°C',
    humidity: '৬৫%',
    condition: 'সূর্যোজ্জ্বল',
    forecast: 'গত ২ দিনের মধ্যে বৃষ্টির সম্ভাবনা নেই',
  });

  // State for soil data
  const [soilData] = useState({
    pH: '৬.৫',
    moisture: '৬০%',
    nutrients: 'মাধ্যমিক',
  });

  // State for adding new farm
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    size: '',
    crop: '',
  });

  // Handle adding a new farm
  const handleAddFarm = e => {
    e.preventDefault();
    if (newFarm.name && newFarm.location && newFarm.size && newFarm.crop) {
      const farm = {
        id: farms.length + 1,
        ...newFarm,
        status: 'পরিকল্পনাধীন',
        lastUpdate: 'এই মুহূর্তে',
      };
      setFarms([...farms, farm]);
      setNewFarm({ name: '', location: '', size: '', crop: '' });
      setShowAddForm(false);
    }
  };

  // Handle input changes for new farm
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewFarm({ ...newFarm, [name]: value });
  };

  // Handle deleting a farm
  const handleDeleteFarm = id => {
    setFarms(farms.filter(farm => farm.id !== id));
  };

  return (
    <div className="flex flex-col font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <FaTractor className="text-green-600 mr-3" />
            আমার ফার্ম পরিচালনা
          </h1>
          <p className="text-gray-600 mt-2">
            আপনার সব ফার্ম এবং কৃষি কাজের এককেন্দ্রিক পরিচালনা
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          নতুন ফার্ম যুক্ত করুন
        </button>
      </div>

      {/* Add Farm Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-xl border border-green-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            নতুন ফার্ম যুক্ত করুন
          </h2>
          <form onSubmit={handleAddFarm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">ফার্মের নাম</label>
                <input
                  type="text"
                  name="name"
                  value={newFarm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="আপনার ফার্মের নাম লিখুন"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">অবস্থান</label>
                <input
                  type="text"
                  name="location"
                  value={newFarm.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ফার্মের অবস্থান"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  ফার্মের আকার (একরে)
                </label>
                <input
                  type="text"
                  name="size"
                  value={newFarm.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ফার্মের আকার"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">চাষের ফসল</label>
                <input
                  type="text"
                  name="crop"
                  value={newFarm.crop}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="চাষের ফসল"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                ফার্ম যুক্ত করুন
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                বাতিল করুন
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Farms List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Weather Card */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCloudSun className="text-blue-600 mr-2" />
                আবহাওয়া
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {weatherData.temperature}
                  </p>
                  <p className="text-gray-600">{weatherData.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">
                    <FaTint className="inline mr-1 text-blue-500" />
                    {weatherData.humidity}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {weatherData.forecast}
                  </p>
                </div>
              </div>
            </div>

            {/* Soil Health Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="text-green-600 mr-2" />
                মাটির স্বাস্থ্য
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">পিএইচ মান</span>
                  <span className="font-semibold">{soilData.pH}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">আর্দ্রতা</span>
                  <span className="font-semibold">{soilData.moisture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">পুষ্টি মাত্রা</span>
                  <span className="font-semibold">{soilData.nutrients}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Farms List */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTractor className="text-green-600 mr-2" />
                আমার ফার্মসমূহ
              </h2>
            </div>
            <div className="p-4">
              {farms.length === 0 ? (
                <div className="text-center py-8">
                  <FaTractor className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    এখনও কোন ফার্ম যুক্ত করা হয়নি
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    প্রথম ফার্ম যুক্ত করুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {farms.map(farm => (
                    <div
                      key={farm.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {farm.name}
                          </h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1 text-red-500" />
                            {farm.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {farm.size}
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {farm.crop}
                            </span>
                            <span
                              className={`${
                                farm.status === 'চলমান'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              } text-xs font-medium px-2.5 py-0.5 rounded`}
                            >
                              {farm.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-2">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteFarm(farm.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        শেষ আপডেট: {farm.lastUpdate}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Activities */}
        <div className="lg:col-span-1">
          {/* Upcoming Activities */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaTasks className="text-green-600 mr-2" />
                পরবর্তী কাজসমূহ
              </h2>
            </div>
            <div className="p-4">
              {activities.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোন নির্ধারিত কাজ নেই
                </p>
              ) : (
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div
                      key={activity.id}
                      className="border-l-4 border-green-500 pl-4 py-1"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {activity.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            activity.priority === 'উচ্চ'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {activity.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {activity.date}
                      </p>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                          activity.status === 'সম্পন্ন'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'চলমান'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaHistory className="text-green-600 mr-2" />
                দ্রুত কাজ
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <FaSeedling className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    ফসল উপদেশ
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <FaCalendarAlt className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    কৃষি ক্যালেন্ডার
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <FaChartLine className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    বাজার দাম
                  </span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <FaCloudSun className="text-2xl text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    আবহাওয়া
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFarmPage;
