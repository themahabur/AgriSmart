"use client";
import Loading from "@/app/components/loading/Loading";
import { useEffect, useState } from "react";

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

  return (
    <main className="px-6 py-10 container mx-auto md:px-10">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-green-700">
        জ্ঞানভান্ডার
      </h1>
      <p className="text-gray-600 mb-6 mt-3">
        আপনার কৃষি কার্যক্রম উন্নত করতে সহায়ক শিক্ষামূলক রিসোর্স
      </p>

      {/* Featured Section */}
      <div className="rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-7 mb-8 bg-gray-50 duration-300">
      <div className="relative h-[400px] md:h-[350px] md:col-span-3">
        <img
          src={featured.media}
          alt={featured.title}
          className="object-cover md:col-span-3 w-full"
        />
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
                : "তারিখ নেই"} • {featured.readTime || "৫ মিনিট"}
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
        <span className="text-gray-600">{featured.author?.name || "অজানা লেখক"}</span>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 w-fit">
          পুরো আর্টিকেল পড়ুন
        </button>
      </div>
    </div>

      {/* All Resources */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">সব রিসোর্স</h2>
        <button className="text-green-600 font-medium hover:underline">
          সব দেখুন
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res._id}
            className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={res.media}
                alt={res.title}
                className="w-full h-52 object-cover"
              />
              {res.status === "published" && (
                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-lg bg-green-600 text-white">
                  প্রকাশিত
                </span>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs text-gray-500">
                {res.type} {res.readTime ? `• ${res.readTime}` : ""}
              </span>
              <h3 className="font-semibold mt-1 text-xl">{res.title}</h3>
              <p className="text-gray-600 text-md mt-2 flex-1">
                {res.summary || res.body?.slice(0, 120) + "..."}
              </p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>
                  {res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "তারিখ নেই"}
                </span>
                <span>{res.author?.name || "অজানা লেখক"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
