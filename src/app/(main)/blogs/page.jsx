"use client";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  const isYouTubeUrl = (url) =>
    url?.includes("youtube.com") || url?.includes("youtu.be");

  const getYouTubeEmbedUrl = (url) => {
    try {
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return null;
    }
  };

  return (
    <main className="px-6 py-10 container mx-auto md:px-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700">
        জ্ঞানভান্ডার
      </h1>
      <p className="text-gray-600 mb-6 mt-3">
        আপনার কৃষি কার্যক্রম উন্নত করতে সহায়ক শিক্ষামূলক রিসোর্স
      </p>

      <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-7 mb-8 bg-gray-50 duration-300">
        <div className="relative h-[400px] md:h-[350px] md:col-span-3">
          {featured.media ? (
            isValidImageUrl(featured.media) ? (
              <Image
                src={featured.media}
                alt={featured.title || "Featured blog image"}
                fill
                className="object-cover"
              />
            ) : isYouTubeUrl(featured.media) ? (
              <iframe
                className="w-full h-full rounded-lg"
                src={getYouTubeEmbedUrl(featured.media)}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Unsupported Media</span>
              </div>
            )
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Media</span>
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
            <div className="flex flex-wrap gap-1 mt-2">
              {featured.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <span className="text-gray-600 mt-3">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res._id}
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-green-200"
          >
            <div className="relative overflow-hidden">
              {res.media ? (
                isValidImageUrl(res.media) ? (
                  <img
                    src={res.media}
                    alt={res.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : isYouTubeUrl(res.media) ? (
                  <iframe
                    className="w-full h-48"
                    src={getYouTubeEmbedUrl(res.media)}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                    <span className="text-gray-500">Unsupported Media</span>
                  </div>
                )
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                  <span className="text-gray-500">No Media</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                <Link href={`/blogs/knowledge-hub/${res.slug}`}>
                  {res.title}
                </Link>
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {res.summary || res.body?.slice(0, 120) + "..."}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{res.author?.name || "অজানা লেখক"}</span>
                <span>
                  {res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "তারিখ নেই"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
