"use client";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
<<<<<<< HEAD
  FaSeedling,
  FaTractor,
  FaLeaf,
  FaUserTie,
  FaMedal,
  FaCrown,
  FaStar,
} from 'react-icons/fa';
=======
} from "react-icons/fa";
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e

const CommunityPage = () => {
  // State for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'রহিম মিয়া',
        location: 'রংপুর',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'verified',
      },
      timestamp: '২ ঘন্টা আগে',
      content:
        'আমার ধানের ফার্মে গত সপ্তাহে কিছু অস্বাভাবিক লক্ষণ দেখা দিয়েছে। পাতাগুলো হলুদ রঙের হয়ে যাচ্ছে। কেউ কি এমন সমস্যার সমাধান জানেন?',
      image: null,
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ['ধান', 'রোগ', 'পাতা'],
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      user: {
        name: 'সালমা বেগম',
        location: 'ঝিনাইদহ',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'expert',
      },
      timestamp: '৫ ঘন্টা আগে',
      content:
        'আজকে আমি আমার বাগানে জৈব সার প্রয়োগের একটি নতুন পদ্ধতি চেষ্টা করেছি। এটি আমার ফসলের উৎপাদন বাড়িয়েছে ২৫%। আগ্রহীদের জন্য বিস্তারিত পদ্ধতি শেয়ার করছি।',
      image:
        'https://images.unsplash.com/photo-1597362925123-7786144007b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      likes: 142,
      comments: 32,
      shares: 18,
      tags: ['জৈব চাষ', 'সার', 'উৎপাদন'],
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: 3,
      user: {
        name: 'জব্বার মিয়া',
        location: 'পাবনা',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        role: 'member',
      },
      timestamp: '১২ ঘন্টা আগে',
      content:
        'আজকে আমাদের এলাকার কৃষি বিশেষজ্ঞ মিঃ আহমেদ স্যারের সাথে ফসল রোগ সনাক্তকরণ নিয়ে একটি সভা অনুষ্ঠিত হয়েছে। খুবই উপকারী হয়েছে।',
      image: null,
      likes: 56,
      comments: 12,
      shares: 5,
      tags: ['সভা', 'রোগ সনাক্তকরণ', 'বিশেষজ্ঞ'],
      isLiked: false,
      isBookmarked: false,
    },
  ]);

<<<<<<< HEAD
  // State for new post
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
=======
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for new post form
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
  });
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e

  // State for filters
  const [activeFilter, setActiveFilter] = useState("সব");

<<<<<<< HEAD
=======
  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/community");
        console.log(res.data.data);
        setPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post submission
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const postPayload = {
      title: newPostData.title,
      description: newPostData.description,
      image: newPostData.image,
      tags: newPostData.tags,
      user: {
        name: session?.user?.name || "অজানা ব্যবহারকারী",
        email: session?.user?.email,
        avatar: session?.user?.image || "/default-avatar.png",
      },
    };

    try {
      const res = await axiosInstance.post("/community/create", postPayload);

      if (res.data.success) {
        // Add new post at the top
        setPosts([res.data.data, ...posts]);
        setNewPostData({ title: "", description: "", image: "", tags: [] });
        setShowPostForm(false);
        toast.success("Post created successfully!");
      }
    } catch (err) {
      toast.error("Failed to create post: " + err.message);
    }
  };

  // const handleSubmitPost = async (e) => {
  //   e.preventDefault();
  //     const response = await axios.post(
  //       "http://localhost:5000/api/community/create",
  //       {
  //         title: newPostData.title,
  //         description: newPostData.description,
  //         image: newPostData.image,
  //         tags: newPostData.tags,
  //         user: user,
  //       }
  //     );

  //     if (response.data.success) {
  //       // Add new post at the top
  //       setPosts([response.data.data, ...posts]);
  //       setNewPostData({ title: "", description: "", image: "", tags: [] });
  //       setShowPostForm(false);
  //       alert("Post created successfully!");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to create post: " + err.message);
  //   }
  // };

