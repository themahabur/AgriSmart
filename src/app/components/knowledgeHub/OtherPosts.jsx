import React from "react";
import { FaPlay } from "react-icons/fa";

const OtherPosts = ({ post }) => {
  return (
    <a
      href={post.link}
      className="group flex gap-4 items-center rounded-xl bg-white border border-gray-200 p-4 transition-transform hover:scale-[1.02] duration-300"
    >
      <div className="flex-shrink-0 w-28 h-28 relative">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        {post.type === "video" && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center rounded-lg">
            <FaPlay className="text-white text-lg" />
          </div>
        )}
      </div>
      <div>
        <span className="inline-block bg-gray-200 text-primary text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {post.category}
        </span>
        <h4 className="font-bold font-hind text-gray-800 leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h4>
      </div>
    </a>
  );
};

export default OtherPosts;
