// Your main community page component

"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { PostFormModal } from "@/app/components/dashboard/community/PostFormModal";
import { PostCard } from "@/app/components/dashboard/community/PostCard";
// import { ClipLoader } from "react-spinners";

const CommunityPage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    if (!session) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get("/community");

      // Get user's bookmarked posts (ideally this is part of the session object or a separate API call)
      const userBookmarks = session?.user?.bookmarks || [];

      const postsWithUIState = res.data.data.map((post) => ({
        ...post,
        // DERIVED STATE: This is calculated on the client, not stored in the DB.
        isLiked: Array.isArray(post.likes)
          ? post.likes.includes(session.user.id)
          : false,
        isBookmarked: userBookmarks.includes(post._id),
      }));
      setPosts(postsWithUIState);
    } catch (err) {
      toast.error("পোস্ট লোড করা যায়নি।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch posts when the session has been loaded
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status, session]); // Rerun if session status changes

  // Callback to add new post to the top of the list
  const handlePostCreated = (newPost) => {
    // Manually add the author details if the backend doesn't populate them on create
    if (!newPost.author && !newPost.user) {
      newPost.user = {
        name: session.user.name,
        avatar: session.user.image,
      };
    }
    setPosts([newPost, ...posts]);
    setIsModalOpen(false); // Close modal on success
  };

  const handleLike = async (postId) => {
    // REFINED: Add a guard clause to prevent action if user is not logged in.
    if (!session?.user?.id) {
      toast.error("Please log in to like a post.");
      return;
    }

    const originalPosts = [...posts];

    setPosts(
      posts.map((post) => {
        if (post._id === postId) {
          // REFINED: Ensure post.likes is an array to prevent errors with old data.
          const currentLikes = Array.isArray(post.likes) ? post.likes : [];

          const isLiked = currentLikes.includes(session.user.id);

          const updatedLikes = isLiked
            ? currentLikes.filter((id) => id !== session.user.id) // This matches your backend `pull`
            : [...currentLikes, session.user.id]; // This matches your backend `push`

          return {
            ...post,
            likes: updatedLikes,
            // Also update the derived `isLiked` state for immediate UI feedback
            isLiked: !isLiked,
          };
        }
        return post;
      })
    );

    // Backend API call
    try {
      await axiosInstance.patch(`/community/posts/${postId}/like`);
    } catch (error) {
      toast.error("Failed to update like. Please try again.");
      setPosts(originalPosts); // Revert on failure
    }
  };

  const handleBookmark = async (postId) => {
    toast.success("Bookmark feature coming soon!");
    // Implement optimistic update for bookmarks here...
  };

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        {/* <ClipLoader color="#22c55e" size={50} /> */}
        <div> loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="user avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <p className="text-gray-500">
            আপনার প্রশ্ন বা অভিজ্ঞতা শেয়ার করুন...
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shrink-0"
        >
          <FaPlus className="mr-2" />
          পোস্ট করুন
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default CommunityPage;
