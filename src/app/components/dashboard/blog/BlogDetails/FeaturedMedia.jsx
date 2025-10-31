"use client";

import Image from "next/image";
import { isValidImageUrl } from "@/lib/imageUtils";

export default function FeaturedMedia({ media, title }) {
  if (!media) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg w-full h-48 flex items-center justify-center mb-8">
        <span className="text-gray-400 text-sm">No media</span>
      </div>
    );
  }

  if (isValidImageUrl(media)) {
    return (
      <div className="relative w-full h-64 lg:h-80 rounded-lg mb-8 overflow-hidden bg-gray-50 border border-gray-200">
        <Image
          src={media}
          alt={title || "Blog media"}
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  if (media.includes("youtube.com") || media.includes("youtu.be")) {
    const videoId = media.includes("youtube.com/embed")
      ? media.split("/").pop()
      : media.includes("youtu.be")
      ? media.split("/").pop()
      : null;

    const embedUrl = videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : "";

    return (
      <div className="relative w-full h-64 lg:h-80 rounded-lg mb-8 overflow-hidden bg-gray-50 border border-gray-200">
        <iframe
          className="w-full h-full rounded-lg"
          src={embedUrl}
          title={title || "YouTube video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg w-full h-48 flex items-center justify-center mb-8">
      <span className="text-gray-400 text-sm">Unsupported media</span>
    </div>
  );
}
