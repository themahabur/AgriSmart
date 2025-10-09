'use client';

import React, { useState } from 'react';
import {
  FaUserTie,
  FaSearch,
  FaFilter,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

const ExpertAdvicePage = () => {
  // State for expert advisors
  const [experts] = useState([
    {
      id: 1,
      name: 'ড. আবদুল কাদের',
      specialty: 'ফসল চাষ পদ্ধতি',
      rating: 4.8,
      experience: '১৫ বছর',
      availability: 'সকাল ১০:০০ - বিকাল ৪:০০',
      image: '/images/expert1.jpg',
      online: true,
      description:
        'ফসল চাষ, পোকামাকড় দমন এবং জৈব চাষ ব্যবস্থাপনা সম্পর্কে বিশেষজ্ঞ',
    },
    {
      id: 2,
      name: 'মোসাঃ ফারহানা আক্তার',
      specialty: 'মাটি ও পুষ্টি বিশ্লেষণ',
      rating: 4.9,
      experience: '১২ বছর',
      availability: 'বিকাল ২:০০ - রাত ৮:০০',
      image: '/images/expert2.jpg',
      online: false,
      description:
        'মাটির পুষ্টি বিশ্লেষণ, সার ব্যবহার এবং মাটির স্বাস্থ্য উন্নয়ন',
    },
    {
      id: 3,
      name: 'ড. মোঃ সালাউদ্দিন',
      specialty: 'পানি সেচ প্রযুক্তি',
      rating: 4.7,
      experience: '১৮ বছর',
      availability: 'সকাল ৯:০০ - বিকাল ৫:০০',
      image: '/images/expert3.jpg',
      online: true,
      description: 'আধুনিক সেচ পদ্ধতি, জল সংরক্ষণ এবং সেচ ব্যবস্থাপনা',
    },
    {
      id: 4,
      name: 'মোসাঃ রশিদা বেগম',
      specialty: 'বাজার ও ব্যবসায়িক পরামর্শ',
      rating: 4.6,
      experience: '১০ বছর',
      availability: 'সকাল ১১:০০ - রাত ৭:০০',
      image: '/images/expert4.jpg',
      online: true,
      description: 'ফসল বাজারজাতকরণ, মূল্য নির্ধারণ এবং ব্যবসায়িক কৌশল',
    },
  ]);

  // State for advice requests
  const [requests] = useState([
    {
      id: 1,
      title: 'ধানের পোকামাকড় সমস্যা',
      category: 'ফসল সংরক্ষণ',
      status: 'উত্তর দেওয়া হয়েছে',
      date: '২০২৫-১০-০৫',
      expert: 'ড. আবদুল কাদের',
    },
    {
      id: 2,
      title: 'মাটির পিএইচ মান কম কেন?',
      category: 'মাটি বিশ্লেষণ',
      status: 'চলমান',
      date: '২০২৫-১০-০৭',
      expert: 'মোসাঃ ফারহানা আক্তার',
    },
    {
      id: 3,
      title: 'বর্ষাকালে সেচ ব্যবস্থা',
      category: 'সেচ প্রযুক্তি',
      status: 'উত্তর দেওয়া হয়েছে',
      date: '২০২৫-১০-০২',
      expert: 'ড. মোঃ সালাউদ্দিন',
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [statusFilter, setStatusFilter] = useState('সব');

  // Filtered experts based on search
  const filteredExperts = experts.filter(
    expert =>
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categories for filtering
  const categories = [
    'সব',
    'ফসল চাষ',
    'মাটি বিশ্লেষণ',
    'সেচ প্রযুক্তি',
    'ফসল সংরক্ষণ',
    'বাজার পরামর্শ',
  ];
  const statuses = ['সব', 'চলমান', 'উত্তর দেওয়া হয়েছে', 'অপেক্ষারত'];

  return (
    <div className="font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <FaUserTie className="text-green-600 mr-3" />
          বিশেষজ্ঞের পরামর্শ
        </h1>
        <p className="text-gray-600 mt-2">
          কৃষি বিশেষজ্ঞদের সাথে সংযোগ করুন এবং আপনার কৃষি সমস্যার সমাধান খুঁজুন
        </p>
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
              placeholder="বিশেষজ্ঞ বা বিষয় অনুসন্ধান করুন..."
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

      {/* Experts Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            আমাদের কৃষি বিশেষজ্ঞ
          </h2>
          <span className="text-sm text-gray-600">
            {filteredExperts.length} জন বিশেষজ্ঞ পাওয়া গেছে
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map(expert => (
            <div
              key={expert.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                      {expert.name.charAt(0)}
                    </div>
                    {expert.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg text-gray-800">
                        {expert.name}
                      </h3>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">
                        <FaStar className="text-amber-500 text-xs mr-1" />
                        <span className="text-amber-700 text-sm font-medium">
                          {expert.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-green-600 font-medium text-sm mt-1">
                      {expert.specialty}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {expert.description}
                    </p>

                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span>{expert.availability}</span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {expert.experience} অভিজ্ঞতা
                      </span>
                      <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        {expert.online ? 'এখনই যোগাযোগ করুন' : 'বার্তা পাঠান'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advice Requests Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          আপনার পরামর্শ অনুরোধসমূহ
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    শিরোনাম
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    বিভাগ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    তারিখ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    বিশেষজ্ঞ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    অবস্থা
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {request.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.expert}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'উত্তর দেওয়া হয়েছে' ? (
                        <span className="flex items-center text-sm text-green-600">
                          <FaCheckCircle className="mr-1" /> {request.status}
                        </span>
                      ) : (
                        <span className="flex items-center text-sm text-amber-600">
                          <FaExclamationCircle className="mr-1" />{' '}
                          {request.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              নতুন পরামর্শ অনুরোধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertAdvicePage;
