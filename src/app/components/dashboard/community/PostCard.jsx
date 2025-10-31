import Link from "next/link";
import {
  FaComment,
  FaThumbsUp,
  FaShare,
  FaBookmark,
  FaEllipsisH,
} from "react-icons/fa";

// A small utility to safely get nested properties
const get = (obj, path, defaultValue = null) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const PostCard = ({ post, onLike, onBookmark }) => {
  const postContent = post.description;

  // Safely access author details
  const authorName = get(
    post,
    "author.name",
    get(post, "user.name", "Unknown User")
  );
  const authorAvatar = post.user?.avatar || "/faq.png";

  // Handle both number  and array for likes/comments
  const likeCount = Array.isArray(post.likes)
    ? post.likes.length
    : post.likes || 0;
  const commentCount = Array.isArray(post.comments)
    ? post.comments.length
    : post.comments || 0;

  return (
    <Link href={`/dashboard/community/${post._id}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow font-hind">
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover bg-gray-100"
            />
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800">{authorName}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <FaEllipsisH />
          </button>
        </div>

        <div className="px-5 pb-4">
          <h4 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h4>
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-80 object-cover rounded-lg mb-4"
            />
          )}

          {/*
          IMPORTANT: Rendering HTML from the database.
          Using dangerouslySetInnerHTML because Tiptap provides HTML.
          For production, you MUST sanitize this HTML (e.g., with DOMPurify) to prevent XSS attacks.
        */}
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex space-x-5 text-gray-500">
            <button
              onClick={() => onLike(post._id)}
              className={`flex items-center space-x-2 hover:text-green-600 transition-colors ${
                post.isLiked ? "text-green-600 font-semibold" : ""
              }`}
            >
              <FaThumbsUp /> <span>{likeCount}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
              <FaComment /> <span>{commentCount}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
              <FaShare /> <span>শেয়ার</span>
            </button>
          </div>
          <button
            onClick={() => onBookmark(post._id)}
            className={`hover:text-green-600 transition-colors ${
              post.isBookmarked ? "text-green-600" : "text-gray-500"
            }`}
          >
            <FaBookmark />
          </button>
        </div>
      </div>
    </Link>
  );
};
