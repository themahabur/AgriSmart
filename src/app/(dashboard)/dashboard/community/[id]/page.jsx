"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaThumbsUp, FaComment, FaArrowLeft } from "react-icons/fa";
import CommentList from "@/app/components/dashboard/community/CommentList";
import { CommentForm } from "@/app/components/dashboard/community/CommentForm";
import { OptionsMenu } from "@/app/components/dashboard/community/OptionsMenu";

const PostDetailPage = () => {
  const { id } = useParams(); // Get post ID from URL
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const res = await axiosInstance.get(`/community/${id}`); // API: GET single post
          setPost(res.data.data);
        } catch (error) {
          toast.error("Could not load post.");
          router.push("/community");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, router]);

  const handleLike = async () => {
    // Optimistic update for single post state
    const originalPost = { ...post };
    const isLiked = post.likes.includes(session.user.id);
    const newLikes = isLiked
      ? post.likes.filter((uid) => uid !== session.user.id)
      : [...post.likes, session.user.id];
    setPost({ ...post, likes: newLikes, likeCount: newLikes.length });

    try {
      await axiosInstance.patch(`/community/${id}/like`); // API: PATCH like
    } catch (error) {
      toast.error("Failed to update like.");
      setPost(originalPost);
    }
  };

  const handleCommentAdded = async (content) => {
    try {
      const res = await axiosInstance.post(`/community/${id}/comments`, {
        content,
      }); // API: POST comment
      // Add new comment to state for immediate feedback
      setPost({ ...post, comments: [...post.comments, res.data.data] });
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <ClipLoader color="#22c55e" size={50} />
         */}{" "}
        loading...
      </div>
    );
  }

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>;
  }

  const isLiked = post.likes?.includes(session?.user?.id);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <FaArrowLeft className="mr-2" />
        Back to Community
      </button>

      {/* Post Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={post.author?.avatar || "/default-avatar.png"}
            alt={post.author?.name}
            className="w-14 h-14 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-sm text-gray-500">
              By {post.author?.name} on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <OptionsMenu
          post={post}
          session={session}
          onDelete={() => router.push("/community")}
        />{" "}
        {/* Redirect after delete */}
      </div>

      {/* Post Content */}
      <div className="mt-6">
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-96 object-cover rounded-lg mb-6"
          />
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t flex items-center space-x-6">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            isLiked
              ? "text-green-600 font-semibold"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          <FaThumbsUp /> <span>{post.likeCount} Likes</span>
        </button>
        <span className="flex items-center space-x-2 text-gray-500">
          <FaComment /> <span>{post.commentCount} Comments</span>
        </span>
      </div>

      {/* Comments Section */}
      <div className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetailPage;
