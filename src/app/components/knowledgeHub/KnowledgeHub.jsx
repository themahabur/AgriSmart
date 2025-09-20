"use client";
import React, { useState } from "react";
import LayoutBox from "../shared/layoutBox/LayoutBox";
import KnowledgeFilterButtons from "./KnowledgeFilterButtons";
import KnowledgePost from "./KnowledgePost";
import { FaPlay } from "react-icons/fa";
import OtherPosts from "./OtherPosts";

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

// Categories for filtering
const categories = ["সব", "রোগবালাই", "নতুন প্রযুক্তি", "পরামর্শ"];

const KnowledgeHub = () => {
  const [activeCategory, setActiveCategory] = useState("সব");

  const filteredPosts =
    activeCategory === "সব"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const knowledgePost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1, 4); // Show up to 3 other posts

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
            <KnowledgeFilterButtons
              key={category}
              category={category}
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Knowledge Post (Left) */}
          {knowledgePost && <KnowledgePost knowledgePost={knowledgePost} />}

          {/* Other Posts (Right) */}
          <div className="flex flex-col gap-6">
            {otherPosts.map((post) => (
              <OtherPosts key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <a
            href="/blogs"
            className="btn btn-primary text-lg hover:bg-secondary hover:text-black"
          >
            সব টিউটোরিয়াল ও ব্লগ দেখুন &rarr;
          </a>
        </div>
      </section>
    </LayoutBox>
  );
};

export default KnowledgeHub;
