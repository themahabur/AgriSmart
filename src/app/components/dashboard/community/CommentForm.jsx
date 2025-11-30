"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useSession } from "next-auth/react";

export const CommentForm = ({ postId, onCommentAdded }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);

    await onCommentAdded(content);

    setContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="mt-6 flex items-start space-x-4">
      <img
        src={session?.user?.image || "/default-avatar.png"}
        alt="Your avatar"
        className="h-10 w-10 rounded-full"
      />
      <form onSubmit={handleSubmit} className="min-w-0 flex-1">
        <div>
          <label htmlFor="comment" className="sr-only">
            Add a comment
          </label>
          <textarea
            id="comment"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="Add your comment..."
            required
          />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none disabled:bg-green-300"
          >
            <FaPaperPlane className="-ml-1 mr-2 h-5 w-5" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};
