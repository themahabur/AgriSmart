"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { PostFormModal } from "@/app/components/dashboard/community/PostFormModal";
import { PostCard } from "@/app/components/dashboard/community/PostCard";
import { FaPlus } from "react-icons/fa";

const CommunityPage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/community"); // API: GET all posts
      console.log(res);
      setPosts(res.data.data);
    } catch (err) {
      toast.error("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  const handleLike = async (postId) => {
    // Optimistic update
    const originalPosts = posts;
    setPosts(
      posts.map((p) => {
        if (p._id === postId) {
          const isLiked = p.likes.includes(session.user.id);
          const newLikes = isLiked
            ? p.likes.filter((id) => id !== session.user.id)
            : [...p.likes, session.user.id];
          return { ...p, likes: newLikes, likeCount: newLikes.length };
        }
        return p;
      })
    );

    try {
      await axiosInstance.patch(`/community/${postId}/like`); // API: PATCH like
    } catch (error) {
      toast.error("Failed to update like.");
      setPosts(originalPosts); // Revert on failure
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    // Optimistic update
    const originalPosts = posts;
    setPosts(posts.filter((p) => p._id !== postId));

    try {
      await axiosInstance.delete(`/community/${postId}`); // API: DELETE post
      toast.success("Post deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete post.");
      setPosts(originalPosts); // Revert on failure
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">helloo ....</div>
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
            onDelete={handleDelete}
            onBookmark={() => {
              toast.success("This feature is not available yet.");
            }}
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