>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
  // Handle like
  const handleLike = (postId) => {
    setPosts(
<<<<<<< HEAD
      posts.map(post =>
        post.id === postId
=======
      posts.map((post) =>
        post._id === postId
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
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
  const handleBookmark = (postId) => {
    setPosts(
<<<<<<< HEAD
      posts.map(post =>
        post.id === postId
=======
      posts.map((post) =>
        post._id === postId
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

<<<<<<< HEAD
  // Handle new post submission
  const handleSubmitPost = e => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: 'আপনি',
          location: 'আপনার অবস্থান',
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          role: 'member',
        },
        timestamp: 'এই মুহূর্তে',
        content: newPost,
        image: null,
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
        isLiked: false,
        isBookmarked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostForm(false);
    }
  };
=======
  const filters = ["সব", "জনপ্রিয়", "আলোচিত", "বিশেষজ্ঞ", "আমার প্রশ্ন"];
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e

  // Filter options
  const filters = ['সব', 'জনপ্রিয়', 'আলোচিত', 'বিশেষজ্ঞ', 'আমার প্রশ্ন'];

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
        <div className="bg-white p-6 rounded-xl border border-green-200 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            আপনার চিন্তা শেয়ার করুন
          </h2>
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="আপনার প্রশ্ন, অভিজ্ঞতা বা ধারণা লিখুন..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
                >
<<<<<<< HEAD
                  <FaSeedling />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
=======
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
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                  onChange={(e) =>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
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
                      e.target.value = "";
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
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
                >
                  <FaLeaf />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
                >
                  <FaTractor />
                </button>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  পোস্ট করুন
                </button>
              </div>
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
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
<<<<<<< HEAD
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start">
                    <div className="relative">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {post.user.role === 'verified' && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                          <FaMedal className="text-xs" />
                        </div>
                      )}
                      {post.user.role === 'expert' && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                          <FaUserTie className="text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-800">
                          {post.user.name}
                        </h3>
                        {post.user.role === 'verified' && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <FaCrown className="mr-1" /> ভেরিফাইড
                          </span>
                        )}
                        {post.user.role === 'expert' && (
                          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <FaStar className="mr-1" /> বিশেষজ্ঞ
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {post.user.location} • {post.timestamp}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-2">
                      <FaEllipsisH />
                    </button>
=======
        <div className="lg:col-span-3 space-y-6">
          {posts.map((post) => (
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
                      {post.user.location} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{post.content}</p>
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
                      onClick={() => handleLike(post.id)}
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
<<<<<<< HEAD
                    onClick={() => handleBookmark(post.id)}
                    className={`${
                      post.isBookmarked ? 'text-green-600' : 'text-gray-500'
=======
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? "text-green-600" : "text-gray-500"
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
                    } hover:text-green-600`}
                  >
                    <FaBookmark />
                  </button>
                </div>
<<<<<<< HEAD
=======
                <button
                  onClick={() => handleBookmark(post._id)}
                  className={`${
                    post.isBookmarked ? "text-green-600" : "text-gray-500"
                  } hover:text-green-600`}
                >
                  <FaBookmark />
                </button>
>>>>>>> d955e40afb28885c890aa4b0a624916df04a203e
              </div>
            ))}
          </div>
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

          {/* Top Contributors */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              শীর্ষ অবদানকারী
            </h2>
            <div className="space-y-3">
              {[
                { name: 'আব্দুল করিম', posts: 245, role: 'expert' },
                { name: 'ফারহানা আক্তার', posts: 198, role: 'verified' },
                { name: 'মোহাম্মদ আলী', posts: 176, role: 'member' },
                { name: 'নাসরিন আক্তার', posts: 162, role: 'expert' },
                { name: 'সাইফুল ইসলাম', posts: 143, role: 'verified' },
              ].map((contributor, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-lg font-bold text-gray-400 mr-3">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-800">
                        {contributor.name}
                      </h3>
                      {contributor.role === 'expert' && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                          <FaUserTie />
                        </span>
                      )}
                      {contributor.role === 'verified' && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                          <FaMedal />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {contributor.posts} পোস্ট
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">দ্রুত লিংক</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors flex items-center">
                <FaSeedling className="text-green-600 mr-3" />
                <span>ফসল রোগ সনাক্তকরণ</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors flex items-center">
                <FaTractor className="text-green-600 mr-3" />
                <span>মেশিন ভাড়া</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors flex items-center">
                <FaLeaf className="text-green-600 mr-3" />
                <span>জৈব চাষ পদ্ধতি</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors flex items-center">
                <FaUserTie className="text-green-600 mr-3" />
                <span>বিশেষজ্ঞের সাথে কথা বলুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
