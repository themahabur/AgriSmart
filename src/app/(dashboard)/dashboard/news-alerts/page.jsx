'use client';

import React, { useState } from 'react';
import {
  FaNewspaper,
  FaExclamationTriangle,
  FaBell,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaShareAlt,
} from 'react-icons/fa';

const NewsAlertsPage = () => {
  // State for news articles
  const [news] = useState([
    {
      id: 1,
      title: 'বর্ষাকালে ধানের পোকামাকড় দমন পদ্ধতি',
      category: 'পোকা ব্যবস্থাপনা',
      date: '২০২৫-১০-০৮',
      summary:
        'বর্ষাকালে ধানের পোকামাকড় দমনের জন্য প্রয়োজনীয় ব্যবস্থা এবং প্রাকৃতিক সমাধান',
      priority: 'উচ্চ',
      read: true,
      image: '/images/news1.jpg',
    },
    {
      id: 2,
      title: 'সরকারি কৃষি প্রকল্পে ২০% বাড়ছে সহায়তা',
      category: 'সরকারি সহায়তা',
      date: '২০২৫-১০-০৭',
      summary:
        'আগামী মাস থেকে সরকারি কৃষি প্রকল্পে আর্থিক সহায়তা ২০% বৃদ্ধি পাচ্ছে',
      priority: 'মাধ্যমিক',
      read: false,
      image: '/images/news2.jpg',
    },
    {
      id: 3,
      title: 'আগামী সপ্তাহে শীতকালীন ফসলের জন্য সতর্কতা',
      category: 'আবহাওয়া',
      date: '২০২৫-১০-০৬',
      summary:
        'আগামী সপ্তাহে শীতকালীন ফসলের জন্য প্রয়োজনীয় সতর্কতা এবং প্রস্তুতি',
      priority: 'উচ্চ',
      read: false,
      image: '/images/news3.jpg',
    },
    {
      id: 4,
      title: 'নতুন কৃষি প্রযুক্তি প্রশিক্ষণ কর্মসূচি',
      category: 'প্রশিক্ষণ',
      date: '২০২৫-১০-০৫',
      summary:
        'সরকার ও বেসরকারি সংস্থার যৌথ উদ্যোগে নতুন কৃষি প্রযুক্তি প্রশিক্ষণ কর্মসূচি',
      priority: 'মাধ্যমিক',
      read: true,
      image: '/images/news4.jpg',
    },
    {
      id: 5,
      title: 'বাজারে আলুর দর বৃদ্ধি পেয়েছে',
      category: 'বাজার দর',
      date: '২০২৫-১০-০৪',
      summary:
        'গত সপ্তাহে বাজারে আলুর দর ১৫% বৃদ্ধি পেয়েছে, কৃষকদের জন্য ভালো খবর',
      priority: 'মাধ্যমিক',
      read: false,
      image: '/images/news5.jpg',
    },
  ]);

  // State for alerts
  const [alerts] = useState([
    {
      id: 1,
      title: 'তীব্র বৃষ্টির সতর্কতা',
      category: 'আবহাওয়া',
      date: '২০২৫-১০-০৮',
      description:
        'আগামী ৪৮ ঘন্টার মধ্যে উত্তর-পূর্বাঞ্চলে তীব্র বৃষ্টির সম্ভাবনা',
      priority: 'উচ্চ',
      read: false,
    },
    {
      id: 2,
      title: 'ফসল সংরক্ষণ সম্পর্কে গুরুত্বপূর্ণ তথ্য',
      category: 'ফসল সংরক্ষণ',
      date: '২০২৫-১০-০৭',
      description: 'ধান ও গমের সংরক্ষণের জন্য প্রয়োজনীয় ব্যবস্থা এবং সতর্কতা',
      priority: 'মাধ্যমিক',
      read: true,
    },
    {
      id: 3,
      title: 'সেচ ব্যবস্থার রক্ষণাবেক্ষণ',
      category: 'সেচ ব্যবস্থাপনা',
      date: '২০২৫-১০-০৬',
      description:
        'বর্ষাকালে সেচ ব্যবস্থার রক্ষণাবেক্ষণের জন্য প্রয়োজনীয় নির্দেশিকা',
      priority: 'মাধ্যমিক',
      read: false,
    },
  ]);

  // State for filters
  const [activeTab, setActiveTab] = useState('news');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [priorityFilter, setPriorityFilter] = useState('সব');

  // Filtered content based on search and filters
  const filteredContent = activeTab === 'news' ? news : alerts;

  const filteredItems = filteredContent.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'সব' || item.category === categoryFilter;
    const matchesPriority =
      priorityFilter === 'সব' || item.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Categories for filtering
  const categories = [
    'সব',
    ...new Set([...news.map(n => n.category), ...alerts.map(a => a.category)]),
  ];
  const priorities = ['সব', 'উচ্চ', 'মাধ্যমিক'];

  // Count unread items
  const unreadNewsCount = news.filter(n => !n.read).length;
  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  return (
    <div className="font-hind p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <FaNewspaper className="text-green-600 mr-3" />
          খবর ও সতর্কতা
        </h1>
        <p className="text-gray-600 mt-2">
          কৃষি সংক্রান্ত গুরুত্বপূর্ণ খবর এবং সতর্কতা মেসেজ
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center py-4 px-6 border-b-2 font-medium ${
                activeTab === 'news'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-green-500 hover:text-green-700 hover:border-green-300'
              }`}
            >
              <FaNewspaper className="mr-2" />
              খবর
              <span
                className={`ml-2 py-0.5 px-2 rounded-full ${
                  activeTab === 'news'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {unreadNewsCount > 0
                  ? `${news.length} (${unreadNewsCount} অপঠিত)`
                  : news.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center py-4 px-6 border-b-2 font-medium ${
                activeTab === 'alerts'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-green-500 hover:text-green-700 hover:border-green-300'
              }`}
            >
              <FaExclamationTriangle className="mr-2" />
              সতর্কতা
              <span
                className={`ml-2 py-0.5 px-2 rounded-full ${
                  activeTab === 'alerts'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {unreadAlertsCount > 0
                  ? `${alerts.length} (${unreadAlertsCount} অপঠিত)`
                  : alerts.length}
              </span>
            </button>
          </nav>
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
              placeholder="খবর বা সতর্কতা অনুসন্ধান করুন..."
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
              <FaStar className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              {priorities.map((priority, index) => (
                <option key={index} value={priority}>
                  {priority} অগ্রাধিকার
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            {activeTab === 'news' ? (
              <>
                <FaNewspaper className="text-green-600 mr-2" />
                কৃষি সংক্রান্ত খবর
              </>
            ) : (
              <>
                <FaExclamationTriangle className="text-green-600 mr-2" />
                সতর্কতা মেসেজ
              </>
            )}
          </h2>
        </div>
        <div className="p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              {activeTab === 'news' ? (
                <FaNewspaper className="text-4xl text-gray-400 mx-auto mb-3" />
              ) : (
                <FaExclamationTriangle className="text-4xl text-gray-400 mx-auto mb-3" />
              )}
              <p className="text-gray-600">
                {activeTab === 'news'
                  ? 'কোন খবর পাওয়া যায়নি'
                  : 'কোন সতর্কতা পাওয়া যায়নি'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
                    !item.read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg text-gray-800">
                          {item.title}
                        </h3>
                        {!item.read && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                            <FaBell className="mr-1" /> নতুন
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mt-2">
                        {activeTab === 'news' ? item.summary : item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                          <FaTag className="mr-1" /> {item.category}
                        </span>
                        <span
                          className={`${
                            item.priority === 'উচ্চ'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          } text-xs font-medium px-2.5 py-0.5 rounded flex items-center`}
                        >
                          <FaStar className="mr-1" /> {item.priority} অগ্রাধিকার
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                          <FaCalendarAlt className="mr-1" /> {item.date}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      <button className="text-gray-500 hover:text-green-600 p-2">
                        <FaShareAlt />
                      </button>
                      {item.read ? (
                        <button className="text-green-600 p-2">
                          <FaCheckCircle />
                        </button>
                      ) : (
                        <button className="text-gray-500 hover:text-green-600 p-2">
                          <FaTimesCircle />
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
  );
};

export default NewsAlertsPage;
