"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./loading";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBlogs = [
      {
        id: 1,
        title: "টেকসই কৃষির পরিচয়",
        author: "জন কৃষক",
        email: "john@example.com",
        date: "2023-10-15",
        status: "pending",
        category: "কৃষি পদ্ধতি",
        content:
          "টেকসই কৃষি পদ্ধতির মূলনীতি শেখা এবং এর সুবিধাসমূহ বোঝা খুবই গুরুত্বপূর্ণ। এটি পরিবেশ বান্ধব এবং দীর্ঘমেয়াদী কৃষি উৎপাদনের জন্য প্রয়োজনীয়।",
        excerpt: "টেকসই কৃষি পদ্ধতির মূলনীতি শেখা এবং এর সুবিধাসমূহ...",
      },
      {
        id: 2,
        title: "জৈব পোকা নিয়ন্ত্রণ পদ্ধতি",
        author: "সারা গ্রীন",
        email: "sarah@example.com",
        date: "2023-10-12",
        status: "approved",
        category: "পোকা ব্যবস্থাপনা",
        content:
          "রাসায়নিক ছাড়াই প্রাকৃতিক উপায়ে পোকা নিয়ন্ত্রণ করা সম্ভব। নিম পাতা, মরিচের স্প্রে এবং অন্যান্য প্রাকৃতিক উপাদান ব্যবহার করে আমরা ক্ষতিকর পোকা দমন করতে পারি।",
        excerpt:
          "রাসায়নিক ছাড়াই প্রাকৃতিক উপায়ে পোকা নিয়ন্ত্রণ করা সম্ভব...",
      },
      {
        id: 3,
        title: "আধুনিক সেচ ব্যবস্থা",
        author: "মাইক কৃষি",
        email: "mike@example.com",
        date: "2023-10-10",
        status: "rejected",
        category: "সেচ ব্যবস্থাপনা",
        content:
          "জলের দক্ষ ব্যবস্থাপনার জন্য আধুনিক সেচ পদ্ধতি খুবই গুরুত্বপূর্ণ। ড্রিপ ইরিগেশন এবং স্প্রিংকলার সিস্টেমের মাধ্যমে আমরা পানি সাশ্রয় করতে পারি।",
        excerpt:
          "জলের দক্ষ ব্যবস্থাপনার জন্য আধুনিক সেচ পদ্ধতি খুবই গুরুত্বপূর্ণ...",
        rejectionReason: "কন্টেন্টে যথাযথ রেফারেন্স এবং উৎসের অভাব রয়েছে",
      },
      {
        id: 4,
        title: "মাটির স্বাস্থ্য পর্যবেক্ষণ",
        author: "ডক্টর প্ল্যান্ট",
        email: "drplant@example.com",
        date: "2023-10-08",
        status: "pending",
        category: "মৃত্তিকা বিজ্ঞান",
        content:
          "মাটির স্বাস্থ্য পর্যবেক্ষণ এবং উন্নত করার উপায় সম্পর্কে জানা প্রতিটি কৃষকের জন্য অত্যন্ত গুরুত্বপূর্ণ। মাটির pH, পুষ্টি উপাদান এবং জৈব পদার্থের পরিমাণ নিয়মিত পরীক্ষা করা উচিত।",
        excerpt:
          "মাটির স্বাস্থ্য পর্যবেক্ষণ এবং উন্নত করার উপায় সম্পর্কে জানা...",
      },
      {
        id: 5,
        title: "ফসল ঘূর্ণনের সুবিধা",
        author: "কৃষি বিশেষজ্ঞ",
        email: "expert@example.com",
        date: "2023-10-05",
        status: "pending",
        category: "ফসল ব্যবস্থাপনা",
        content:
          "ফসল ঘূর্ণনের মাধ্যমে আমরা মাটির উর্বরতা বজায় রাখতে পারি এবং রোগ-পোকার আক্রমণ কমাতে পারি। বিভিন্ন মৌসুমে বিভিন্ন ফসল চাষ করা উচিত।",
        excerpt: "ফসল ঘূর্ণনের মাধ্যমে আমরা মাটির উর্বরতা বজায় রাখতে পারি...",
      },
      {
        id: 6,
        title: "জৈব সারের ব্যবহার",
        author: "রহিম উদ্দিন",
        email: "rahim@example.com",
        date: "2023-10-03",
        status: "approved",
        category: "সার ব্যবস্থাপনা",
        content:
          "জৈব সারের ব্যবহার মাটির গঠন উন্নত করে এবং দীর্ঘমেয়াদী উর্বরতা নিশ্চিত করে। গোবর, কম্পোস্ট এবং সবুজ সার ব্যবহার করা যেতে পারে।",
        excerpt: "জৈব সারের ব্যবহার মাটির গঠন উন্নত করে এবং দীর্ঘমেয়াদী...",
      },
    ];

    setBlogs(mockBlogs);
    setLoading(false);
  }, []);

  // Filter blogs based on active tab
  const filteredBlogs = blogs.filter((blog) =>
    activeTab === "all" ? true : blog.status === activeTab
  );

  // Handle blog approval
  const handleApprove = async (blogId) => {
    // In real app, make API call here
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId ? { ...blog, status: "approved" } : blog
      )
    );
    setSelectedBlog(null);
  };

  // Handle blog rejection
  const handleReject = async (blogId) => {
    if (!rejectionReason.trim()) {
      toast("অনুগ্রহ করে প্রত্যাখ্যানের কারণ লিখুন");
      return;
    }

    // In real app, make API call here
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              status: "rejected",
              rejectionReason: rejectionReason,
            }
          : blog
      )
    );
    setSelectedBlog(null);
    setRejectionReason("");
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    const statusText = {
      pending: "বিচারাধীন",
      approved: "অনুমোদিত",
      rejected: "প্রত্যাখ্যাত",
    };

    return (
      <span
        className={`px-3 py-1 rounded-md font-medium border ${statusClasses[status]}`}
      >
        {statusText[status]}
      </span>
    );
  };

  // Count blogs by status
  const countByStatus = {
    all: blogs.length,
    pending: blogs.filter((blog) => blog.status === "pending").length,
    approved: blogs.filter((blog) => blog.status === "approved").length,
    rejected: blogs.filter((blog) => blog.status === "rejected").length,
  };
  console.log(selectedBlog, "selected");

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ব্লগ ব্যবস্থাপনা</h1>
          <p className="text-gray-600 mt-2">
            ব্যবহারকারীদের জমা দেওয়া ব্লগগুলি পর্যালোচনা ও ব্যবস্থাপনা করুন
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { key: "all", label: "সকল ব্লগ", count: countByStatus.all },
                {
                  key: "pending",
                  label: "বিচারাধীন",
                  count: countByStatus.pending,
                },
                {
                  key: "approved",
                  label: "অনুমোদিত",
                  count: countByStatus.approved,
                },
                {
                  key: "rejected",
                  label: "প্রত্যাখ্যাত",
                  count: countByStatus.rejected,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center py-4 px-6 border-b-2 font-medium  ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full  ${
                      activeTab === tab.key
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-auto px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    ব্লগের বিবরণ
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    লেখক
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    তারিখ
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    অবস্থা
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    কর্ম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      এই বিভাগে কোন ব্লগ পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="md:px-6 py-4 ">
                        <div>
                          <div className="  font-semibold text-gray-900">
                            {blog.title}
                          </div>
                          <div className=" text-gray-500 mt-1 hidden lg:block">
                            {blog.excerpt}
                          </div>
                          <div className=" text-gray-400 mt-1">
                            {blog.category}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className=" text-gray-900">{blog.author}</div>
                        <div className=" text-gray-500">{blog.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                        {new Date(blog.date).toLocaleDateString("bn-BD")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(blog.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  font-medium">
                        <div className="flex items-center space-x-3">
                          {/* View Button */}
                          <button
                            onClick={() => setSelectedBlog([blog, "see"])}
                            className="hover:border-b-2 border-blue-600 text-blue-600 hover:text-blue-900 font-medium"
                          >
                            দেখুন
                          </button>

                          {/* Action Buttons based on status */}
                          {blog.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(blog.id)}
                                className=" hover:border-b-2 border-green-600 text-green-600 hover:text-green-900 font-medium"
                              >
                                অনুমোদন
                              </button>
                              <button
                                onClick={() => setSelectedBlog([blog])}
                                className="hover:border-b-2 border-red-600 text-red-600 hover:text-red-900 font-medium"
                              >
                                প্রত্যাখ্যান
                              </button>
                            </>
                          )}
                          {/* {(blog.status === "approved" ||
                            blog.status === "rejected") && (
                            <button
                              onClick={() => setSelectedBlog([blog])}
                              className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                              বিস্তারিত
                            </button>
                          )} */}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blog Detail Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedBlog[0].title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      {getStatusBadge(selectedBlog[0].status)}
                      <span className=" text-gray-500">
                        {selectedBlog[0].category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBlog(null);
                      setRejectionReason("");
                    }}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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

                {/* Blog Content */}
                <div className="space-y-6">
                  {/* Author Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block  font-medium text-gray-700">
                        লেখক
                      </label>
                      <p className="mt-1  text-gray-900">
                        {selectedBlog[0].author}
                      </p>
                    </div>
                    <div>
                      <label className="block  font-medium text-gray-700">
                        ইমেইল
                      </label>
                      <p className="mt-1  text-gray-900">
                        {selectedBlog[0].email}
                      </p>
                    </div>
                    <div>
                      <label className="block  font-medium text-gray-700">
                        জমার তারিখ
                      </label>
                      <p className="mt-1  text-gray-900">
                        {new Date(selectedBlog[0].date).toLocaleDateString(
                          "bn-BD"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div>
                    <label className="block  font-medium text-gray-700 mb-2">
                      ব্লগ কন্টেন্ট
                    </label>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className=" text-gray-900 whitespace-pre-line">
                        {selectedBlog[0].content}
                      </p>
                    </div>
                  </div>

                  {/* Rejection Reason (if rejected) */}
                  {selectedBlog.status === "rejected" &&
                    selectedBlog[0].rejectionReason && (
                      <div>
                        <label className="block  font-medium text-gray-700 mb-2">
                          প্রত্যাখ্যানের কারণ
                        </label>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <p className=" text-red-700">
                            {selectedBlog[0].rejectionReason}
                          </p>
                        </div>
                      </div>
                    )}

                  {/* Rejection Input (if pending and rejecting) */}
                  {selectedBlog[0].status === "pending" &&
                    selectedBlog[1] !== "see" && (
                      <div>
                        <label className="block  font-medium text-gray-700 mb-2">
                          প্রত্যাখ্যানের কারণ
                        </label>
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="অনুগ্রহ করে প্রত্যাখ্যানের স্পষ্ট কারণ উল্লেখ করুন..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="4"
                        />
                      </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                  {selectedBlog[0].status === "pending" &&
                    selectedBlog[1] !== "see" && (
                      <>
                        <button
                          onClick={() => handleApprove(selectedBlog[0].id)}
                          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                        >
                          ব্লগ অনুমোদন করুন
                        </button>
                        <button
                          onClick={() => handleReject(selectedBlog[0].id)}
                          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                          ব্লগ প্রত্যাখ্যান করুন
                        </button>
                      </>
                    )}
                  <button
                    onClick={() => {
                      setSelectedBlog(null);
                      setRejectionReason("");
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
