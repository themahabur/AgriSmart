"use client";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoBookmarkOutline, IoEyeOutline } from "react-icons/io5";
import { isValidImageUrl } from "@/lib/imageUtils";

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://agri-smart-server.vercel.app/api/knowledge-hub?limit=10&status=published"
        );
        const result = await res.json();

        const blogs = result.data || result;

        if (blogs && blogs.length > 0) {
          setFeatured(blogs[0]);
          setResources(blogs.slice(1));
        } else {
          setFeatured(null);
          setResources([]);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setFeatured(null);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
console.log(featured);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (!featured) {
    return (
      <main className="px-6 py-10 container mx-auto md:px-10 text-center text-gray-600">
        No data found.
      </main>
    );
  }

  return (
    <main className="px-6 py-10 container mx-auto md:px-10">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-green-700">
        জ্ঞানভান্ডার
      </h1>
      <p className="text-gray-600 mb-6 mt-3">
        আপনার কৃষি কার্যক্রম উন্নত করতে সহায়ক শিক্ষামূলক রিসোর্স
      </p>

      <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-7 mb-8 bg-gray-50 duration-300">
        <div className="relative h-[400px] md:h-[350px] md:col-span-3">
          {featured.media && isValidImageUrl(featured.media) ? (
            <Image
              src={featured.media}
              alt={featured.title || "Featured blog image"}
              fill
              className="object-cover md:col-span-3"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="p-6 md:col-span-4 flex flex-col justify-between">
          <div>
            <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full w-fit">
              {featured.category || "অজানা"}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold mt-3 text-gray-800">
              {featured.title}
            </h2>
            <div className="mt-3 text-md text-gray-500">
              <span>
                {featured.createdAt
                  ? new Date(featured.createdAt).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "তারিখ নেই"}{" "}
                • {featured.readTime || "৫ মিনিট"}
              </span>
            </div>
            <p className="text-gray-600 text-md my-3 line-clamp-3">
              {featured.summary}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {featured.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </p>
          </div>
          <span className="text-gray-600">
            {featured.author?.name || "অজানা লেখক"}
          </span>
          <Link href={`/blogs/knowledge-hub/${featured.slug}`}>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 w-fit">
            পুরো আর্টিকেল পড়ুন
          </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">সব রিসোর্স</h2>
         
        <button className="text-green-600 font-medium hover:underline flex items-center gap-2 group">
          সব দেখুন
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, index) => (
          <div
            key={res._id}
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-green-200"
          >
            <div className="relative overflow-hidden">
              {res.media && isValidImageUrl(res.media) ? (
                <Image 
                  height={400} 
                  width={600}
                  src={res.media}
                  alt={res.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3">
                <span className="bg-white text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200">
                  {res.category || "সাধারণ"}
                </span>
              </div>

              {res.status === "published" && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-white bg-black/60 px-2 py-1 rounded-md">
                    প্রকাশিত
                  </span>
                </div>
              )}

              <div className="absolute bottom-1 right-4 transform -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-110 group/like">
                  <GoHeart className="text-xl" />
                </button>

                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-lg  transition-all duration-200 hover:scale-110 group/save">
                  <IoBookmarkOutline className="text-xl" />
                </button>

                <Link href={`/blogs/knowledge-hub/${res.slug}`}>
                  <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center  shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-110 hover:bg-green-700">
                    <IoEyeOutline className="text-xl" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-600 text-xs font-semibold">
                  {res.type}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {res.readTime || "৫ মিনিট"}
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                {res.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {res.summary || res.body?.slice(0, 120) + "..."}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {res.tags?.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {res.author?.name?.charAt(0) || "অ"}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      {res.author?.name || "অজানা লেখক"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 text-right">
                  {res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "তারিখ নেই"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
