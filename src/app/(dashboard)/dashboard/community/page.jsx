'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  FaUsers,
  FaSearch,
  FaPlus,
  FaFilter,
  FaComment,
  FaThumbsUp,
  FaShare,
  FaBookmark,
  FaEllipsisH,
} from 'react-icons/fa';

const CommunityPage = () => {
  const { data: session } = useSession();
  console.log(session?.user?.email);
  // State for posts

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for new post form
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
  });

  // State for filters
  const [activeFilter, setActiveFilter] = useState('সব');

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/community/'
        );
        setPosts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post submission
  const handleSubmitPost = async e => {
    e.preventDefault();

    const user = {
      name: 'John Doe',
      location: 'Dhaka',
      avatar: 'https://example.com/avatar.jpg',
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/community/create',
        {
          title: newPostData.title,
          description: newPostData.description,
          image: newPostData.image,
          tags: newPostData.tags,
          user: user,
        }
      );

      if (response.data.success) {
        // Add new post at the top
        setPosts([response.data.data, ...posts]);
        setNewPostData({ title: '', description: '', image: '', tags: [] });
        setShowPostForm(false);
        alert('Post created successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create post: ' + err.message);
    }
  };

  // Handle like
  const handleLike = postId => {
    setPosts(
      posts.map(post =>
        post._id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Handle bookmark
  const handleBookmark = postId => {
    setPosts(
      posts.map(post =>
        post._id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const filters = ['সব', 'জনপ্রিয়', 'আলোচিত', 'বিশেষজ্ঞ', 'আমার প্রশ্ন'];

  if (loading) return <p className="p-4">Loading posts...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col font-hind p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <FaUsers className="text-green-600 mr-3" />
            কৃষক কমিউনিটি
          </h1>
          <p className="text-gray-600 mt-2">
            অভিজ্ঞতা শেয়ার করুন, জ্ঞান অর্জন করুন এবং সমস্যার সমাধান খুঁজুন
          </p>
        </div>
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          নতুন পোস্ট
        </button>
      </div>

      {/* New Post Form */}
      {showPostForm && (
        <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl border border-green-100 mb-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  আপনার চিন্তা শেয়ার করুন
                </h2>
                <p className="text-sm text-gray-600">
                  জ্ঞান এবং অভিজ্ঞতা সম্প্রদায়ের সাথে ভাগ করুন
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPostForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmitPost} className="space-y-4">
            {/* Title Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শিরোনাম
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="আপনার পোস্টের জন্য একটি আকর্ষণীয় শিরোনাম লিখুন..."
                  value={newPostData.title}
                  onChange={e =>
                    setNewPostData({ ...newPostData, title: e.target.value })
                  }
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm transition-all duration-200"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিবরণ
              </label>
              <div className="relative">
                <textarea
                  placeholder="আপনার চিন্তা, অভিজ্ঞতা বা প্রশ্ন এখানে বিস্তারিত লিখুন..."
                  value={newPostData.description}
                  onChange={e =>
                    setNewPostData({
                      ...newPostData,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm resize-none transition-all duration-200"
                  rows={5}
                  required
                />
                <div className="absolute left-4 top-4 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ছবির লিংক (ঐচ্ছিক)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={newPostData.image}
                  onChange={e =>
                    setNewPostData({ ...newPostData, image: e.target.value })
                  }
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm transition-all duration-200"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Multi Tag Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ট্যাগস
                <span className="text-xs text-gray-500 ml-2">
                  (Enter চাপুন ট্যাগ যোগ করতে)
                </span>
              </label>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {newPostData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-full flex items-center space-x-2 shadow-md animate-fade-in"
                  >
                    <span className="text-sm font-medium">#{tag}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setNewPostData({
                          ...newPostData,
                          tags: newPostData.tags.filter((_, i) => i !== index),
                        });
                      }}
                      className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Tag Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="ট্যাগ যোগ করুন (Enter চাপুন)"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value.trim() !== '') {
                      e.preventDefault();
                      const newTag = e.target.value.trim();
                      if (
                        !newPostData.tags.includes(newTag) &&
                        newPostData.tags.length < 5
                      ) {
                        setNewPostData({
                          ...newPostData,
                          tags: [...newPostData.tags, newTag],
                        });
                      }
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm transition-all duration-200"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                সর্বোচ্চ ৫টি ট্যাগ যোগ করতে পারবেন
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 rounded-xl border border-gray-200 hover:border-gray-300 bg-white font-medium transition-all duration-200 hover:shadow-sm"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>পোস্ট করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="কমিউনিটিতে অনুসন্ধান করুন..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500" />
            <div className="flex space-x-2 overflow-x-auto">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Posts */}
        <div className="lg:col-span-3 space-y-6">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100 flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">
                      {post.user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {post.user.location} •{' '}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2">
                  <FaEllipsisH />
                </button>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h4 className="font-semibold mb-2">{post.title}</h4>
                <p className="text-gray-700 mb-4">{post.description}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? 'text-green-600' : 'text-gray-500'
                    } hover:text-green-600`}
                  >
                    <FaThumbsUp />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                    <FaComment />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                    <FaShare />
                    <span>{post.shares}</span>
                  </button>
                </div>
                <button
                  onClick={() => handleBookmark(post._id)}
                  className={`${
                    post.isBookmarked ? 'text-green-600' : 'text-gray-500'
                  } hover:text-green-600`}
                >
                  <FaBookmark />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Community Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              কমিউনিটি পরিসংখ্যান
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">সদস্য</span>
                <span className="font-semibold">১২,৪৫২</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">আজকের পোস্ট</span>
                <span className="font-semibold">১২৪</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">সক্রিয় বিশেষজ্ঞ</span>
                <span className="font-semibold">৪২</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">সমাধান পাওয়া প্রশ্ন</span>
                <span className="font-semibold">৮,৯২১</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
