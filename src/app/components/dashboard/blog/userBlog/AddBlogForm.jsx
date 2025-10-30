"use client";
import { useState, useMemo } from "react";
import defaultSlugify from "@sindresorhus/slugify";
import { FiSave, FiSend, FiLoader } from "react-icons/fi";
import FormInput from "./FormInput";
import ImageUploader from "./ImageUploader";
import VideoUrlInput from "./VideoUrlInput";
import RichTextEditor from "./RichTextEditor";
import TagInput from "./TagInput";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const AddBlogForm = ({ user }) => {
  const [postData, setPostData] = useState({
    title: "",
    subtitle: "",
    summary: "",
    type: "blog",
    category: "Technology",
    readTime: "",
  });

  const [media, setMedia] = useState({ file: null, url: "" });
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Auto slugify from title
  const slug = useMemo(
    () => (postData.title ? defaultSlugify(postData.title) : ""),
    [postData.title]
  );

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (publishStatus) => {
    setError("");
    setIsSubmitting(true);
    let mediaUrl = "";

    try {
      if (postData.type === "blog" && media.file) {
        const formData = new FormData();
        formData.append("file", media.file);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Image upload failed!");
        }

        const result = await uploadResponse.json();
        mediaUrl = result.url;
      }

      if (postData.type === "video" && media.url) {
        let videoId = "";

        if (/^[\w-]{11}$/.test(media.url)) {
          videoId = media.url;
        }
        else if (
          media.url.includes("youtube.com") ||
          media.url.includes("youtu.be")
        ) {
          try {
            const url = new URL(media.url);
            if (url.hostname.includes("youtu.be")) {
              videoId = url.pathname.slice(1); 
            } else {
              videoId = url.searchParams.get("v"); 
            }
            if (!videoId) throw new Error();
          } catch {
            throw new Error("Please enter a valid YouTube video URL or ID.");
          }
        } else {
          throw new Error("Please enter a valid YouTube video URL or ID.");
        }

        mediaUrl = `https://www.youtube.com/embed/${videoId}`; 
      }

      const finalPostData = {
        title: postData.title.trim(),
        subtitle: postData.subtitle.trim(),
        summary: postData.summary.trim(),
        type: postData.type === "blog" ? "article" : "video",
        category: postData.category,
        slug,
        body,
        readTime: postData.readTime || "02:00 min",
        media: mediaUrl,
        tags,
        status: publishStatus,
        author: {
          name: user?.name || "Unknown",
          email: user?.email || "",
        },
      };

      // --- API request
      await axiosInstance.post("/knowledge-hub", finalPostData);
      toast.success("✅ Blog submitted successfully!");

      // --- Reset form
      setPostData({
        title: "",
        subtitle: "",
        summary: "",
        type: "blog",
        category: "Technology",
        readTime: "",
      });
      setMedia({ file: null, url: "" });
      setBody("");
      setTags([]);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred.");
      toast.error("❌ Blog submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* -------- Left Column -------- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Core Content */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6 border-b pb-3">
              Core Content
            </h3>
            <FormInput
              label="পোস্টের শিরোনাম (Title)"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              required
            />
            <FormInput
              label="উপ শিরোনাম (Subtitle)"
              id="subtitle"
              name="subtitle"
              value={postData.subtitle}
              onChange={handleChange}
            />
            <FormInput
              label="সংক্ষিপ্ত বিবরণ (Summary)"
              id="summary"
              name="summary"
              value={postData.summary}
              onChange={handleChange}
            />
            <FormInput
              label="স্লাগ (URL)"
              id="slug"
              name="slug"
              value={slug}
              readOnly
              disabled
            />
          </div>

          {/* Post Media */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6">
              Post Media
            </h3>

            <div className="p-1 bg-green-50 rounded-full flex mb-6">
              {["blog", "video"].map((type) => (
                <label
                  key={type}
                  className={`w-1/2 text-center py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    postData.type === type
                      ? "bg-white shadow text-green-700 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={postData.type === type}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>

            {postData.type === "blog" ? (
              <ImageUploader
                onFileSelect={(file) => setMedia((prev) => ({ ...prev, file }))}
              />
            ) : (
              <VideoUrlInput
                value={media.url}
                onChange={(e) =>
                  setMedia((prev) => ({ ...prev, url: e.target.value }))
                }
              />
            )}
          </div>

          {/* Post Body */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6">
              Post Body
            </h3>
            <RichTextEditor content={body} onUpdate={setBody} />
          </div>
        </div>

        {/* -------- Right Column -------- */}
        <div className="lg:col-span-1 space-y-8 sticky top-24">
          {/* Publish Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              Publish Actions
            </h3>

            {error && (
              <p className="text-red-600 bg-red-100 p-3 rounded-lg mb-4 text-sm">
                {error}
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handleSubmit("published")}
                disabled={isSubmitting || !postData.title || !body}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiSend />
                )}
                প্রকাশ করুন (Publish)
              </button>
            </div>
          </div>

          {/* Post Details */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              Post Details
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ক্যাটাগরি (Category)
                </label>
                <select
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Crop Management">Crop Management</option>
                  <option value="Soil Health">Soil Health</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Weather">Weather</option>
                  <option value="Market Insights">Market Insights</option>
                  <option value="Sustainability">Sustainability</option>
                </select>
              </div>

              <FormInput
                label="পড়ার সময় (Read Time)"
                id="readTime"
                name="readTime"
                value={postData.readTime}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ট্যাগ (Tags)
                </label>
                <TagInput tags={tags} setTags={setTags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
