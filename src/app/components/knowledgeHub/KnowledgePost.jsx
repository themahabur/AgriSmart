import React from "react";
import { FaPlay } from "react-icons/fa";

const KnowledgePost = ({ knowledgePost }) => {
  return (
    <div className="group cursor-pointer bg-white border-gray-200 rounded-2xl transition-shadow h-full border">
      <a href={knowledgePost.link} className="block">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-t-xl shadow-lg max-h-96">
          <img
            src={knowledgePost.thumbnail}
            alt={knowledgePost.title}
            className="object-cover transition-transform duration-700 group-hover:scale-110 w-full h-full"
          />
          {knowledgePost.type === "video" && (
            <div className="absolute inset-0 bg-black/15 bg-opacity-30 flex items-center justify-center">
              <div className="bg-primary bg-opacity-80 rounded-full h-16 w-16 flex items-center justify-center">
                <FaPlay className="text-white text-2xl" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="inline-block bg-secondary text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {knowledgePost.category}
          </span>
          <h3 className="text-2xl font-bold font-hind text-gray-900 group-hover:text-primary transition-colors">
            {knowledgePost.title}
          </h3>
        </div>
      </a>
    </div>
  );
};

export default KnowledgePost;
