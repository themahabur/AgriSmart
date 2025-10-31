"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function FarmComments({ blogSlug }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("comments");
  const [formData, setFormData] = useState({ comment: "", rating: 0 });
  const [replyData, setReplyData] = useState({});

  const API_BASE = "https://agri-smart-server.vercel.app/api";

  useEffect(() => {
    if (!blogSlug) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const commentsRes = await fetch(`${API_BASE}/blog/${blogSlug}`);
        const commentsResult = await commentsRes.json();
        if (commentsResult.success) setComments(commentsResult.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogSlug]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogSlug,
          name: session.user.name,
          email: session.user.email,
          comment: formData.comment,
          rating: formData.rating,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("আপনার মন্তব্য সাবমিট হয়েছে!");
        setFormData({ comment: "", rating: 0 });

        const commentsRes = await fetch(`${API_BASE}/blog/${blogSlug}`);
        setComments((await commentsRes.json()).data || []);
      } else {
        toast.error(result.message || "কমেন্ট সাবমিট করতে সমস্যা হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      toast.error("কমেন্ট সাবমিট করতে সমস্যা হয়েছে!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId) => {
    const reply = replyData[commentId];
    if (!reply?.comment) {
      toast.error("রিপ্লাই লিখুন!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${commentId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session.user.name,
          email: session.user.email,
          comment: reply.comment,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("রিপ্লাই সাবমিট হয়েছে!");
        setReplyData((prev) => ({
          ...prev,
          [commentId]: { comment: "", showReply: false },
        }));

        const commentsRes = await fetch(`${API_BASE}/blog/${blogSlug}`);
        setComments((await commentsRes.json()).data || []);
      } else {
        toast.error(result.message || "রিপ্লাই সাবমিট করতে সমস্যা হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      toast.error("রিপ্লাই সাবমিট করতে সমস্যা হয়েছে!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const toastId = toast.custom(
      (t) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-xs">
          <p className="text-gray-800 text-sm mb-3">মন্তব্য মুছতে চান?</p>
          <div className="flex gap-2">
            <button
              onClick={() => toast.dismiss(toastId)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50"
            >
              না
            </button>
            <button
              onClick={async () => {
                toast.dismiss(toastId);
                try {
                  const res = await fetch(`${API_BASE}/${commentId}`, {
                    method: "DELETE",
                  });
                  const result = await res.json();
                  if (result.success) {
                    toast.success("মুছে ফেলা হয়েছে!");
                    setComments((prev) =>
                      prev.filter((c) => c._id !== commentId)
                    );
                  } else {
                    toast.error("সমস্যা হয়েছে!");
                  }
                } catch (err) {
                  toast.error("সমস্যা হয়েছে!");
                }
              }}
              className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              হ্যাঁ
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-right",
      }
    );
  };

 const handleDeleteReply = async (commentId, replyId) => {
  const toastId = toast.custom((t) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs">
      <p className="text-gray-700 text-sm mb-2">রিপ্লাই মুছবেন?</p>
      <div className="flex gap-1">
        <button
          onClick={() => toast.dismiss(toastId)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50"
        >
          না
        </button>
        <button
          onClick={async () => {
            toast.dismiss(toastId);
            try {
              const res = await fetch(`${API_BASE}/${commentId}/replies/${replyId}`, {
                method: "DELETE",
              });
              const result = await res.json();
              if (result.success) {
                toast.success("মুছে ফেলা হয়েছে!");
                setComments((prev) =>
                  prev.map((c) =>
                    c._id === commentId ? { ...c, replies: result.data.replies } : c
                  )
                );
              } else {
                toast.error("সমস্যা হয়েছে!");
              }
            } catch (err) {
              toast.error("সমস্যা হয়েছে!");
            }
          }}
          className="flex-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
        >
          হ্যাঁ
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
    position: 'top-right',
  });
};

  const StarRating = ({ rating, onChange, readonly = false }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange(star)}
          className={`text-xl ${
            star <= rating ? "text-amber-500" : "text-gray-300"
          } ${!readonly ? "cursor-pointer hover:text-amber-400" : ""}`}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );

  if (loading)
    return (
      <div className="text-center py-12 space-y-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600 mx-auto"></div>
        <p className="text-gray-500 text-sm">কমেন্ট লোড হচ্ছে...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-center" />

      {/* Tabs - Simple */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-3 px-1 border-b-2 text-sm font-normal transition-colors ${
              activeTab === "comments"
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            মন্তব্য ({comments.length})
          </button>
          <button
            onClick={() => setActiveTab("add-comment")}
            className={`pb-3 px-1 border-b-2 text-sm font-normal transition-colors ${
              activeTab === "add-comment"
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            মন্তব্য লিখুন
          </button>
        </div>
      </div>

      {/* Comments List */}
      {activeTab === "comments" && (
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
              <div className="text-4xl mb-3 text-gray-400">💬</div>
              <h3 className="text-base font-normal text-gray-600 mb-1">
                এখনও কোন মন্তব্য নেই
              </h3>
              <p className="text-gray-500 text-sm">
                প্রথম মন্তব্য করার জন্য নিচে ক্লিক করুন
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      {comment.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {comment.name}
                      </h4>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(comment.createdAt).toLocaleString("bn-BD")}
                      </span>
                    </div>

                    {comment.rating > 0 && (
                      <div className="mb-2">
                        <StarRating rating={comment.rating} readonly />
                      </div>
                    )}

                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {comment.comment}
                    </p>

                    <div className="flex items-center gap-2">
                      {session && (
                        <>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                          >
                            মুছুন
                          </button>
                          <button
                            onClick={() =>
                              setReplyData((prev) => ({
                                ...prev,
                                [comment._id]: {
                                  ...prev[comment._id],
                                  showReply: !prev[comment._id]?.showReply,
                                },
                              }))
                            }
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                          >
                            রিপ্লাই
                          </button>
                        </>
                      )}
                    </div>

                    {/* Replies */}
                    {comment.replies?.length > 0 && (
                      <div className="ml-3 mt-4 space-y-3 border-l border-gray-200 pl-3">
                        {comment.replies.map((reply, index) => (
                          <div
                            key={reply._id || index}
                            className="bg-gray-50 rounded p-3"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs">
                                    {reply.name?.charAt(0)?.toUpperCase() ||
                                      "U"}
                                  </span>
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-gray-900">
                                    {reply.name}
                                  </h5>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      reply.createdAt || Date.now()
                                    ).toLocaleString("bn-BD")}
                                  </p>
                                </div>
                              </div>
                              {session && (
                                <button
                                  onClick={() =>
                                    handleDeleteReply(comment._id, reply._id)
                                  }
                                  className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200 transition-colors"
                                >
                                  মুছুন
                                </button>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm ml-8">
                              {reply.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    {session && replyData[comment._id]?.showReply && (
                      <div className="ml-3 mt-3 bg-gray-50 rounded p-3">
                        <textarea
                          value={replyData[comment._id]?.comment || ""}
                          onChange={(e) =>
                            setReplyData((prev) => ({
                              ...prev,
                              [comment._id]: {
                                ...prev[comment._id],
                                comment: e.target.value,
                                showReply: true,
                              },
                            }))
                          }
                          rows="2"
                          placeholder="আপনার রিপ্লাই লিখুন..."
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 resize-none"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSubmitReply(comment._id)}
                            className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            সাবমিট
                          </button>
                          <button
                            onClick={() =>
                              setReplyData((prev) => ({
                                ...prev,
                                [comment._id]: {
                                  ...prev[comment._id],
                                  showReply: false,
                                },
                              }))
                            }
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                          >
                            বাতিল
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Comment Form */}
      {activeTab === "add-comment" && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {session ? (
            <>
              <h3 className="text-lg font-normal text-gray-900 mb-4">
                নতুন মন্তব্য লিখুন
              </h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    রেটিং (ঐচ্ছিক)
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <StarRating
                      rating={formData.rating}
                      onChange={(r) =>
                        setFormData((prev) => ({ ...prev, rating: r }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    rows="4"
                    placeholder="আপনার মন্তব্য এখানে লিখুন..."
                    className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-normal"
                >
                  {submitting ? "সাবমিট হচ্ছে..." : "মন্তব্য সাবমিট করুন"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl mb-3 text-gray-400">🔒</div>
              <h3 className="text-base font-normal text-gray-700 mb-2">
                লগইন প্রয়োজন
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                মন্তব্য করতে লগইন করুন
              </p>
              <button className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                লগইন করুন
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}