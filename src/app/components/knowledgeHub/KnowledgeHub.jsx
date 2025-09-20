"use client";
import LayoutBox from "../shared/layoutBox/LayoutBox";

// Sample Data
const allPosts = [
  {
    id: 1,
    type: "video",
    category: "রোগবালাই",
    title: "ধানের ব্লাস্ট রোগ দমন করার আধুনিক উপায়",
    thumbnail: "https://i.ibb.co.com/ZRn0CZ4g/imageone.webp",
    link: "/tutorials/video/rice-blast",
  },
  {
    id: 2,
    type: "blog",
    category: "নতুন প্রযুক্তি",
    title: "ড্রোন ব্যবহার করে কীভাবে জমিতে সার প্রয়োগ করবেন?",
    thumbnail: "https://i.ibb.co.com/d0T1qZQW/drone.webp",
    link: "/blogs/drone-fertilizer",
  },
  {
    id: 3,
    type: "blog",
    category: "পরামর্শ",
    title: "বর্ষা মৌসুমে সবজি চাষের জন্য সেরা ৫টি টিপস",
    thumbnail: "https://i.ibb.co.com/zTr403Nj/rain.webp",
    link: "/blogs/monsoon-tips",
  },
  {
    id: 4,
    type: "video",
    category: "পরামর্শ",
    title: "মাটির স্বাস্থ্য পরীক্ষা কেন জরুরি এবং কীভাবে করবেন?",
    thumbnail: "https://i.ibb.co.com/hQvX35P/land.webp",
    link: "/tutorials/video/soil-testing",
  },
  {
    id: 5,
    type: "blog",
    category: "রোগবালাই",
    title: "আলুর পাতাপচা রোগ প্রতিরোধের কার্যকরী কৌশল",
    thumbnail: "https://i.ibb.co.com/dsQzQSq9/sickcrop.webp",
    link: "/blogs/potato-blight",
  },
];

// sample categories
const categories = ["সব", "রোগবালাই", "নতুন প্রযুক্তি", "পরামর্শ"];

const filteredPosts =
  activeCategory === "সব"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

const featuredPost = filteredPosts[0];

const KnowledgeHub = () => {
  return (
    <LayoutBox>
      <section id="knowledge-hub">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-hind text-gray-800">
            জ্ঞানই শক্তি:{" "}
            <span className="text-primary">আধুনিক চাষাবাদ শিখুন</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-hind max-w-3xl mx-auto">
            আমাদের ভিডিও টিউটোরিয়াল এবং ব্লগ থেকে কৃষি বিষয়ক সর্বশেষ তথ্য ও কৌশল
            জানুন।
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`btn font-hind text-sm ${
                activeCategory === category
                  ? "btn-primary"
                  : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Featured Post (Left) */}
          {featuredPost && (
            <div className="group cursor-pointer bg-white border border-gray-200 rounded-2xl  hover:shadow-lg transition-shadow ">
              <a href={featuredPost.link} className="block">
                <div className="relative  overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={featuredPost.thumbnail}
                    alt={featuredPost.title}
                    className="w-full h-auto aspect-video object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {featuredPost.type === "video" && (
                    <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                      <div className="bg-primary bg-opacity-80 rounded-full h-16 w-16 flex items-center justify-center">
                        <FaPlay className="text-white text-2xl" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="inline-block bg-secondary text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl font-bold font-hind text-gray-900 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                </div>
              </a>
            </div>
          )}
        </div>
      </section>
    </LayoutBox>
  );
};

export default KnowledgeHub;
