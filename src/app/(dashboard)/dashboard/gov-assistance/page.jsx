'use client';

import React, { useState } from 'react';
import {
  FaLandmark,
  FaSearch,
  FaFilter,
  FaFileAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
  FaDownload,
  FaUser,
  FaSeedling,
  FaTractor,
  FaWater,
  FaChartLine,
} from 'react-icons/fa';

const GovAssistancePage = () => {
  // State for government schemes
  const [schemes] = useState([
    {
      id: 1,
      title: 'কৃষক উন্নয়ন সহায়তা প্রকল্প',
      category: 'অর্থায়ন',
      description: 'ছোট ও মাঝারি কৃষকদের জন্য আর্থিক সহায়তা প্রদান',
      eligibility: '১ একর থেকে ৫ একর জমির মালিক',
      amount: '৫০,০০০ ৳',
      deadline: '২০২৫-১২-৩১',
      status: 'চলমান',
      applicationDate: '২০২৫-১০-১৫',
      applied: false,
    },
    {
      id: 2,
      title: 'জৈব চাষ উন্নয়ন প্রকল্প',
      category: 'প্রযুক্তি',
      description: 'জৈব চাষ পদ্ধতি অবলম্বনে প্রয়োজনীয় সরঞ্জাম ও প্রশিক্ষণ',
      eligibility: 'জৈব সার্টিফিকেটধারী কৃষক',
      amount: '৩০,০০০ ৳',
      deadline: '২০২৫-১১-৩০',
      status: 'নতুন',
      applicationDate: '২০২৫-১০-১০',
      applied: true,
    },
    {
      id: 3,
      title: 'সেচ সুবিধা প্রকল্প',
      category: 'পরিকাঠামো',
      description: 'আধুনিক সেচ ব্যবস্থা স্থাপনে আর্থিক সহায়তা',
      eligibility: 'সেচ ব্যবস্থা ছাড়া ফার্ম',
      amount: '১,০০,০০০ ৳',
      deadline: '২০২৫-১০-৩১',
      status: 'শীঘ্রই শুরু',
      applicationDate: '২০২৫-০৯-২০',
      applied: false,
    },
    {
      id: 4,
      title: 'মহিলা কৃষক কল্যাণ প্রকল্প',
      category: 'সামাজিক কল্যাণ',
      description: 'মহিলা কৃষকদের জন্য বিশেষ আর্থিক ও প্রশিক্ষণ সহায়তা',
      eligibility: 'মহিলা কৃষক',
      amount: '২৫,০০০ ৳',
      deadline: '২০২৫-১২-১৫',
      status: 'চলমান',
      applicationDate: '২০২৫-১০-০৫',
      applied: true,
    },
  ]);

  // State for applications
  const [applications] = useState([
    {
      id: 1,
      scheme: 'জৈব চাষ উন্নয়ন প্রকল্প',
      status: 'অনুমোদিত',
      date: '২০২৫-১০-১০',
      amount: '৩০,০০০ ৳',
    },
    {
      id: 2,
      scheme: 'মহিলা কৃষক কল্যাণ প্রকল্প',
      status: 'প্রক্রিয়াধীন',
      date: '২০২৫-১০-০৫',
      amount: '২৫,০০০ ৳',
    },
  ]);

  // State for assistance statistics
  const [assistanceStats] = useState({
    totalSchemes: 24,
    activeSchemes: 8,
    totalApplications: 12,
    approvedApplications: 7,
  });

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [statusFilter, setStatusFilter] = useState('সব');

  // Filtered schemes based on search and filters
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'সব' || scheme.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'সব' || scheme.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Categories for filtering
  const categories = ['সব', ...new Set(schemes.map(s => s.category))];
  const statuses = ['সব', 'চলমান', 'নতুন', 'শীঘ্রই শুরু'];

  return (
    <div className="font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <FaLandmark className="text-green-600 mr-3" />
          সরকারি সহায়তা
        </h1>
        <p className="text-gray-600 mt-2">
          কৃষকদের জন্য সরকারি সহায়তা প্রকল্প এবং আবেদন প্রক্রিয়া
        </p>
      </div>

      {/* Assistance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">মোট প্রকল্প</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {assistanceStats.totalSchemes}
              </p>
            </div>
            <FaFileAlt className="text-green-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">চলমান প্রকল্প</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {assistanceStats.activeSchemes}
              </p>
            </div>
            <FaChartLine className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">মোট আবেদন</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">
                {assistanceStats.totalApplications}
              </p>
            </div>
            <FaUser className="text-amber-600 text-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">অনুমোদিত</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                {assistanceStats.approvedApplications}
              </p>
            </div>
            <FaCheckCircle className="text-purple-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-green-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="প্রকল্প অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Schemes List */}
        <div className="lg:col-span-2">
          {/* Schemes List */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaLandmark className="text-green-600 mr-2" />
                সরকারি সহায়তা প্রকল্পসমূহ
              </h2>
            </div>
            <div className="p-4">
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-8">
                  <FaLandmark className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">কোন প্রকল্প পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredSchemes.map(scheme => (
                    <div
                      key={scheme.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg text-gray-800">
                              {scheme.title}
                            </h3>
                            <span
                              className={`${
                                scheme.status === 'চলমান'
                                  ? 'bg-green-100 text-green-800'
                                  : scheme.status === 'নতুন'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              } text-xs font-medium px-2.5 py-0.5 rounded-full`}
                            >
                              {scheme.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {scheme.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {scheme.category}
                            </span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              <FaMoneyBillWave className="inline mr-1" />{' '}
                              {scheme.amount}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              <FaCalendarAlt className="inline mr-1" />{' '}
                              {scheme.deadline}
                            </span>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">যোগ্যতা:</span>{' '}
                              {scheme.eligibility}
                            </p>
                          </div>
                        </div>

                        <div className="ml-4">
                          {scheme.applied ? (
                            <button className="bg-green-100 text-green-800 font-medium py-2 px-4 rounded-lg flex items-center">
                              <FaCheckCircle className="mr-2" /> আবেদন করা
                              হয়েছে
                            </button>
                          ) : (
                            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
                              <FaFileAlt className="mr-2" /> আবেদন করুন
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Applications and Quick Actions */}
        <div className="lg:col-span-1">
          {/* My Applications */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaFileAlt className="text-green-600 mr-2" />
                আমার আবেদনসমূহ
              </h2>
            </div>
            <div className="p-4">
              {applications.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  এখনও কোন আবেদন করা হয়নি
                </p>
              ) : (
                <div className="space-y-4">
                  {applications.map(application => (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {application.scheme}
                      </h3>
                      <div className="mt-2 flex justify-between items-center">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            application.status === 'অনুমোদিত'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {application.status}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {application.amount}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {application.date}
                      </div>
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
                <FaExclamationCircle className="text-green-600 mr-2" />
                দ্রুত কাজ
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    আবেদন ফরম ডাউনলোড
                  </span>
                  <FaDownload className="text-green-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    প্রয়োজনীয় নথি
                  </span>
                  <FaFileAlt className="text-green-600" />
                </button>
                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    আবেদন স্ট্যাটাস চেক
                  </span>
                  <FaCheckCircle className="text-green-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovAssistancePage;
