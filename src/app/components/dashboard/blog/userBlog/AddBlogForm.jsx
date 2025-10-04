"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import defaultSlugify from "@sindresorhus/slugify";
import { FiSave, FiSend } from "react-icons/fi";
import FormInput from "./FormInput";
import RichTextEditor from "./RichTextEditor";
import TagInput from "./TagInput";
import ImageUploader from "./ImageUploader";

const AddBlogForm = ({ user }) => {
  const router = useRouter();
  const [postData, setPostData] = useState({
    title: "",
    summary: "",
    type: "blog",
    status: "draft",
    category: "Technology",
  });
  const [body, setBody] = useState(""); // This will now store HTML from TipTap
  const [tags, setTags] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title using the new library
  const slug = useMemo(() => {
    return defaultSlugify(postData.title);
  }, [postData.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (publishStatus) => {
    // ... (The entire handleSubmit function logic remains EXACTLY THE SAME)
    setIsSubmitting(true);
    const finalPostData = {
      ...postData,
      slug,
      body,
      tags,
      status: publishStatus,
      author: { id: user.id, name: user.name, image: user.image },
    };
    console.log("Submitting post with modern stack:", finalPostData);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `Post "${finalPostData.title}" submitted as ${publishStatus}! Check the console.`
      );
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            {/* These components are unchanged */}
            <FormInput
              label="পোস্টের শিরোনাম (Title)"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="যেমন: স্মার্ট ড্রিপ ইরিগেশন সেটআপ"
            />
            <FormInput
              label="স্লাগ (URL Slug)"
              id="slug"
              name="slug"
              value={slug}
              readOnly
              disabled
              placeholder="শিরোনাম থেকে স্বয়ংক্রিয়ভাবে তৈরি হবে"
            />
            <div>
              <label className="block text-sm font-medium font-hind text-gray-700 mb-2">
                সারসংক্ষেপ (Summary)
              </label>
              <textarea
                id="summary"
                name="summary"
                rows="4"
                value={postData.summary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition text-lg font-hind"
                placeholder="পোস্ট সম্পর্কে একটি সংক্ষিপ্ত বিবরণ..."
              />
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <label className="block text-sm font-medium font-hind text-gray-700 mb-2">
              বিস্তারিত (Body)
            </label>
            {/* --- SWAP IN THE NEW EDITOR --- */}
            <RichTextEditor content={body} onUpdate={setBody} />
            {/* --- END SWAP --- */}
          </div>
        </div>

        {/* Sidebar Area (This entire section remains unchanged) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              প্রকাশ করুন (Publish)
            </h3>
            <div className="space-y-4">
              {/* ... buttons and status dropdown ... */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleSubmit("draft")}
                  disabled={isSubmitting}
                  className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FiSave /> Draft সংরক্ষণ
                </button>
                <button
                  onClick={() => handleSubmit("published")}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FiSend /> প্রকাশ করুন
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              ক্যাটাগরি (Category)
            </h3>
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
              <option value="Market News">Market News</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              ট্যাগ (Tags)
            </h3>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold font-hind text-gray-900 mb-4">
              ফিচার্ড ছবি (Featured Image)
            </h3>
            <ImageUploader onFileSelect={setFeaturedImageFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
