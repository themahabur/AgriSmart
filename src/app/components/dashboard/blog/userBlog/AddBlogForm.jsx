"use client";

import { useState, useMemo } from "react";
import defaultSlugify from "@sindresorhus/slugify";
import { FiSave, FiSend, FiLoader } from "react-icons/fi";
import FormInput from "./FormInput";
import ImageUploader from "./ImageUploader";
import VideoUrlInput from "./VideoUrlInput";
import RichTextEditor from "./RichTextEditor";
import TagInput from "./TagInput";

const AddBlogForm = ({ user }) => {
  const [postData, setPostData] = useState({
    title: "",
    subtitle: "",
    summary: "",
    type: "blog",
    category: "Technology",
  });
  const [media, setMedia] = useState({ file: null, url: "" });
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const slug = useMemo(() => defaultSlugify(postData.title), [postData.title]);

  // A single, robust handler for all text inputs and select fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  // --- THIS CORE SUBMISSION LOGIC  ---
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
        if (!uploadResponse.ok) throw new Error("Image upload failed!");
        const result = await uploadResponse.json();
        mediaUrl = result.url;
      } else if (postData.type === "video") {
        if (
          !media.url.includes("youtube.com") &&
          !media.url.includes("youtu.be")
        ) {
          throw new Error("Please enter a valid YouTube URL.");
        }
        mediaUrl = media.url;
      }
      const finalPostData = {
        ...postData,
        slug,
        body,
        media: mediaUrl,
        tags,
        status: publishStatus,
        author: { name: user.name, email: user.email },
      };
      console.log(
        "Submitting final data:",
        JSON.stringify(finalPostData, null, 2)
      );
      alert(`Post submitted as ${publishStatus}! Check console for data.`);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Card 1: Core Content */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6 border-b pb-4">
              Core Content
            </h3>
            <FormInput
              label="পোস্টের শিরোনাম (Title)"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
            />
            <FormInput
              label="উপ শিরোনাম (Subtitle)"
              id="subtitle"
              name="subtitle"
              value={postData.subtitle}
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

          {/* Card 2: Post Media */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6">
              Post Media
            </h3>
            {/* Segmented Control for Post Type */}
            <div className="p-1 bg-green-50 rounded-full flex mb-6">
              {["blog", "video"].map((type) => (
                <label
                  key={type}
                  className={`w-1/2 text-center py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    postData.type === type
                      ? "bg-white shadow-sm text-green-700 font-semibold"
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
            {/* Conditional Media Input */}
            {postData.type === "blog" ? (
              <ImageUploader
                onFileSelect={(file) => setMedia({ file, url: "" })}
              />
            ) : (
              <VideoUrlInput
                value={media.url}
                onChange={(e) => setMedia({ file: null, url: e.target.value })}
              />
            )}
          </div>

          {/* Card 3: Post Body */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-6">
              Post Body
            </h3>
            <RichTextEditor content={body} onUpdate={setBody} />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8 sticky top-24">
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
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiSend />
                )}{" "}
                প্রকাশ করুন (Publish)
              </button>
              <button
                onClick={() => handleSubmit("draft")}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiSave />
                )}{" "}
                ড্রাফট সংরক্ষণ (Save Draft)
              </button>
            </div>
          </div>
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
                </select>
              </div>
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
