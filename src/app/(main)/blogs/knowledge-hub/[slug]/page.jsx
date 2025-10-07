"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const formattedDate = (dateString) => {
    try {
      const dateToFormat = dateString ? dateString : new Date().toISOString();
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোডিং হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">📭</div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">ব্লগ পোস্টটি খুঁজে পাওয়া যায়নি</h1>
          <p className="text-gray-600">আপনি যে ব্লগটি খুঁজছেন তা মুছে ফেলা বা সরানো হয়েছে।</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg mb-6">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {blog.category || "Technology"}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                {blog.subtitle}
              </p>
            )}

            <div className="flex justify-center items-center gap-6 text-gray-500 text-sm">
              <span>{blog.author?.name || "Anayet"}</span>
              <span>•</span>
              <span>{formattedDate(blog.createdAt)}</span>
              <span>•</span>
              <span>{blog.readTime || "5"} মিনিট পড়া</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          
          <div className="lg:col-span-8">
            {blog.media && (
              <img
                src={blog.media}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-md"
              />
            )}

            <article className="prose prose-lg max-w-none
              prose-headings:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-gray-900 prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-gray-400 prose-blockquote:bg-gray-50
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-img:rounded-lg prose-img:shadow-sm
              prose-code:bg-gray-100 prose-code:text-gray-700
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            ></article>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ট্যাগ সমূহ</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-4">
            <div className="space-y-8">
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {(blog.author?.name || "Anayet").charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{blog.author?.name || "Anayet"}</h3>
                    <p className="text-gray-600 text-sm">লেখক</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  প্রকাশিত: {formattedDate(blog.createdAt)}
                </p>
                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                  <p className="text-gray-700 text-sm mt-1">
                    আপডেট: {formattedDate(blog.updatedAt)}
                  </p>
                )}
              </div>

              {blog.summary && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">সারসংক্ষেপ</h3>
                  <p className="text-gray-700 leading-relaxed">{blog.summary}</p>
                </div>
              )}

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-4">দ্রুত তথ্য</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">ধরন</span>
                    <span className="font-medium text-gray-900">{blog.type || "Article"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">পড়ার সময়</span>
                    <span className="font-medium text-gray-900">{blog.readTime || "5"} মিনিট</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">বিভাগ</span>
                    <span className="font-medium text-gray-900">{blog.category || "Technology"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-4">নেভিগেশন</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    ← পূর্ববর্তী ব্লগ
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    পরবর্তী ব্লগ →
                  </button>
                 <Link href="/blogs">
                  <button className="w-full text-left p-3 bg-gray-900 text-white rounded-lg border border-gray-900 hover:bg-gray-800 transition-colors">
                    সব ব্লগ দেখুন
                  </button>
                 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}