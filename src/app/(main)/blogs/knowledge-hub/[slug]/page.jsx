"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isValidImageUrl } from "@/lib/imageUtils";
import Comments from "@/app/components/dashboard/blog/Comments";
import {
  FaBookmark,
  FaHome,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import ShareModal from "@/app/components/dashboard/blog/BlogDetails/ShareModal";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://agri-smart-server.vercel.app/api/knowledge-hub/slug/${slug}`
        );
        const result = await res.json();

        if (result?.data) {
          setBlog(result.data);
        } else {
          setBlog(result);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const fetchSideBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/knowledge-hub`);
        const allBlogs = await res.json();

        if (allBlogs?.data?.length) {
          const sortedByPopularity = [...allBlogs.data]
            .filter((item) => item._id !== blog?._id) 
            .sort((a, b) => (b.likes || 0) - (a.likes || 0));

          setPopularBlogs(sortedByPopularity.slice(0, 3));

          if (blog?.tags?.length) {
            const related = allBlogs.data
              .filter((item) => item._id !== blog?._id) // বর্তমান ব্লগ বাদ দিন
              .filter((b) => b.tags?.some((tag) => blog.tags.includes(tag)));
            setRelatedBlogs(related.slice(0, 3));
          } else {
            setRelatedBlogs([]);
          }
        }
      } catch (err) {
        console.error("Error fetching side blogs:", err);
      }
    };

    if (blog) {
      fetchSideBlogs();
    }
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async () => {
    if (!blog?._id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/knowledge-hub/${blog._id}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.success) {
        setBlog((prev) => ({
          ...prev,
          likes: data.data?.likes || 0,
        }));

        toast.success("লাইক করা হয়েছে ❤️");
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      toast.error("কিছু সমস্যা হয়েছে!");
    }
  };

  const handleBookmark = async () => {
    if (!blog?._id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/knowledge-hub/${blog._id}/bookmark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.success) {
        setBlog((prev) => ({
          ...prev,
          bookmarkCount: data.data?.bookmarkCount || 0,
        }));

        toast.success(
          data.data?.bookmarkCount > 0
            ? "বুকমার্ক করা হয়েছে 🔖"
            : "বুকমার্ক তুলে নেওয়া হয়েছে"
        );
      }
    } catch (error) {
      console.error("Error bookmarking blog:", error);
      toast.error("কিছু সমস্যা হয়েছে!");
    }
  };


  const isLiked = blog?.likes > 0;
  const isBookmarked = blog?.bookmarkCount > 0;

  const formattedDate = (dateString) => {
    try {
      const dateToFormat = dateString || new Date().toISOString();
      return new Date(dateToFormat).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "তারিখ নেই";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">ব্লগ লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-5xl mb-6 text-gray-400">📭</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ব্লগ পোস্টটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-gray-600 mb-6">
            আপনি যে ব্লগটি খুঁজছেন তা মুছে ফেলা বা সরানো হয়েছে।
          </p>
          <Link
            href="/blogs"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            সব ব্লগ দেখুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-26">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-white">
                      {(blog.author?.name || "A").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-normal text-gray-900 text-lg mb-1">
                    {blog.author?.name || "Author"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">লেখক</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-normal text-gray-900 text-sm uppercase tracking-wide mb-3">
                  দ্রুত একশন
                </h3>
                <div className="space-y-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowShareOptions(true)}
                      className="w-full flex items-center justify-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors text-gray-700 text-xs"
                    >
                      <FaShareAlt className="w-3 h-3" />
                      শেয়ার
                    </button>
                  </div>

                  <button
                    onClick={handleBookmark}
                    className="w-full flex items-center justify-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors text-gray-700 text-xs"
                  >
                    {isBookmarked ? (
                      <FaBookmark className="w-3 h-3" />
                    ) : (
                      <IoBookmarkOutline className="w-3 h-3" />
                    )}
                    {isBookmarked ? "সেভ করা হয়েছে" : "সেভ করুন"}
                  </button>

                  {/* All Blogs with Home Icon */}
                  <Link href="/blogs" className="block">
                    <button className="w-full flex items-center justify-center gap-2 p-2 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors text-gray-700 text-xs">
                      <FaHome className="w-3 h-3" />
                      ব্লগ হোম
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-normal text-gray-900 text-sm uppercase tracking-wide mb-3">
                  সূচিপত্র
                </h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2 py-1 hover:text-gray-900 cursor-pointer">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>ভূমিকা</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 hover:text-gray-900 cursor-pointer">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>মূল আলোচনা</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 hover:text-gray-900 cursor-pointer">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>উপসংহার</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
                  {blog.category || "Technology"}
                </span>
                <span className="text-sm text-gray-400">
                  {formattedDate(blog.createdAt)}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">
                  {blog.readTime || "5"} মিনিট পড়া
                </span>
              </div>

              {/* Title Section */}
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight">
                  {blog.title}
                </h1>

                {blog.subtitle && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {blog.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {blog.media && isValidImageUrl(blog.media) ? (
              <div className="relative w-full h-64 lg:h-80 rounded-lg mb-8 overflow-hidden bg-gray-50 border border-gray-200">
                <Image
                  src={blog.media}
                  alt={blog.title || "Blog post image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg w-full h-48 flex items-center justify-center mb-8">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}

            <div
              onClick={handleLike}
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                isLiked
                  ? "bg-red-50 border border-red-200 text-red-600"
                  : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
              title={isLiked ? "লাইক করা হয়েছে" : "লাইক করুন"}
            >
              {isLiked ? (
                <FaHeart className="w-4 h-4 text-red-500" />
              ) : (
                <FaRegHeart className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{blog?.likes || 0}</span>
              <span className="text-sm">
                {isLiked ? "লাইক করা হয়েছে" : "লাইক করুন"}
              </span>
            </div>

            {/* Article Content */}
            <article
              className="prose prose-gray max-w-none
          prose-headings:text-gray-900 prose-headings:font-light prose-headings:tracking-tight
          prose-p:text-gray-700 prose-p:leading-loose prose-p:text-[15px]
          prose-a:text-gray-900 prose-a:border-b prose-a:border-gray-300 prose-a:pb-0.5 hover:prose-a:border-gray-600
          prose-strong:text-gray-900 prose-strong:font-normal
          prose-blockquote:border-l-gray-300 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:text-gray-600
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-img:rounded-lg prose-img:border prose-img:border-gray-200
          prose-code:bg-gray-100 prose-code:text-gray-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
          prose-pre:bg-gray-50 prose-pre:text-gray-700 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg
          bg-white rounded-lg"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            ></article>

            {/* Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-normal text-gray-500 uppercase tracking-wide mb-3">
                  ট্যাগ সমূহ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-normal text-gray-500 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-8">
              <Comments blogSlug={slug} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-26">
              {/* ✅ Reading Progress */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-normal text-gray-900 text-sm">
                    পড়ার অগ্রগতি
                  </h3>
                  <span className="text-xs text-gray-500">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-gray-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* ✅ Popular Blogs */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-normal text-gray-900 text-sm uppercase tracking-wide mb-3">
                  জনপ্রিয় ব্লগ
                </h3>
                <div className="space-y-3">
                  {popularBlogs.length > 0 ? (
                    popularBlogs.map((item) => (
                      <Link
                        key={item._id}
                        href={`/blogs/knowledge-hub/${item.slug}`}
                        className="flex items-start gap-2 p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                      >
                        {item.media ? (
                          <img
                            className="w-8 h-8 object-cover rounded"
                            src={item.media}
                            alt="thumbnail"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded">
                            <span className="text-xs text-gray-500">
                              No Img
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-normal text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formattedDate(item.createdAt)}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">
                      কোন জনপ্রিয় ব্লগ পাওয়া যায়নি
                    </p>
                  )}
                </div>
              </div>

              {/* ✅ Related Blogs */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-normal text-gray-900 text-sm uppercase tracking-wide mb-3">
                  সম্পর্কিত ব্লগ
                </h3>
                <div className="space-y-3">
                  {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((item) => (
                      <Link
                        key={item._id}
                        href={`/blogs/knowledge-hub/${item.slug}`}
                        className="flex items-start gap-2 p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                      >
                        {item.media ? (
                          <img
                            className="w-8 h-8 object-cover rounded"
                            src={item.media}
                            alt="thumbnail"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded">
                            <span className="text-xs text-gray-500">
                              No Img
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-normal text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formattedDate(item.createdAt)}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">
                      কোন সম্পর্কিত ব্লগ পাওয়া যায়নি
                    </p>
                  )}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-normal text-gray-900 text-sm uppercase tracking-wide mb-2">
                  নিউজলেটার
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  নতুন ব্লগের নোটিফিকেশন
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="ইমেইল"
                    className="w-full p-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                  <button className="w-full p-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors">
                    সাবস্ক্রাইব
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showShareOptions && (
            <ShareModal blog={blog} setShowShareOptions={setShowShareOptions} />
          )}
        </div>
      </div>
    </main>
  );
}
